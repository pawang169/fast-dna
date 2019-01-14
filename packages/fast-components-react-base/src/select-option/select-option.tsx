import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get } from "lodash-es";
import { SelectOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    SelectOptionHandledProps,
    SelectOptionProps,
    SelectOptionUnhandledProps,
} from "./select-option.props";
import {
    SelectContext,
    SelectContextType,
    SelectOptionData,
} from "../select/select.context";
import { KeyCodes } from "@microsoft/fast-web-utilities";

class SelectOption extends Foundation<
    SelectOptionHandledProps,
    SelectOptionUnhandledProps,
    {}
> {
    public static displayName: string = "SelectOption";

    public static contextType: React.Context<SelectContextType> = SelectContext;

    public static defaultProps: Partial<SelectOptionProps> = {
        disabled: false,
    };

    protected handledProps: HandledProps<SelectOptionHandledProps> = {
        disabled: void 0,
        displayString: void 0,
        managedClasses: void 0,
        id: void 0,
        value: void 0,
    };

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        const isSelected: boolean =
            (this.context as SelectContextType).selectedOptions.filter(
                (option: SelectOptionData) => {
                    return option.id === this.props.id;
                }
            ).length === 1;
        return (
            <div
                {...this.unhandledProps()}
                className={this.generateClassNames()}
                role="option"
                aria-selected={isSelected}
                aria-disabled={this.props.disabled}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
            >
                {this.props.displayString}
                {this.props.children}
            </div>
        );
    }

    /**
     * Invoke this option
     */
    public invokeOption(): void {
        if (this.props.disabled) {
            return;
        }

        const optionData: SelectOptionData = {
            id: this.props.id,
            value: this.props.value,
            displayString: this.props.displayString,
        };

        //  TODO: confirm this is a valid function
        (this.context as SelectContextType).optionInvoked(optionData);
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        let classNames: string = get(this.props, "managedClasses.selectOption", "");

        if (this.props.disabled) {
            classNames = `${classNames} ${get(
                this.props,
                "managedClasses.selectOption__disabled",
                ""
            )}`;
        }

        const isSelected: boolean =
            (this.context as SelectContextType).selectedOptions.filter(
                (option: SelectOptionData) => {
                    return option.id === this.props.id;
                }
            ).length === 1;

        if (isSelected) {
            classNames = `${classNames} ${get(
                this.props,
                "managedClasses.selectOption__selected",
                ""
            )}`;
        }

        return super.generateClassNames(classNames);
    }

    /**
     * Handle click event
     */
    private handleClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        this.invokeOption();
    };

    /**
     * Handle keyDown
     */
    private handleKeyDown = (event: React.KeyboardEvent): void => {
        if (event.keyCode === KeyCodes.enter) {
            event.preventDefault();
            this.invokeOption();
        }
    };
}

SelectOption.contextType = SelectContext;
export default SelectOption;
export * from "./select-option.props";
export { SelectOptionClassNameContract };
