import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get, inRange, invert } from "lodash-es";
import { SelectClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { SelectHandledProps, SelectProps, SelectUnhandledProps } from "./select.props";
import { SelectContext, SelectOptionData } from "./select.context";

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
            isMenuOpen: this.getMenuOpenValue(false),
        };
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        const invokeFunction: (option: SelectOptionData) => void = this.props.multiple
            ? this.selectMultiModeOptionInvoked
            : this.selectSingleModeOptionInvoked;

        return (
            <div
                {...this.unhandledProps()}
                ref={this.rootElement}
                aria-disabled={this.props.disabled || undefined}
                className={this.generateClassNames()}
                onClick={this.selectClicked}
            >
                <SelectContext.Provider
                    value={{
                        selectedOptions: this.state.selectedOptions,
                        optionInvoked: invokeFunction,
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
     * Deternmines which function to use to render content display (ie. the part of the control that shows when the menu isn't open)
     * and invokes it
     */
    protected renderContentDisplay(): React.ReactNode {
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
    protected renderMenu(): React.ReactNode {
        if (this.state.isMenuOpen) {
            if (this.props.menuRenderFunction === undefined) {
                return this.defaultMenuRenderFunction(this.props.children);
            } else {
                return this.props.menuRenderFunction(this.props.children);
            }
        }
    }

    /**
     * Renders a hidden select element which can interact with a
     * form hosting this component
     */
    protected renderHiddenSelectElement(): React.ReactNode {
        return (
            <select
                name={this.props.name}
                value={this.state.value}
                style={{
                    display: "none",
                }}
            />
        );
    }

    /**
     * The default function that renders an unstyled content display
     */
    protected defaultDisplayRenderFunction = (
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
    protected defaultMenuRenderFunction = (
        children: React.ReactNode
    ): React.ReactNode => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "auto",
                    background: "white",
                    position: "absolute",
                }}
            >
                {children}
            </div>
        );
    };

    /**
     * The default function that formats the value string generated based on selection.
     * This implementation should match the default formatting a base html select control applies.
     * Developpers can provide different formatters if desired.
     */
    protected defaultDataValueFormatter = (
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
     * Handles clicks on the base display
     */
    protected selectClicked = (): void => {
        if (!this.props.disabled) {
            this.setState({
                isMenuOpen: this.getMenuOpenValue(true),
            });
        }
    };

    /**
     * Function called by child select options when they have been invoked in single selection mode
     */
    protected selectSingleModeOptionInvoked = (option: SelectOptionData): void => {
        this.setState({
            selectedOptions: [option],
            value: this.getFormattedValueString([option]),
            isMenuOpen: this.getMenuOpenValue(false),
        });
    };

    /**
     * Function called by child select options when they have been invoked in multi selection mode
     */
    protected selectMultiModeOptionInvoked = (option: SelectOptionData): void => {
        // TODO
    };

    /**
     * Determines what the isMenuOpen state value should be
     * (ie. setting value in props overrides component interaction)
     */
    private getMenuOpenValue = (newValue: boolean): boolean => {
        return this.props.isMenuOpen === undefined ? newValue : this.props.isMenuOpen;
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
