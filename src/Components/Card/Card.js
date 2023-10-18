import React from "react";
import redDot from "../../Icons/redDot.png";
import infogray from "../../Icons/info-gray.png";

import high from "../../Icons/signal-high.png";
import medium from "../../Icons/signal-medium.png";
import low from "../../Icons/signal-low.png";
import user from "../../Icons/user.png";
import dots from "../../Icons/dots.png";
function Card({ item }) {
  const handlePriority = (priority) => {
    switch (priority) {
      case 0:
        return dots;
        break;
      case 1:
        return low;
        break;
      case 2:
        return medium;
        break;
      case 3:
        return high;
        break;
      case 4:
        return infogray;
        break;
    }
  };
  return (
    <div id={item.id} className="card">
      <div className="card-data">
        <h6>{item.id}</h6>
        <h5>{item.title}</h5>
        <div className="card-bottom-div">
          <img src={handlePriority(item.priority)} width="13px" height="13px" />
          <div className="card-bottom-text">
            <div className="gray-dot-bottom"></div>
            {item.tag[0]}
          </div>
        </div>
      </div>
      <div className="card-profile-picture">
        <img
          className="card-profile-picture"
          src={user}
          width="13px"
          height="13px"
        />
      </div>
    </div>
  );
}

export default Card;
