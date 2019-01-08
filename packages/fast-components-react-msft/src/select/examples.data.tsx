import * as React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import schema from "./select.schema.json";
import Select, { SelectHandledProps, SelectManagedClasses, SelectProps } from "./select";
import { SelectOptionHandledProps, SelectOptionProps } from "../select-option";
import Documentation from "./.tmp/documentation";

function selectOptionPropFactory(optionId: string): SelectOptionProps {
    return {
        value: "value - " + optionId,
        id: optionId,
        displayString: "Display - " + optionId,
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
                    ...selectOptionPropFactory("1"),
                    managedClasses: { selectOption: "select-option" },
                    children: "select option 1 child",
                },
            },
            {
                id: "select-option",
                props: {
                    ...selectOptionPropFactory("2"),
                    managedClasses: { selectOption: "select-option" },
                    children: "select option 2 child",
                },
            },
            {
                id: "select-option",
                props: {
                    ...selectOptionPropFactory("3"),
                    managedClasses: { selectOption: "select-option" },
                    children: "select option 3 child",
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
