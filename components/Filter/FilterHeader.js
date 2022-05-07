import { useContext, useEffect } from 'react';
import { FilterMenuVisibilityStateContext } from './FilterMenuVisibility';
import { FilterReleaseTypeContext, FilterUnitContext, FilterLanguageContext, FilterMemberContext } from './FilterContexts';
import FilterButton from './FilterButton';
import { Filter } from 'react-feather'
import { Switch } from '@headlessui/react';

const FilterHeader = ({
    clearFilter,
    albumCount = 0,
    songCount = 0
}) => {
    const { filterMenuVisibility, setFilterMenuVisibility } = useContext(FilterMenuVisibilityStateContext);

    const { releaseTypeFilter } = useContext(FilterReleaseTypeContext);
    const { unitFilter } = useContext(FilterUnitContext);
    const { languageFilter } = useContext(FilterLanguageContext);
    const { memberFilter } = useContext(FilterMemberContext);

    return (
        <>
            <div className="lg:hidden sticky top-0 z-0 px-2 pt-2 pb-1 bg-gray-100 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-800 dark:border-opacity-50
                lg:pt-4 lg:px-10">
                <div className="container mx-auto flex flex-row flex-wrap
                    px-1
                    lg:flex-nowrap lg:px-3">
                    <div className="w-full lg:mt-0 mb-1 lg:px-3 lg:mb-2">

                        <div className="flex flex-row flex-nowrap justify-between items-center">
                            <div className="flex flex-row flex-nowrap gap-x-1">
                                <a className="cursor-pointer hover:underline" onClick={() => setFilterMenuVisibility(!filterMenuVisibility)}>
                                    <h3 className="title text-2xl">
                                        <Filter strokeWidth={2} size={16} /> Filters
                                    </h3>
                                </a>
                                <div className={`pt-1 ${
                                    (
                                        !releaseTypeFilter.filter(releaseType => releaseType.filtered === true).length > 0
                                        && !unitFilter.filter(releaseType => releaseType.filtered === true).length > 0
                                        && !languageFilter.filter(releaseType => releaseType.filtered === true).length > 0
                                        && !memberFilter.filter(releaseType => releaseType.filtered === true).length > 0
                                    )
                                    && `hidden`
                                }`}>
                                    <FilterButton
                                        type="all"
                                        clearFilter={clearFilter}
                                    >
                                        Clear All
                                    </FilterButton>
                                </div>
                            </div>
                            <div className="flex flex-row flex-nowrap gap-x-1 text-sm">
                                <div className="pb-0.5"><span className="bg-nctu dark:bg-nct127 py-0.5 px-2.5 rounded-full">{albumCount} Albums</span></div>
                                <div className="pb-0.5"><span className="bg-nctu dark:bg-nct127 py-0.5 px-2.5 rounded-full">{songCount} Tracks</span></div>
                            </div>
                        </div>

                        <div className={`flex flex-row flex-wrap gap-y-1 mt-0.5 pt-3 border-t border-gray-400 dark:border-gray-900 ${
                            (
                                !releaseTypeFilter.filter(releaseType => releaseType.filtered === true).length > 0
                                && !unitFilter.filter(releaseType => releaseType.filtered === true).length > 0
                                && !languageFilter.filter(releaseType => releaseType.filtered === true).length > 0
                                && !memberFilter.filter(releaseType => releaseType.filtered === true).length > 0
                            )
                            && `hidden`
                        }`}>
                            {
                                releaseTypeFilter.filter(releaseType => releaseType.filtered === true).length > 0 &&
                                <FilterButton
                                    type="releaseType"
                                    filter={releaseTypeFilter}
                                    clearFilter={clearFilter}
                                >
                                    {`Release Type: `}
                                    {releaseTypeFilter.filter(item => item.filtered === true).slice(0, 2).map(item => item.name).join(", ")}
                                    {releaseTypeFilter.filter(item => item.filtered === true).length > 2 
                                        && `, ${releaseTypeFilter.filter(item => item.filtered === true).length - 2} more`}
                                </FilterButton>
                            }
                            {
                                unitFilter.filter(unit => unit.filtered === true).length > 0 &&
                                <FilterButton
                                    type="unit"
                                    filter={unitFilter}
                                    clearFilter={clearFilter}
                                >
                                    {`Unit: `}
                                    {unitFilter.filter(item => item.filtered === true).slice(0, 2).map(item => item.name).join(", ")}
                                    {unitFilter.filter(item => item.filtered === true).length > 2 
                                        && `, ${unitFilter.filter(item => item.filtered === true).length - 2} more`}
                                </FilterButton>
                            }
                            {
                                languageFilter.filter(language => language.filtered === true).length > 0 &&
                                <FilterButton
                                    type="language"
                                    filter={languageFilter}
                                    clearFilter={clearFilter}
                                >
                                    {`Language: `}
                                    {languageFilter.filter(item => item.filtered === true).slice(0, 2).map(item => item.name).join(", ")}
                                    {languageFilter.filter(item => item.filtered === true).length > 2 
                                        && `, ${languageFilter.filter(item => item.filtered === true).length - 2} more`}
                                </FilterButton>
                            }
                            {
                                memberFilter.filter(member => member.filtered === true).length > 0 &&
                                <FilterButton
                                    type="member"
                                    filter={memberFilter}
                                    clearFilter={clearFilter}
                                >
                                    {`Member: `}
                                    {memberFilter.filter(item => item.filtered === true).slice(0, 2).map(item => item.name).join(", ")}
                                    {memberFilter.filter(item => item.filtered === true).length > 2 
                                        && `, ${memberFilter.filter(item => item.filtered === true).length - 2} more`}
                                </FilterButton>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterHeader;