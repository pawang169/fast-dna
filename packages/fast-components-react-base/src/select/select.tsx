import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get } from "lodash-es";
import { KeyCodes } from "@microsoft/fast-web-utilities";
import { SelectClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { SelectHandledProps, SelectProps, SelectUnhandledProps } from "./select.props";
import { SelectContext, SelectOptionData } from "./select.context";
import Listbox from "../listbox";

export interface SelectState {
    value: string;
    selectedOptions: SelectOptionData[];
    isMenuOpen: boolean;
}

class Select extends Foundation<SelectHandledProps, SelectUnhandledProps, SelectState> {
    public static displayName: string = "Select";

    public static defaultProps: Partial<SelectProps> = {
        multiple: false,
        disabled: false,
        selectedOptions: [],
        defaultSelection: [],
    };

    /**
     * Handled props instantiation
     */
    protected handledProps: HandledProps<SelectHandledProps> = {
        isMenuOpen: void 0,
        autofocus: void 0,
        disabled: void 0,
        form: void 0,
        multiple: void 0,
        name: void 0,
        contentDisplayRenderFunction: void 0,
        menuRenderFunction: void 0,
        dataValueFormatterFunction: void 0,
        required: void 0,
        managedClasses: void 0,
        selectedOptions: void 0,
        defaultSelection: void 0,
        onValueChange: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    /**
     * constructor
     */
    constructor(props: SelectProps) {
        super(props);

        this.state = {
            selectedOptions: this.props.defaultSelection,
            value: "",
            isMenuOpen: this.props.isMenuOpen || false,
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
                aria-disabled={this.props.disabled || undefined}
                className={this.generateClassNames()}
                onKeyDown={this.handleKeydown}
                onClick={this.selectClicked}
            >
                <SelectContext.Provider
                    value={{
                        selectedOptions: this.state.selectedOptions,
                        optionInvoked: this.selectOptionInvoked,
                        isMenuOpen: this.state.isMenuOpen,
                    }}
                >
                    {this.renderContentDisplay()}
                    {this.renderHiddenSelectElement()}
                    {this.renderMenu()}
                </SelectContext.Provider>
            </div>
        );
    }

    /**
     * Create class names
     */
    protected generateClassNames(): string {
        let className: string = get(this.props.managedClasses, "select") || "";

        if (this.props.disabled) {
            className = className.concat(
                " ",
                get(this.props.managedClasses, "select__disabled")
            );
        }

        return super.generateClassNames(className);
    }

    /**
     * Renders a hidden select element which can interact with a
     * form hosting this component
     */
    private renderHiddenSelectElement(): React.ReactNode {
        return (
            <select
                name={this.props.name}
                value={this.state.value}
                onChange={this.handleValueChange}
                style={{
                    display: "none",
                }}
            />
        );
    }

    /**
     * Called when value changes on hidden select element
     */
    private handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        if (this.props.onValueChange) {
            this.props.onValueChange(e);
        }
    };

    /**
     * Deternmines which function to use to render content display (ie. the part of the control that shows when the menu isn't open)
     * and invokes it
     */
    private renderContentDisplay(): React.ReactNode {
        if (this.props.contentDisplayRenderFunction !== undefined) {
            return this.props.contentDisplayRenderFunction(
                this.state.selectedOptions,
                this.state.value
            );
        } else {
            return this.defaultDisplayRenderFunction(
                this.state.selectedOptions,
                this.state.value
            );
        }
    }

    /**
     * Deternmines which function to use to render the menu and invokes it
     */
    private renderMenu(): React.ReactNode {
        if (this.state.isMenuOpen) {
            if (this.props.menuRenderFunction === undefined) {
                return this.defaultMenuRenderFunction(
                    this.state.selectedOptions,
                    this.props.children
                );
            } else {
                return this.props.menuRenderFunction(
                    this.state.selectedOptions,
                    this.props.children
                );
            }
        }
    }

    /**
     * The default function that renders an unstyled content display
     */
    private defaultDisplayRenderFunction = (
        selectedOptions: SelectOptionData[],
        formattedValue: string
    ): React.ReactNode => {
        if (selectedOptions.length === 0) {
            return "-----------";
        } else {
            const displayStrings: string[] = selectedOptions.map(
                (option: SelectOptionData) => {
                    if (option.displayString !== undefined) {
                        return option.displayString;
                    } else {
                        return option.value;
                    }
                }
            );

            const separator: string = ", ";
            let displayString: string = "";
            displayStrings.forEach((option: string) => {
                if (displayString.length > 0) {
                    displayString = displayString + separator;
                }
                displayString = displayString + option;
            });

            return displayString;
        }
    };

    /**
     * The default function that renders an unstyled menu
     */
    private defaultMenuRenderFunction = (
        selectedOptions: SelectOptionData[],
        children: React.ReactNode
    ): React.ReactNode => {
        return <Listbox typeAheadPropName="displayString">{children}</Listbox>;
    };

    /**
     * The default function that formats the value string generated based on selection.
     * This implementation should match the default formatting a base html select control applies.
     * Developpers can provide different formatters if desired.
     */
    private defaultDataValueFormatter = (
        selectedValues: string[],
        selectName: string
    ): string => {
        const separator: string = "&";
        const prefix: string = selectName !== undefined ? selectName + "=" : "";
        let formattedValue: string = "";
        selectedValues.forEach((thisValue: string) => {
            if (formattedValue.length > 0) {
                formattedValue = formattedValue + separator;
            }
            formattedValue = formattedValue + prefix + thisValue;
        });
        return formattedValue;
    };

    /**
     * Handles clicks
     */
    private selectClicked = (): void => {
        if (!this.props.disabled && !this.state.isMenuOpen) {
            this.openMenu();
        }
    };

    /**
     * Handles key events
     */
    private handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (e.keyCode) {
            case KeyCodes.enter:
            case KeyCodes.space:
                e.preventDefault();
                this.openMenu();

                break;
            case KeyCodes.escape:
                e.preventDefault();
                this.closeMenu();

                break;
        }
    };

    /**
     * Function called by child select options when they have been invoked
     */
    private selectOptionInvoked = (
        option: SelectOptionData,
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
    ): void => {
        if (this.props.multiple && event.ctrlKey) {
            if (
                this.state.selectedOptions.filter((selectedOption: SelectOptionData) => {
                    return selectedOption.id === option.id;
                }).length === 1
            ) {
                return;
            }

            const newSelectedOptions: SelectOptionData[] = Object.assign(
                {},
                this.state.selectedOptions,
                [option]
            );
            this.setState({
                selectedOptions: newSelectedOptions,
                value: this.getFormattedValueString(newSelectedOptions),
            });
        } else {
            if (this.state.selectedOptions === [option]) {
                return;
            }

            this.closeMenu();
            this.setState({
                selectedOptions: [option],
                value: this.getFormattedValueString([option]),
            });
        }
    };

    /**
     * opens the menu when it is not controlled by props
     */
    private openMenu = (): void => {
        if (this.props.isMenuOpen === undefined) {
            window.addEventListener("click", this.handleWindowClick);
            this.setState({
                isMenuOpen: true,
            });
        }
    };

    /**
     * closes the menu when it is not controlled by props
     */
    private closeMenu = (): void => {
        if (this.props.isMenuOpen === undefined) {
            window.removeEventListener("click", this.handleWindowClick);
            this.setState({
                isMenuOpen: false,
            });
        }
    };

    private handleWindowClick = (event: MouseEvent): void => {
        if (!this.rootElement.current.contains(event.target as Element)) {
            this.closeMenu();
        }
    };

    /**
     * Determines what function needs to be called to format the result string and
     * calls it with the appropriate params
     */
    private getFormattedValueString = (selectedOptions: SelectOptionData[]): string => {
        const selectedValues: string[] = selectedOptions.map(
            (option: SelectOptionData) => {
                return option.value;
            }
        );

        return this.props.dataValueFormatterFunction === undefined
            ? this.defaultDataValueFormatter(selectedValues, this.props.name)
            : this.props.dataValueFormatterFunction(selectedValues, this.props.name);
    };
}

export default Select;
export * from "./select.props";
export { SelectClassNameContract };
