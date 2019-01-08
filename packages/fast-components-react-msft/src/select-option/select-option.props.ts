import * as React from "react";
import { Subtract } from "utility-types";
import {
    SelectOptionHandledProps as BaseSelectOptionHandledProps,
    SelectOptionManagedClasses as BaseSelectOptionManagedClasses,
    SelectOptionUnhandledProps as BaseSelectOptionUnhandledProps,
} from "@microsoft/fast-components-react-base";
import {
    SelectOptionClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-msft";

export interface SelectOptionManagedClasses
    extends ManagedClasses<SelectOptionClassNameContract> {}
export interface SelectOptionHandledProps
    extends SelectOptionManagedClasses,
        Subtract<BaseSelectOptionHandledProps, BaseSelectOptionManagedClasses> {}

/* tslint:disable-next-line:no-empty-interface */
export interface SelectOptionUnhandledProps extends BaseSelectOptionUnhandledProps {}
export type SelectOptionProps = SelectOptionHandledProps & SelectOptionUnhandledProps;
