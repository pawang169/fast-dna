import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get, inRange, invert } from "lodash-es";
import { SelectClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    OptionData,
    SelectHandledProps,
    SelectProps,
    SelectUnhandledProps,
} from "./select.props";
import SelectOption, { SelectOptionHandledProps } from "../select-option/select-option";
import { SelectContext, SelectContextType } from "./select.context";
import { canUseDOM } from "exenv-es6";
import value from "*.json";

export interface SelectState {
    value: string;
    selectedOptionIds: string[];
    isMenuOpen: boolean;
    registeredOptions: OptionData[];
}

class Select extends Foundation<SelectHandledProps, SelectUnhandledProps, SelectState> {
    public static displayName: string = "Select";

    public static defaultProps: Partial<SelectProps> = {
        multiple: false,
        disabled: false,
        selectedOptionIds: [],
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
        selectedOptionIds: void 0,
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
            selectedOptionIds: this.props.defaultSelection,
            value: "",
            isMenuOpen: this.getMenuOpenValue(false),
            registeredOptions: [],
        };
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        const invokeFunction: (optionId: string) => void = this.props.multiple
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
                {this.renderContentDisplay()}
                {this.renderHiddenSelectElement()}
                <SelectContext.Provider
                    value={{
                        selectedOptionIds: this.state.selectedOptionIds,
                        registerOption: this.registerOption,
                        unregisterOption: this.unregisterOption,
                        optionInvoked: invokeFunction,
                        isMenuOpen: this.state.isMenuOpen,
                    }}
                >
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
                this.state.selectedOptionIds,
                this.state.registeredOptions,
                this.state.value
            );
        } else {
            return this.defaultDisplayRenderFunction(
                this.state.selectedOptionIds,
                this.state.registeredOptions,
                this.state.value
            );
        }
    }

    /**
     * Deternmines which function to use to render the menu and invokes it
     */
    protected renderMenu(): React.ReactNode {
        if (!this.state.isMenuOpen) {
            return this.hiddenMenuRenderFunction(this.props.children);
        } else {
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
        selectedOptionIds: string[],
        registeredOptions: OptionData[],
        formattedValue: string
    ): React.ReactNode => {
        if (formattedValue.length === 0) {
            return "-----------";
        } else {
            return formattedValue;
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
     * Function called by child select options to register themselves
     */
    protected registerOption = (optionId: string, optionValue: string): void => {
        const optionData: OptionData = {
            id: optionId,
            value: optionValue,
        };

        this.setState((prevState: SelectState, props: SelectProps) => {
            const newOptions: OptionData[] = [...prevState.registeredOptions, optionData];
            const newValue: string = this.getFormattedValueString(
                prevState.selectedOptionIds,
                newOptions
            );
            return {
                registeredOptions: newOptions,
                value: newValue,
            };
        });
    };

    /**
     * Function called by child select options to unregister themselves
     */
    protected unregisterOption = (optionId: string): void => {
        this.setState((prevState: SelectState, props: SelectProps) => {
            return {
                registeredOptions: prevState.registeredOptions.filter(
                    (option: OptionData) => {
                        return option.id !== option.id;
                    }
                ),
            };
        });
    };

    /**
     * Function called by child select options when they have been invoked in single selection mode
     */
    protected selectSingleModeOptionInvoked = (optionId: string): void => {
        this.setState({
            selectedOptionIds: [optionId],
            value: this.getFormattedValueString([optionId], this.state.registeredOptions),
            isMenuOpen: this.getMenuOpenValue(false),
        });
    };

    /**
     * Function called by child select options when they have been invoked in multi selection mode
     */
    protected selectMultiModeOptionInvoked = (optionId: string): void => {
        // TODO
    };

    /**
     * Function that renders the child nodes when the menu is collaped
     */
    private hiddenMenuRenderFunction = (children: React.ReactNode): React.ReactNode => {
        return (
            <div
                style={{
                    display: "none",
                }}
            >
                {children}
            </div>
        );
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
    private getFormattedValueString = (
        selectedOptionIds: string[],
        options: OptionData[]
    ): string => {
        const selectedOptions: OptionData[] = options.filter((option: OptionData) => {
            return selectedOptionIds.indexOf(option.id) !== -1;
        });
        const selectedValues: string[] = selectedOptions.map((option: OptionData) => {
            return option.value;
        });

        return this.props.dataValueFormatterFunction === undefined
            ? this.defaultDataValueFormatter(selectedValues, this.props.name)
            : this.props.dataValueFormatterFunction(selectedValues, this.props.name);
    };
}

export default Select;
export * from "./select.props";
export { SelectClassNameContract };
