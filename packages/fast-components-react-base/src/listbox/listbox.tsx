import * as ReactDOM from "react-dom";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { ListboxClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    ListboxHandledProps,
    ListboxProps,
    ListboxUnhandledProps,
} from "./listbox.props";
import * as React from "react";
import { KeyCodes } from "@microsoft/fast-web-utilities";
import { get, inRange, invert } from "lodash-es";
import { canUseDOM } from "exenv-es6";

export interface ListboxState {
    /**
     * The index of the focusable child
     */
    focusIndex: number;
}

class Listbox extends Foundation<
    ListboxHandledProps,
    ListboxUnhandledProps,
    ListboxState
> {
    public static displayName: string = "Listbox";

    public static defaultProps: Partial<ListboxProps> = {
        typeAheadPropName: "value",
    };

    protected handledProps: HandledProps<ListboxHandledProps> = {
        children: void 0,
        managedClasses: void 0,
        typeAheadPropName: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    private typeAheadString: string = "";
    private typeAheadTimer: any;

    constructor(props: ListboxProps) {
        super(props);

        this.state = {
            focusIndex: -1,
        };
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                ref={this.rootElement}
                role="menu"
                className={this.generateClassNames()}
                onKeyDown={this.handleMenuKeyDown}
            >
                {this.renderChildren()}
            </div>
        );
    }

    public componentDidMount(): void {
        const children: Element[] = this.domChildren();
        const focusIndex: number = children.findIndex(this.isFocusableElement);

        if (focusIndex !== -1) {
            this.setState({
                focusIndex,
            });
        }
    }

    public componentWillUnmount(): void {
        clearTimeout(this.typeAheadTimer);
    }

    /**
     * Create class names
     */
    protected generateClassNames(): string {
        return super.generateClassNames(get(this.props.managedClasses, "listbox"));
    }

    /**
     * Render all child elements
     */
    private renderChildren(): React.ReactChild[] {
        return React.Children.map(this.props.children, this.renderChild);
    }

    /**
     * Render a single child
     */
    private renderChild = (
        child: React.ReactElement<any>,
        index: number
    ): React.ReactChild => {
        return React.cloneElement(child, {
            tabIndex: index === this.state.focusIndex ? 0 : -1,
            onFocus: this.handleMenuItemFocus,
        });
    };

    private isMenuItemElement(element: Element): element is HTMLElement {
        return element instanceof HTMLElement;
    }

    /**
     * Determines if a given element should be focusable by the menu
     */
    private isFocusableElement = (element: Element): element is HTMLElement => {
        return this.isMenuItemElement(element) && !this.isDisabledElement(element);
    };

    private isDisabledElement = (element: Element): element is HTMLElement => {
        return (
            this.isMenuItemElement(element) &&
            element.getAttribute("aria-disabled") === "true"
        );
    };

    /**
     * Return an array of all focusabled elements that are children
     * of the context menu
     */
    private domChildren(): Element[] {
        return canUseDOM() && this.rootElement.current instanceof HTMLElement
            ? Array.from(this.rootElement.current.children)
            : [];
    }

    /**
     * Ensure we always validate our internal state on item focus events, otherwise
     * the component can get out of sync from click events
     */
    private handleMenuItemFocus = (e: React.FocusEvent<HTMLElement>): void => {
        const target: Element = e.currentTarget;
        const focusIndex: number = this.domChildren().indexOf(target);

        if (this.isDisabledElement(target)) {
            target.blur();

            return;
        }

        if (focusIndex !== this.state.focusIndex && focusIndex !== -1) {
            this.setFocus(focusIndex, focusIndex > this.state.focusIndex ? 1 : -1);
        }
    };

    /**
     * Sets focus to the nearest focusable element to the supplied focusIndex.
     * The adjustment controls how the function searches for other focusable elements
     * if the element at the focusIndex is not focusable. A positive number will search
     * towards the end of the children array, whereas a negative number will search towards
     * the beginning of the children array.
     */
    private setFocus(focusIndex: number, adjustment: number): void {
        const children: Element[] = this.domChildren();

        while (inRange(focusIndex, children.length)) {
            const child: Element = children[focusIndex];

            if (this.isFocusableElement(child)) {
                child.focus();

                this.setState({
                    focusIndex,
                });

                break;
            }

            focusIndex += adjustment;
        }
    }

    /**
     * Handle the keydown event of the root menu
     */
    private handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (e.keyCode) {
            case KeyCodes.arrowDown:
            case KeyCodes.arrowRight:
                e.preventDefault();
                this.setFocus(this.state.focusIndex + 1, 1);

                break;

            case KeyCodes.arrowUp:
            case KeyCodes.arrowLeft:
                e.preventDefault();
                this.setFocus(this.state.focusIndex - 1, -1);

                break;

            case KeyCodes.end:
                e.preventDefault();
                this.setFocus(this.domChildren().length - 1, -1);

                break;

            case KeyCodes.home:
                e.preventDefault();
                this.setFocus(0, 1);

                break;

            case KeyCodes.home:
                e.preventDefault();
                this.setFocus(0, 1);

                break;

            default:
                this.processTypeAhead(e);
        }
    };

    private processTypeAhead = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        // TODO: how to sort out keys we care about & not (roughed this in)
        const acceptedChars: string[] = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
        ];

        if (acceptedChars.indexOf(e.key) === -1) {
            return;
        }

        e.preventDefault();

        if (this.typeAheadString !== "") {
            clearTimeout(this.typeAheadTimer);
        }

        this.typeAheadString = this.typeAheadString + e.key;
        const children: Element[] = this.domChildren();
        let bestMatchIndex: number = -1;
        children.some(
            (child: Element, index: number): boolean => {
                if (!this.isFocusableElement(child)) {
                    return;
                }

                let childCompareValue: string = "";
                if (this.props.typeAheadPropName === undefined) {
                    if (child.hasAttribute(this.props.typeAheadPropName)) {
                        childCompareValue = child.getAttribute(
                            this.props.typeAheadPropName
                        );
                    }
                } else {
                    // TODO: right way to do this??
                    if (child.innerText !== undefined) {
                        childCompareValue = child.innerText;
                    }
                }

                if (
                    childCompareValue !== "" &&
                    childCompareValue.includes(this.typeAheadString)
                ) {
                    bestMatchIndex = index;
                    return true;
                }

                return false;
            }
        );

        if (bestMatchIndex !== -1) {
            this.typeAheadTimer = setTimeout((): void => {
                this.typeAheadTimerExpired();
            }, 1000);
            this.setFocus(bestMatchIndex, 1);
        } else {
            this.typeAheadString = "";
        }
    };

    private typeAheadTimerExpired = (): void => {
        this.typeAheadString = "";
        clearTimeout(this.typeAheadTimer);
    };
}

export default Listbox;
export * from "./listbox.props";
export { ListboxClassNameContract };
