import * as React from "react";
import SelectOption from "../select-option/select-option";

export interface SelectOptionData {
    id: string;
    value: string;
    displayString: string;
}

export interface SelectContextType {
    optionInvoked: (
        optionInvoked: SelectOptionData,
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
    ) => void;
    optionFocused: (
        optionFocused: SelectOptionData,
        event: React.FocusEvent<HTMLDivElement>
    ) => void;
    isMenuOpen: boolean;
    selectedOptions: SelectOptionData[];
}

export const SelectContext: React.Context<SelectContextType> = React.createContext({
    optionInvoked: null,
    optionFocused: null,
    isMenuOpen: false,
    selectedOptions: [],
});
