import * as React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import schema from "./listbox.schema.json";
import Listbox, { ListboxManagedClasses, ListboxProps } from "./listbox";
import { ContextMenuItemProps } from "../context-menu-item";
import { noop } from "lodash-es";
import Documentation from "./.tmp/documentation";

function contextMenuItemPropFactory(): ContextMenuItemProps {
    return {
        managedClasses: {
            contextMenuItem: "context-menu-item",
        },
        onClick: noop,
    };
}

const managedClasses: ListboxManagedClasses = {
    managedClasses: {
        listbox: "listbox",
    },
};

const examples: ComponentFactoryExample<ListboxProps> = {
    name: "Listbox",
    component: Listbox,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        ...managedClasses,
        children: [
            {
                id: "button",
                props: {
                    children: "ab",
                },
            },
            {
                id: "button",
                props: {
                    children: "abc",
                },
            },
            // {
            //     id: "context-menu-item",
            //     props: {
            //         ...contextMenuItemPropFactory(),
            //         children: "context menu item 1",
            //     },
            // },
            // {
            //     id: "context-menu-item",
            //     props: {
            //         ...contextMenuItemPropFactory(),
            //         children: "context menu item 2",
            //     },
            // },
            // {
            //     id: "context-menu-item",
            //     props: {
            //         ...contextMenuItemPropFactory(),
            //         children: "context menu item 3",
            //     },
            // },
        ],
    },
    data: [
        {
            ...managedClasses,
            children: [
                {
                    id: "button",
                    props: {
                        children: "item 1",
                    },
                },
                {
                    id: "button",
                    props: {
                        children: "item 2",
                    },
                },
                // {
                //     id: "context-menu-item",
                //     props: {
                //         ...contextMenuItemPropFactory(),
                //         children: "context menu item 1",
                //     },
                // },
                // {
                //     id: "divider",
                // },
                // {
                //     id: "context-menu-item",
                //     props: {
                //         ...contextMenuItemPropFactory(),
                //         children: "context menu item 2",
                //     },
                // },
                // {
                //     id: "context-menu-item",
                //     props: {
                //         ...contextMenuItemPropFactory(),
                //         children: "context menu item 2",
                //         disabled: true,
                //     },
                // },
                // {
                //     id: "context-menu-item",
                //     props: {
                //         ...contextMenuItemPropFactory(),
                //         children: "context menu item 3",
                //     },
                // },
            ],
        },
    ],
};

export default examples;
