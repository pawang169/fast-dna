import * as React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import {
    ListboxItemHandledProps,
    ListboxItemManagedClasses,
    ListboxItemProps,
    ListboxItemUnhandledProps,
} from "./listbox-item.props";
import { ListboxItem as BaseListboxItem } from "@microsoft/fast-components-react-base";
import { get } from "lodash-es";

class ListboxItem extends Foundation<
    ListboxItemHandledProps,
    ListboxItemUnhandledProps,
    {}
> {
    public static displayName: string = "ListboxItem";

    protected handledProps: HandledProps<ListboxItemHandledProps> = {
        before: void 0,
        value: void 0,
        id: void 0,
        displayString: void 0,
    };

    public render(): React.ReactNode {
        return (
            <BaseListboxItem
                {...this.unhandledProps()}
                id={this.props.id}
                displayString={this.props.displayString}
                value={this.props.value}
            >
                {this.props.before !== undefined ? this.props.before : undefined}
                <span
                    className={get(
                        this.props.managedClasses,
                        "listboxItem_contentRegion"
                    )}
                >
                    {this.props.displayString}
                    {this.props.children}
                </span>
            </BaseListboxItem>
        );
    }
}

export default ListboxItem;
export * from "./listbox-item.props";
