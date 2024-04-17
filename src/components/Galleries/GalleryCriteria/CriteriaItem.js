import React, { forwardRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./CriteriaItem.css";

const CriteriaItem = forwardRef(({ item, handleItem }, ref) => {
    return (
        <li ref={ref} className="filter__item" onClick={handleItem}>
            <FaSearch />
            <p>{item}</p>
        </li>
    )
});

export default CriteriaItem;