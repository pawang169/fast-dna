import * as React from "react";
import {
    ManagedClasses,
    SelectClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";
import { SelectOptionData } from "./select.context";

export interface SelectManagedClasses extends ManagedClasses<SelectClassNameContract> {}
export interface SelectUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SelectHandledProps extends SelectManagedClasses {
    /**
     * The children populate the select menu, any SelectOption components in the
     */
    children?: React.ReactNode | React.ReactNode[];

    /**
     * Function which renders the base display of the control
     */
    contentDisplayRenderFunction?: (
        selectedOptions: SelectOptionData[],
        value: string
    ) => React.ReactNode;

    /**
     * Function which renders the menu display of the control
     */
    menuRenderFunction?: (
        selectedOptions: SelectOptionData[],
        children: React.ReactNode
    ) => React.ReactNode;

    /**
     * Function which converts and formats the string[] selected values to a the string value to be returned by the control (ie. what gets sent back as a form result)
     */
    dataValueFormatterFunction?: (selectedValues: string[], selectName: string) => string;

    /**
     * Selected option id's (controlled mode)
     */
    selectedOptions?: SelectOptionData[];

    /**
     * Id's that are initially selected
     */
    defaultSelection?: SelectOptionData[];

    /**
     * Specifies that the drop-down list is open
     */
    isMenuOpen?: boolean;

    /**
     * Specifies that the control is disabled
     */
    disabled?: boolean;

    /**
     * Defines one or more forms the select field belongs to
     */
    form?: string;

    /**
     * Specifies that multiple options can be selected at once
     */
    multiple?: boolean;

    /**
     * Defines a name for the drop-down list
     */
    name?: string;

    /**
     * String displayed when there is no selected value
     */
    placeholder?: string;

    /**
     * Specifies that the user is required to select a value before submitting the form
     */
    required?: boolean;

    /**
     * The onValueChange event handler (note: using "onChange" at the event name caused type conflict issues)
     */
    onValueChange?: (newValue: string, selectedOptions: SelectOptionData[]) => void;
}

export type SelectProps = SelectHandledProps & SelectUnhandledProps;
