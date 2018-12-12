import * as React from "react";
import {
    ManagedClasses,
    SelectOptionClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";
import { Omit } from "utility-types";

export interface SelectOptionManagedClasses
    extends ManagedClasses<SelectOptionClassNameContract> {}
export interface SelectOptionUnhandledProps
    extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectOptionHandledProps extends SelectOptionManagedClasses {
    /**
     * The children of the select option
     */
    children?: React.ReactNode;

    /**
     * If the select option is disabled
     */
    disabled?: boolean;

    /**
     * the value of the select option (ie. what is sent to the server)
     */
    value: string;
}

export type SelectOptionProps = SelectOptionHandledProps & SelectOptionUnhandledProps;
