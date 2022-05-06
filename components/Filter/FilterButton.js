import { X } from 'react-feather'

const FilterButton = ({
    type,
    filter,
    clearFilter,
    children
}) => {
    return (
        <a
            onClick={() => clearFilter(type)}
            className="flex flex-nowrap items-center cursor-pointer 
                text-gray-500 hover:text-red-500 bg-white hover:bg-gray-200 
                dark:text-light dark:hover:text-red-500 dark:bg-gray-800 dark:hover:bg-black
                rounded-full mb-0.5 mr-1 pl-2 py-0.5 pr-3 text-sm">
            <X strokeWidth={2} size={16} />
            <span className="text-black dark:text-white">
                {children}
            </span>
        </a>
    );
}

export default FilterButton;