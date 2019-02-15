import * as React from "react";
import { ListboxItem, ListboxItemProps } from "./index";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import schema from "@microsoft/fast-components-react-base/dist/listbox-item/listbox-item.schema.json";
import Documentation from "./.tmp/documentation";

export default {
    name: "Listbox item",
    component: ListboxItem,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        children: "listbox item",
    },
    data: [
        {
            children: "listbox item",
        },
        {
            children: "listbox item",
            before: "<",
        },
        {
            children: "listbox item",
            disabled: true,
        },
    ],
} as ComponentFactoryExample<ListboxItemProps>;
