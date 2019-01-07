import * as React from "react";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import SelectOption, {
    SelectOptionHandledProps,
    SelectOptionManagedClasses,
} from "./select-option";
import schema from "./select-option.schema.json";
import Documentation from "./.tmp/documentation";

const managedClasses: SelectOptionManagedClasses = {
    managedClasses: {
        selectOption: "select-option",
    },
};

const examples: ComponentFactoryExample<SelectOptionHandledProps> = {
    name: "Select option",
    component: SelectOption,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        ...managedClasses,
        children: "test child",
        value: "Test value",
        displayString: "Test Display",
        id: "TestID",
    },
    data: [
        {
            ...managedClasses,
            children: "test child",
            value: "Test value",
            id: "TestID",
            displayString: "Test Display",
        },
    ],
};

export default examples;
