import { useContext } from 'react';
import { FilterMenuVisibilityStateContext } from './FilterMenuVisibility';
import { FilterNonparticipatingMembersStateContext } from './FilterNonparticipatingMembers'
import { FilterDuplicateTracksStateContext } from './FilterDuplicateTracks';
import { FilterReleaseTypeContext, FilterUnitContext, FilterLanguageContext, FilterMemberContext } from './FilterContexts';

import FilterButton from './FilterButton';
import FilterMenuSection from './FilterMenuSection';
import { Switch } from '@headlessui/react'
import { Filter as FilterIcon, X } from 'react-feather'

const FilterMenu = ({
    releaseTypeFilterOnChange,
    unitFilterOnChange,
    languageFilterOnChange,
    memberFilterOnChange,
    clearFilter,
    albumCount = 0,
    songCount = 0
}) => {
    const { filterMenuVisibility, setFilterMenuVisibility } = useContext(FilterMenuVisibilityStateContext);

    const { nonparticipatingMembersFilter, setNonparticipatingMembersFilter } = useContext(FilterNonparticipatingMembersStateContext);
    const { duplicateTracksFilter, setDuplicateTracksFilter } = useContext(FilterDuplicateTracksStateContext);

    const { releaseTypeFilter } = useContext(FilterReleaseTypeContext);
    const { unitFilter } = useContext(FilterUnitContext);
    const { languageFilter } = useContext(FilterLanguageContext);
    const { memberFilter } = useContext(FilterMemberContext);

    return (
        <div className="h-screen overflow-y-auto overscroll-contain bg-gray-100 lg:bg-transparent">
            <div className="bg-gray-100 text-sm 2xl:text-base p-6">
            <div className="lg:hidden">
                <Switch.Group>
                    <Switch
                        checked={filterMenuVisibility}
                        onChange={setFilterMenuVisibility}>
                    </Switch>
                    <Switch.Label>
                        <span className="cursor-pointer">
                            <X className="" strokeWidth={2} size={16} />
                        </span>
                        <div style={{ width: 9999 + 'px', left: -9999 + 'px' }} className={`overscroll-contain ${filterMenuVisibility ? `absolute -top-0 h-screen w-full overflow-hidden` : `hidden`}`}>
                        </div>
                    </Switch.Label>
                </Switch.Group>
            </div>
            <div className="flex flex-row flex-nowrap justify-start gap-x-1 items-center mt-1 mb-2 border-b border-gray-400">
                <h3 className="title text-2xl"><FilterIcon strokeWidth={2} size={16} /> Filters</h3>
                <div className={`${
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

            <div className="flex flex-wrap gap-y-1 mt-1">
                {
                    releaseTypeFilter.filter(releaseType => releaseType.filtered === true).length > 0 &&
                    <FilterButton
                        prefix="Release Type: "
                        type="releaseType"
                        filter={releaseTypeFilter}
                        clearFilter={clearFilter}
                    >
                        Release Type: {releaseTypeFilter.filter(releaseType => releaseType.filtered === true).length}
                    </FilterButton>
                }
                {
                    unitFilter.filter(unit => unit.filtered === true).length > 0 &&
                    <FilterButton
                        prefix="Unit: "
                        type="unit"
                        filter={unitFilter}
                        clearFilter={clearFilter}
                    >
                        Unit: {unitFilter.filter(releaseType => releaseType.filtered === true).length}
                    </FilterButton>
                }
                {
                    languageFilter.filter(language => language.filtered === true).length > 0 &&
                    <FilterButton
                        prefix="Language: "
                        type="language"
                        filter={languageFilter}
                        clearFilter={clearFilter}
                    >
                        Language: {languageFilter.filter(releaseType => releaseType.filtered === true).length}
                    </FilterButton>
                }
                {
                    memberFilter.filter(member => member.filtered === true).length > 0 &&
                    <FilterButton
                        prefix="Member: "
                        type="member"
                        filter={memberFilter}
                        clearFilter={clearFilter}
                    >
                        Member: {memberFilter.filter(releaseType => releaseType.filtered === true).length}
                    </FilterButton>
                }
            </div>
            <div className="flex flex-row flex-nowrap gap-x-1 my-3">
                <div className="pb-0.5"><span className="bg-nctu py-0.5 px-2.5 rounded-full">{albumCount} Albums</span></div>
                <div className="pb-0.5"><span className="bg-nctu py-0.5 px-2.5 rounded-full">{songCount} Tracks</span></div>
            </div>
            <ul className="mb-2">
                <li className="">
                    <div className="flex flex-wrap gap-x-1 items-baseline mb-1">
                        <Switch.Group>
                            <Switch
                                checked={duplicateTracksFilter}
                                onChange={setDuplicateTracksFilter}
                                className={`${duplicateTracksFilter ? 'bg-nctu' : 'bg-gray-200'
                                    } relative inline-flex items-center h-5 rounded-full w-10 border`}
                            >
                                <span className="sr-only">Hide duplicate tracks</span>
                                <span
                                    className={`transform transition ease-in-out duration-200 ${duplicateTracksFilter ? 'translate-x-6' : 'translate-x-1'} inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                            <Switch.Label className="cursor-pointer">Hide duplicate tracks</Switch.Label>
                        </Switch.Group>
                    </div>
                </li>
                <li className="">
                    <div className="flex flex-wrap gap-x-1 items-baseline mb-1">
                        <Switch.Group>
                            <Switch
                                checked={nonparticipatingMembersFilter}
                                onChange={setNonparticipatingMembersFilter}
                                className={`${nonparticipatingMembersFilter ? 'bg-nctu' : 'bg-gray-200'
                                    } relative inline-flex items-center h-5 rounded-full w-10 border`}
                            >
                                <span className="sr-only">Hide non-participating members</span>
                                <span
                                    className={`transform transition ease-in-out duration-200 ${nonparticipatingMembersFilter ? 'translate-x-6' : 'translate-x-1'} inline-block w-3 h-3 transform bg-white rounded-full`}
                                />
                            </Switch>
                            <Switch.Label className="cursor-pointer">Hide non-participating members</Switch.Label>
                        </Switch.Group>
                    </div>
                </li>
            </ul>
            <ul className="border-t border-gray-300 pb-16 lg:pb-0">
                <FilterMenuSection
                    name="Release Type"
                    type="releaseType"
                    className={"grid grid-flow-col grid-rows-5"}
                    filter={releaseTypeFilter}
                    filterOnChange={releaseTypeFilterOnChange}
                    clearFilter={clearFilter}
                />
                <FilterMenuSection
                    name="Unit"
                    type="unit"
                    className={"grid grid-cols-2"}
                    filter={unitFilter}
                    filterOnChange={unitFilterOnChange}
                    clearFilter={clearFilter}
                />
                <FilterMenuSection
                    name="Language"
                    type="language"
                    className={"grid grid-cols-2"}
                    filter={languageFilter}
                    filterOnChange={languageFilterOnChange}
                    clearFilter={clearFilter}
                />
                <FilterMenuSection
                    name="Member"
                    type="member"
                    className={"grid grid-cols-3"}
                    filter={memberFilter}
                    filterOnChange={memberFilterOnChange}
                    clearFilter={clearFilter}
                />
            </ul>
            </div>
        </div>
    );
}

export default FilterMenu;