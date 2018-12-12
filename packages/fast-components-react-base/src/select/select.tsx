import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get, inRange, invert } from "lodash-es";
import { SelectClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { SelectHandledProps, SelectProps, SelectUnhandledProps } from "./select.props";
import SelectOption, { SelectOptionHandledProps } from "../select-option/select-option";
import { SelectContext, SelectContextType } from "./select.context"
import { instanceOf, node } from "prop-types";
import { type } from "os";

export interface SelectState {
    value: string;
    selectedOptionValues: string[];
    isMenuOpen: boolean;
}
class Select extends Foundation<SelectHandledProps, SelectUnhandledProps, SelectState> {

    public static displayName: string = "Select";

    // public static defaultProps: Partial<SelectProps> = {
    //     size: 5,
    // };

    /**
     * Handled props instantiation
     */
    protected handledProps: HandledProps<SelectHandledProps> = {
        initialSelection: void 0,
        fixedSelection: void 0,
        selection: void 0,
        autofocus: void 0,
        disabled: void 0,
        form: void 0,
        multiple: void 0,
        name: void 0,
        required: void 0,
        managedClasses: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    constructor(props: SelectProps) {
        super(props);

        this.state = {
            selectedOptionValues: [],
            value: "",
            isMenuOpen: false,
        };

        const nodes: React.ReactNode = this.props.children;


        const childArray: React.ReactChild[] = React.Children.toArray(this.props.children);

        const selectOptions: React.ReactChild[] = childArray.filter((child: React.ReactChild) => child !== SelectOption.displayName);
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                ref={this.rootElement}
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gridTemplateRows: "100%",
                }}
                className={this.generateClassNames()}
                onClick={this.selectClicked}
            >
                {this.renderContentDisplay()}
                {this.renderToggle()}
                {this.renderHiddenSelectElement()}
                {this.renderMenu()}
            </div>
        );
    }

    /**
     * Create class names
     */
    protected generateClassNames(): string {
        return super.generateClassNames(get(this.props.managedClasses, "select"));
    }

    protected renderContentDisplay(): React.ReactNode {
        return (
            <div
                style={{
                    gridRowStart: "1",
                    gridColumnStart: "1",
                }}
            >
                goo
            </div>
        );
    }

    protected renderToggle(): React.ReactNode {
        return (
            <div
                style={{
                    gridRowStart: "1",
                    gridColumnStart: "2",
                }}
            >
                *
            </div>
        );
    }

    protected renderMenu(): React.ReactNode {
        if (this.state.isMenuOpen || this.props.multiple) {
            return (
                <SelectContext.Provider value={{
                    selectedValues:this.state.selectedOptionValues,
                    fixedValues: Array.isArray(this.props.fixedSelection)
                        ? this.props.fixedSelection as string[]
                        : Array.of(this.props.fixedSelection) as string[],
                }}> 
                    <div
                        onClickCapture={this.handleOptionClick}
                        onKeyDownCapture={this.handleOptionKeyDown}
                        style={{
                            width: "100%",
                            height: "auto",
                            background: "white",
                            position: "absolute",
                        }}
                    >
                        {this.props.children}
                    </div>
                </SelectContext.Provider>
            );
        } else {
            return null;
        }
    }

    protected renderHiddenSelectElement(): React.ReactNode {
        return (
            <select
                name={this.props.name}
                value={this.state.value}
                style={{
                    gridRowStart: "1",
                    gridColumnStart: "2",
                    display: "none",
                }}
            />
        );
    }

    protected selectClicked = (): void => {
        this.setState({
            isMenuOpen: true,
        });
    };

    // private initialSelectCallback = (selectedValue: string): void => {
    //     if (!this.state.selectedOptionValues.indexOf(selectedValue)) {
    //         const newSelectedOptionValues: string[] = this.state.selectedOptionValues.splice(0,0,selectedValue);
    //         this.setState({
    //             isMenuOpen: true,
    //             selectedOptionValues: newSelectedOptionValues,
    //         });
    //     }
    // }

    /**
     * Handle the keydown event of the item
     */

    private handleOptionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        // if (this.props.disabled) {
        //     return;
        // }

        // if (typeof this.props.onInvoke === "function") {
        //     switch (e.keyCode) {
        //         case KeyCodes.enter:
        //         case KeyCodes.space:
        //             this.props.onInvoke(this.props);
        //             break;
        //     }
        // }
        this.setState({
            isMenuOpen: false,
        });
    };

    /**
     * Handle the keydown event of the item
     */

    private handleOptionClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        // if (this.props.disabled) {
        //     return;
        // }
        // if (typeof this.props.onInvoke === "function") {
        //     this.props.onInvoke(this.props);
        // }
        alert("clickCap");
        this.setState({
            isMenuOpen: false,
        });
    };
}

export default Select;
export * from "./select.props";
export { SelectClassNameContract };
