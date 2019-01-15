import * as React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import schema from "./select.schema.json";
import Select, { SelectHandledProps, SelectManagedClasses, SelectProps } from "./select";
import { SelectOptionProps } from "../select-option";
import Documentation from "./.tmp/documentation";
import { SelectOptionProps as BaseSelectOptionProps } from "@microsoft/fast-components-react-base";

function selectOptionPropFactory(optionId: string): BaseSelectOptionProps {
    return {
        managedClasses: {
            selectOption: "select-option",
        },
        value: "value - " + optionId,
        id: optionId,
        displayString: "Option-" + optionId,
    };
}

const managedClasses: SelectManagedClasses = {
    managedClasses: {
        select: "select",
    },
};

const examples: ComponentFactoryExample<SelectHandledProps> = {
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
                    ...selectOptionPropFactory("A"),
                    managedClasses: { selectOption: "select-option" },
                },
            },
            {
                id: "select-option",
                props: {
                    ...selectOptionPropFactory("B"),
                    managedClasses: { selectOption: "select-option" },
                },
            },
            {
                id: "select-option",
                props: {
                    ...selectOptionPropFactory("C"),
                    managedClasses: { selectOption: "select-option" },
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
                        ...selectOptionPropFactory("value 1"),
                        managedClasses: { selectOption: "select-option" },
                        children: "select option 1",
                        selected: true,
                    },
                },
                {
                    id: "select-option",
                    props: {
                        ...selectOptionPropFactory("value 2"),
                        managedClasses: { selectOption: "select-option" },
                        children: "select option 2",
                    },
                },
                {
                    id: "select-option",
                    props: {
                        ...selectOptionPropFactory("value 3"),
                        managedClasses: { selectOption: "select-option" },
                        children: "select option 3",
                    },
                },
            ],
        },
    ],
};

export default examples;
