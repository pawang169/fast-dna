import * as React from "react";
import {
    ListboxClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-base";

export interface ListboxManagedClasses extends ManagedClasses<ListboxClassNameContract> {}
export interface ListboxUnhandledProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ListboxHandledProps extends ListboxManagedClasses {
    /**
     * The listbox children
     */
    children?: React.ReactNode;
}

export type ListboxProps = ListboxHandledProps & ListboxUnhandledProps;
