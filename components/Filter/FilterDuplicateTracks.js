import {createContext, useState} from "react";

export const FilterDuplicateTracksStateContext = createContext();

export const FilterDuplicateTracksProvider = ({children}) => {
    const [duplicateTracksFilter, setDuplicateTracksFilter] = useState(false);
    const filter = {duplicateTracksFilter, setDuplicateTracksFilter};
    return (
        <FilterDuplicateTracksStateContext.Provider value={filter}>
            {children}
        </FilterDuplicateTracksStateContext.Provider>
    );
};