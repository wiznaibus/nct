const FilterCheckbox = ({
    id,
    filtered,
    filterOnChange,
    checkboxSize = 5,
    children
}) => {
    return (
        <li className={`${filtered ? `text-black` : `text-gray-600`}`}>
            <label className="flex flex-row flex-nowrap">
                <input
                    type="checkbox"
                    name="language"
                    value="language"
                    checked={filtered}
                    onChange={() => filterOnChange(id)}
                    className={`form-tick rounded-md appearance-none h-${checkboxSize} w-${checkboxSize} border-0 bg-gray-200 checked:bg-nctu focus:outline-none`}
                />
                <span className="ml-1">{children}</span>
            </label>
        </li>
    );
};

export default FilterCheckbox;