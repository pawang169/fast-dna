import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get } from "lodash-es";
import { SelectOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    SelectOptionHandledProps,
    SelectOptionProps,
    SelectOptionUnhandledProps,
} from "./select-option.props";
import { SelectContext, SelectContextType } from "../select/select.context";

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
        value: void 0,
        managedClasses: void 0,
        id: void 0,
    };

    /**
     * React life cycle function
     */
    public componentDidMount(): void {
        (this.context as SelectContextType).registerOption(
            this.props.id,
            this.props.value
        );
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        const shouldShowChildren: boolean = (this.context as SelectContextType)
            .isMenuOpen;
        const shouldShowSelected: boolean =
            (this.context as SelectContextType).selectedOptionIds.indexOf(
                this.props.id
            ) !== -1;
        return (
            <div
                {...this.unhandledProps()}
                className={this.generateClassNames()}
                role="option"
                aria-selected={shouldShowSelected}
                aria-disabled={this.props.disabled}
                onClick={this.handleClick}
            >
                {shouldShowChildren ? this.props.children : null}
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
        (this.context as SelectContextType).optionInvoked(this.props.id);
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
        if (
            (this.context as SelectContextType).selectedOptionIds.indexOf(
                this.props.id
            ) !== -1
        ) {
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
        event.stopPropagation();
        this.invokeOption();
    };
}

SelectOption.contextType = SelectContext;
export default SelectOption;
export * from "./select-option.props";
export { SelectOptionClassNameContract };
