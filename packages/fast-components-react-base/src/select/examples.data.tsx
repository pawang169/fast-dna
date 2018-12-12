import * as React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import schema from "./select.schema.json";
import Select, { SelectManagedClasses, SelectProps } from "./select";
import { SelectOptionProps } from "../select-option";
import { noop } from "lodash-es";
import Documentation from "./.tmp/documentation";

function selectOptionPropFactory(): SelectOptionProps {
    return {
        managedClasses: {
            selectOption: "select-option",
        },
        value: "test",
        selected: true,
    };
}

const managedClasses: SelectManagedClasses = {
    managedClasses: {
        select: "select",
    },
};

const examples: ComponentFactoryExample<SelectProps> = {
    name: "Select",
    component: Select,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        ...managedClasses,
        children: [
            {
                id: "select-option",
                props: {
                    ...selectOptionPropFactory(),
                    children: "select option 1",
                },
            },
            {
                id: "select-option",
                props: {
                    ...selectOptionPropFactory(),
                    children: "select option 2",
                },
            },
            {
                id: "select-option",
                props: {
                    ...selectOptionPropFactory(),
                    children: "select option 3",
                },
            },
        ],
    },
    data: [
        {
            ...managedClasses,
            children: [
                {
                    id: "select-option",
                    props: {
                        ...selectOptionPropFactory(),
                        children: "select option 1",
                    },
                },
                {
                    id: "select-option",
                    props: {
                        ...selectOptionPropFactory(),
                        children: "select option 2",
                    },
                },
                {
                    id: "select-option",
                    props: {
                        ...selectOptionPropFactory(),
                        children: "select option 3",
                    },
                },
            ],
        },
    ],
};

export default examples;
