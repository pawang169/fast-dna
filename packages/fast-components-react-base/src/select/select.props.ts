import * as React from "react";
import {
    ManagedClasses,
    SelectClassNameContract,
} from "@microsoft/fast-components-class-name-contracts-base";

export interface SelectManagedClasses extends ManagedClasses<SelectClassNameContract> {}
export interface SelectUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectHandledProps extends SelectManagedClasses {
    /**
     * The children populate the select menu, any SelectOption components in the 
     */
    children?: React.ReactNode | React.ReactNode[];

    /**
     * The initially selected value(s), if any
     */
    initialSelection?: string | string[];

    /**
     * Value(s) that are initially selected and that cannot be deselected, if any
     */
    fixedSelection?: string | string[];

    /**
     * The selected values when fully controlled. Note that setting this value will put the select component into "controlled mode"
     * and it will be up to the developper to capture user interactions to update this value.
     */
    selection?: string | string[];

    /**
     * Specifies whether SelectOptions behave as toggles (reselecting a selected value deselects it)
     */
    toggleSelection?: boolean;

    /**
     * Specifies that the drop-down list should automatically get focus when the page loads
     */
    autofocus?: boolean;

    /**
     * Specifies that placeholder string to display when there is no selected value(s)
     */
    noSelectionPlaceholder?: string;

    /**
     * Specifies that a drop-down list should be disabled
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
     * Specifies that the user is required to select a value before submitting the form
     */
    required?: boolean;
}

export type SelectProps = SelectHandledProps & SelectUnhandledProps;
