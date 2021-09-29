import FilterCheckbox from './FilterCheckbox';
import { X } from 'react-feather'
import FilterButton from './FilterButton';

const FilterMenuSection = ({
    name,
    type,
    className,
    filter,
    filterOnChange,
    clearFilter,
}) => {
    return (
        <li className="pt-1 pb-2">
            <div className={`flex flex-wrap gap-x-2 mt-2 mb-1`}>
                <h4 className="text-lg font-medium">{name}</h4>
                {
                    filter.filter(item => item.filtered === true).length > 0 && 
                    <FilterButton
                        type={type}
                        filter={filter}
                        clearFilter={clearFilter}
                    >
                        Clear {name}
                        {/* {filter.find(item => item.filtered === true).name}
                        {filter.filter(item => item.filtered === true).length > 1 && `, ${filter.filter(item => item.filtered === true).length - 1} more`} */}
                    </FilterButton>
                }
            </div>
            <fieldset>
                <ul className={className}>
                    {filter.map(item => (
                        <FilterCheckbox 
                            name={item.name}
                            type={type}
                            key={`filter-${type}-${item.id}`}
                            id={item.id}
                            filtered={item.filtered}
                            filterOnChange={filterOnChange}
                        >
                                {item.name}
                        </FilterCheckbox>
                    ))}
                </ul>
            </fieldset>
        </li>
    );
}

export default FilterMenuSection;