import {createContext, useState} from "react";

export const FilterMembersStateContext = createContext();

export const FilterMembersProvider = ({children}) => {
    const [filtered, setFiltered] = useState(false);
    const filter = {filtered, setFiltered};
    return (
        <FilterMembersStateContext.Provider value={filter}>
            {children}
        </FilterMembersStateContext.Provider>
    );
};