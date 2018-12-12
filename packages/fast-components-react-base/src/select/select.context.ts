import * as React from "react";

export interface SelectContextType{
    selectedValues: string[];
    fixedValues: string[];
}

export const SelectContext: React.Context<SelectContextType> = React.createContext({
    selectedValues: [],
    fixedValues: [],
});