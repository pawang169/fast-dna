import { SelectOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { DesignSystem, SelectOptionStyles } from "@microsoft/fast-components-styles-msft";
import MSFTSelectOption, {
    SelectOptionHandledProps as MSFTSelectOptionHandledProps,
    SelectOptionManagedClasses,
    SelectOptionProps as MSFTSelectOptionProps,
    SelectOptionUnhandledProps,
} from "./select-option";
import { Subtract } from "utility-types";

/*
 * The type returned by manageJss type is very complicated so we'll let the
 * compiler infer the type instead of re-declaring just for the package export
 */
/* tslint:disable-next-line:typedef */
const SelectOption = manageJss(SelectOptionStyles)(MSFTSelectOption);
type SelectOption = InstanceType<typeof SelectOption>;

interface SelectOptionHandledProps
    extends Subtract<MSFTSelectOptionHandledProps, SelectOptionManagedClasses> {}
type SelectOptionProps = ManagedJSSProps<
    MSFTSelectOptionProps,
    SelectOptionClassNameContract,
    DesignSystem
>;

export {
    SelectOption,
    SelectOptionProps,
    SelectOptionClassNameContract,
    SelectOptionHandledProps,
    SelectOptionUnhandledProps,
};
