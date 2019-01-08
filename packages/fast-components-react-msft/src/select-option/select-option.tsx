import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get } from "lodash-es";
import {
    SelectOptionHandledProps,
    SelectOptionProps,
    SelectOptionUnhandledProps,
} from "./select-option.props";
import { SelectOption as BaseSelectOption } from "@microsoft/fast-components-react-base";

class SelectOption extends Foundation<
    SelectOptionHandledProps,
    SelectOptionUnhandledProps,
    {}
> {
    public static displayName: string = "SelectOption";

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
        return (
            <BaseSelectOption
                {...this.unhandledProps()}
                className={this.generateClassNames()}
                managedClasses={this.props.managedClasses}
            >
                Banana
            </BaseSelectOption>
        );
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        return super.generateClassNames();
    }
}

export default SelectOption;
export * from "./select-option.props";
