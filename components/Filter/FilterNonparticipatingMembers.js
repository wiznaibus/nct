import {createContext, useState} from "react";

export const FilterNonparticipatingMembersStateContext = createContext();

export const FilterNonparticipatingMembersProvider = ({children}) => {
    const [nonparticipatingMembersFilter, setNonparticipatingMembersFilter] = useState(false);
    const filter = {nonparticipatingMembersFilter, setNonparticipatingMembersFilter};
    return (
        <FilterNonparticipatingMembersStateContext.Provider value={filter}>
            {children}
        </FilterNonparticipatingMembersStateContext.Provider>
    );
};