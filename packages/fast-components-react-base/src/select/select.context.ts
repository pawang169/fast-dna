import * as React from "react";
import SelectOption from "../select-option/select-option";

export interface SelectContextType {
    optionInvoked: (id: string) => void;
    registerOption: (id: string, value: string) => void;
    isMenuOpen: boolean;
    selectedOptionIds: string[];
}

export const SelectContext: React.Context<SelectContextType> = React.createContext({
    optionInvoked: null,
    registerOption: null,
    isMenuOpen: false,
    selectedOptionIds: [],
});
