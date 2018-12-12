import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get } from "lodash-es";
import { SelectOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    SelectOptionHandledProps,
    SelectOptionProps,
    SelectOptionUnhandledProps,
} from "./select-option.props";
import { SelectContext, SelectContextType} from "../select/select.context"

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
    };

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                className={this.generateClassNames()}
                aria-disabled={this.props.disabled || undefined}
            >
                {this.renderChildren()}
                {this.context.selectedValues}
            </div>
        );
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        let className: string = get(this.props.managedClasses, "selectOption") || "";
        if (this.props.disabled) {
            className = className.concat(
                " ",
                get(this.props.managedClasses, "selectOption__disabled")
            );
        }
        if ((this.context as SelectContextType).selectedValues.indexOf(this.props.value) > -1) {
            className = className.concat(
                " ",
                get(this.props.managedClasses, "selectOption__selected")
            );
        }
        return super.generateClassNames(className);
    }

    /**
     * Render all child elements
     */
    protected renderChildren(): React.ReactChild[] {
        return React.Children.map(this.props.children, this.renderChild);
    }

    /**
     * Render a single child
     */
    protected renderChild = (child: any, index: number): React.ReactChild => {
        if (typeof child === "string") {
            return child;
        } else {
            // TODO for scomea: what type check to do here?
            return React.cloneElement(child, {
                disabled: this.props.disabled,
                value: this.props.value,
            });
        }
    };
}

SelectOption.contextType = SelectContext;
export default SelectOption;
export * from "./select-option.props";
export { SelectOptionClassNameContract };
