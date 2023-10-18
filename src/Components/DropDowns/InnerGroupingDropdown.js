import React from "react";
import "./InnerGroupingDropdown.css";
import { useMyContext } from "../../MyContext";
function InnerDropdown() {
  const { data, setData } = useMyContext();
  const handleChange = (param) => {
    let temp = { ...data, grouping_config: param };
    localStorage.setItem('grouping_config', param);
    setData(temp);
  };
  return (
    <div className="dropdown grouping-dropdown">
      <h6
        onClick={() => {
          handleChange("Status");
        }}
      >
        Status
      </h6>
      <h6
        onClick={() => {
          handleChange("Priority");
        }}
      >
        Priority
      </h6>
      <h6
        onClick={() => {
          handleChange("User");
        }}
      >
        User
      </h6>
    </div>
  );
}

export default InnerDropdown;
