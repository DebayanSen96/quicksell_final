import React, { useEffect, useState } from "react";
import "./Dropdown.css";
import down from "../../Icons/down.png";
import InnerGroupingDropdown from "./InnerGroupingDropdown";
import InnerOrderingDropdown from "./InnerOrderingDropdown";
import { useMyContext } from "../../MyContext";

function Dropdown() {
  
  const config = useMyContext();
  
  const [showGrouping, setShowGrouping] = useState(false);
  const [showOrdering, setShowOrdering] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-item">
        <h6>Groupig</h6>
        <div
          className="button item-button"
          onClick={() => {
            setShowGrouping(!showGrouping);
          }}
        >
          {config.data.grouping_config}
          {showGrouping && <InnerGroupingDropdown />}
          <img src={down} width="10px" height="10px" />
        </div>
      </div>
      <div className="dropdown-item">
        <h6>Ordering</h6>
        {!showGrouping && (
          <div
            className="button item-button"
            onClick={() => {
              setShowOrdering(!showOrdering);
            }}
          >
            {config.data.ordering_config}
            {showOrdering && <InnerOrderingDropdown />}
            <img src={down} width="10px" height="10px" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
