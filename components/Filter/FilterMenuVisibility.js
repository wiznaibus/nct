import {createContext, useState} from "react";

export const FilterMenuVisibilityStateContext = createContext();

export const FilterMenuVisibilityProvider = ({children}) => {
    const [filterMenuVisibility, setFilterMenuVisibility] = useState(false);
    const filter = {filterMenuVisibility, setFilterMenuVisibility};
    return (
        <FilterMenuVisibilityStateContext.Provider value={filter}>
            {children}
        </FilterMenuVisibilityStateContext.Provider>
    );
};