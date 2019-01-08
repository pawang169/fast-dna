import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get } from "lodash-es";
import { SelectHandledProps, SelectProps, SelectUnhandledProps } from "./select.props";
import {
    Select as BaseSelect,
    SelectOptionData,
} from "@microsoft/fast-components-react-base";

class Select extends Foundation<SelectHandledProps, SelectUnhandledProps, {}> {
    public static displayName: string = "Select";

    public static defaultProps: Partial<SelectProps> = {
        disabled: false,
    };

    protected handledProps: HandledProps<SelectHandledProps> = {
        disabled: void 0,
        managedClasses: void 0,
    };

    /**
     * Store a reference to Base select element
     */
    private filteredChildrenInput: React.RefObject<HTMLInputElement>;

    constructor(props: SelectProps) {
        super(props);
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <BaseSelect
                {...this.unhandledProps()}
                className={this.generateClassNames()}
                contentDisplayRenderFunction={this.renderContentDisplay}
                menuRenderFunction={this.renderMenu}
                managedClasses={this.props.managedClasses}
            >
                {this.props.children}
            </BaseSelect>
        );
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        return super.generateClassNames();
    }

    /**
     * Render content display
     */
    protected renderContentDisplay = (
        selectedOptions: SelectOptionData[],
        formattedValue: string
    ): React.ReactNode => {
        if (selectedOptions.length === 0) {
            return "----------";
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
     * Render the menu
     */
    protected renderMenu = (
        selectedOptions: SelectOptionData[],
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
}

export default Select;
export * from "./select.props";
