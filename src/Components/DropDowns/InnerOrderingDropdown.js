import React from "react";
import "./InnerOrderingDropdown.css";
import { useMyContext } from "../../MyContext";

function InnerOrderingDropdown() {
  const { data, setData } = useMyContext();
  const handleChange = (param) => {
    let temp = { ...data, ordering_config: param };
    localStorage.setItem('ordering_config', param);

    setData(temp);
  };
  return (
    <div className="dropdown ordering-dropdown">
      <h6
        onClick={() => {
          handleChange("Priority");
        }}
      >
        Priority
      </h6>
      <h6
        onClick={() => {
          handleChange("Title");
        }}
      >
        Title
      </h6>
    </div>
  );
}

export default InnerOrderingDropdown;
