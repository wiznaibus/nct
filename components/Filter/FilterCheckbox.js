const FilterCheckbox = ({
    name,
    type,
    id,
    filtered,
    filterOnChange,
    children
}) => {
    return (
        <li className={`${filtered ? `text-black` : `text-gray-600`}`}>
            <label className="inline-block">
                <input
                    type="checkbox"
                    name="filter"
                    value="filter"
                    checked={filtered}
                    onChange={() => filterOnChange(id)}
                    className={`form-tick rounded-md appearance-none h-4 w-4 2xl:h-5 2xl:w-5 border-0 bg-gray-200 ${
                        type === "unit" ?
                            name === "NCT 127" ? `checked:bg-nct127 checked:text-light`
                            : name === "NCT DREAM" ? `checked:bg-nctdream`
                            : name === "WayV" ? `checked:bg-wayv checked:text-light`
                            : `checked:bg-nctu`
                        : `checked:bg-nctu`
                    } focus:outline-none align-middle`}
                />
                <span className="ml-1">{children}</span>
            </label>
        </li>
    );
};

export default FilterCheckbox;