import { useContext, useEffect } from 'react';
import { FilterReleaseTypeContext, FilterUnitContext, FilterLanguageContext, FilterMemberContext } from './FilterContexts';

import FilterMenu from './FilterMenu';
import FilterHeader from './FilterHeader';

const FilterControl = ({
    hasUnitQuery = false,
    albumCount = 0,
    songCount = 0
}) => {

    /**
     * Set up meta context (filter menu, nonparticipating members, and duplicate tracks)
     */

    const { releaseTypeFilter, setReleaseTypeFilter } = useContext(FilterReleaseTypeContext);
    const { unitFilter, setUnitFilter } = useContext(FilterUnitContext);
    const { languageFilter, setLanguageFilter } = useContext(FilterLanguageContext);
    const { memberFilter, setMemberFilter } = useContext(FilterMemberContext);

    const releaseTypeFilterOnChange = (id) => {
        const updateReleaseTypeFilter = releaseTypeFilter.map(releaseType => ({
            "id": releaseType.id,
            "discographyType": releaseType.discographyType,
            "name": releaseType.name,
            "filtered": releaseType.id === id ? !releaseType.filtered : releaseType.filtered
        }));
        setReleaseTypeFilter(updateReleaseTypeFilter);
    }

    const unitFilterOnChange = (id) => {
        const updateUnitFilter = unitFilter.map(unit => ({
                "id": unit.id,
                "name": unit.name,
                "filtered": unit.id === id ? !unit.filtered : unit.filtered
        }));
        setUnitFilter(updateUnitFilter);
    };

    const languageFilterOnChange = (id) => {
        const updateLanguageFilter = languageFilter.map(language => ({
                "id": language.id,
                "name": language.name,
                "filtered": language.id === id ? !language.filtered : language.filtered
        }));
        setLanguageFilter(updateLanguageFilter);
    };

    const memberFilterOnChange = (id) => {
        const updateMemberFilter = memberFilter.map(member => ({
                "id": member.id,
                "name": member.name,
                "filtered": member.id === id ? !member.filtered : member.filtered
        }));
        setMemberFilter(updateMemberFilter);
    };

    const clearFilter = (type) => {
        switch(type) {
            case "releaseType":
                const updateReleaseTypeFilter = releaseTypeFilter.map(releaseType => ({
                    "id": releaseType.id,
                    "discographyType": releaseType.discographyType,
                    "name": releaseType.name,
                    "filtered": false
                }));
                setReleaseTypeFilter(updateReleaseTypeFilter);
                break;
            case "unit":
                const updateUnitFilter = unitFilter.map(unit => ({
                    "id": unit.id,
                    "name": unit.name,
                    "filtered": false
                }));
                setUnitFilter(updateUnitFilter);
                break;
            case "language":
                const updateLanguageFilter = languageFilter.map(language => ({
                    "id": language.id,
                    "name": language.name,
                    "filtered": false
                }));
                setLanguageFilter(updateLanguageFilter);
                break;
            case "member":
                const updateMemberFilter = memberFilter.map(member => ({
                    "id": member.id,
                    "name": member.name,
                    "filtered": false
                }));
                setMemberFilter(updateMemberFilter);
                break;
            default:
                return;
        }
    };

    return (
        <>
            <FilterMenu
                hasUnitQuery={hasUnitQuery}
                releaseTypeFilterOnChange={releaseTypeFilterOnChange}
                unitFilterOnChange={unitFilterOnChange}
                languageFilterOnChange={languageFilterOnChange}
                memberFilterOnChange={memberFilterOnChange}
                clearFilter={clearFilter}
                albumCount={albumCount}
                songCount={songCount}
            />
            
            <FilterHeader 
                clearFilter={clearFilter}
                albumCount={albumCount}
                songCount={songCount}
            />
        </>
    );
}

export default FilterControl;