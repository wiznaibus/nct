const FilterCheckbox = ({
    name,
    type,
    id,
    filtered,
    filterOnChange,
    children
}) => {
    return (
        <li className={`${filtered ? `text-black dark:text-white` : `text-gray-600 dark:text-gray-300`}`}>
            <label className="inline-block">
                <input
                    type="checkbox"
                    name="filter"
                    value="filter"
                    checked={filtered}
                    onChange={() => filterOnChange(id)}
                    className={`form-tick rounded-md appearance-none h-4 w-4 2xl:h-5 2xl:w-5 border-0 bg-gray-200 dark:bg-gray-500 ${
                        type === "unit" ?
                            name === "NCT U" ? `checked:bg-nctu dark:checked:bg-nctu`
                            : name === "NCT 127" ? `checked:bg-nct127 dark:checked:bg-nct127`
                            : name === "NCT DREAM" ? `checked:bg-nctdream dark:checked:bg-nctdream`
                            : name === "WayV" ? `checked:bg-wayv dark:checked:bg-gray-300`
                            : name === "NCT WISH" ? `checked:bg-nctwish dark:checked:bg-nctwish`
                            : name === "SuperM" ? `checked:bg-superm dark:checked:bg-superm`
                            : `checked:bg-nctu dark:checked:bg-nctu`
                        : `checked:bg-nctu dark:checked:bg-nctu`
                    } focus:outline-none align-middle`}
                />
                <span className="ml-1">{children}</span>
            </label>
        </li>
    );
};

export default FilterCheckbox;