import React, { useState, useEffect } from "react";
import "./GroupByUser.css";
import redDot from "../../Icons/redDot.png";
import yellowDot from "../../Icons/yellowdot.png";
import tick from "../../Icons/tick.png";
import cross from "../../Icons/cross.png";
import plus from "../../Icons/plus.png";
import dots from "../../Icons/dots.png";
import Card from "../Card/Card";
function GroupByUser({ props }) {
  const [data, setData] = useState({
    Todo: [],
    inProgress: [],
    Done: [],
    Backlog: [],
    Canceled: [],
  });

  async function sortAndCategorizeData(apiData) {
    const userTickets = {};
    apiData.tickets.forEach((ticket) => {
      const user = apiData.users.find((user) => user.id === ticket.userId);
      if (user) {
        const userName = user.name;
        if (!userTickets[userName]) {
          userTickets[userName] = []; // Initialize an empty array if not exists
        }
        userTickets[userName].push(ticket); // Add the ticket to the user's array
      }
    });

    // Categorize the data first
    setData((prevData) => {
      return {
        ...prevData,
        ...userTickets,
      };
    });
    console.log(userTickets);

    // Sort the data based on the current ordering_config
    handlePriority(userTickets);
  }

  const handlePriority = async (temp) => {
    if (props.ordering_config == "Priority") {
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          const value = temp[key];
          sortByPriority(value);
        }
      }
    } else {
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          const value = temp[key];
          sortByTitle(value);
        }
      }
    }
    setData(temp);
  };

  function sortByPriority(array) {
    return array.sort((a, b) => b.priority - a.priority);
  }

  // Function to sort by title (ascending)
  function sortByTitle(array) {
    return array.sort((a, b) => a.title.localeCompare(b.title));
  }
  useEffect(() => {
    sortAndCategorizeData(props.apiData);
  }, [props]);
  return (
    <div className="content-status user-div">
    {Object.entries(data).map(([userName, userTickets]) => (
      <div key={userName} className="content-box-status">
        <div className="content-header-status">
          <h6>{userName}</h6>
          <h5>{userTickets.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {userTickets.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    ))}
  </div>
  );
}

export default GroupByUser;
