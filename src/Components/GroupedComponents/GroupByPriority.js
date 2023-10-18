import React, { useState, useEffect } from "react";
import "./GroupByPriority.css";
import whiteDot from "../../Icons/whiteDot.png";
import alert from "../../Icons/alert.png"
import high from "../../Icons/signal-high.png"
import medium from "../../Icons/signal-medium.png"
import low from "../../Icons/signal-low.png"
import yellowDot from "../../Icons/yellowdot.png";
import tick from "../../Icons/tick.png";
import cross from "../../Icons/cross.png";
import Card from "../Card/Card";
import plus from "../../Icons/plus.png";
import user from "../../Icons/user.png";
import dots from "../../Icons/dots.png";
import { useMyContext } from "../../MyContext";
function GroupByPriority({ props }) {
  const [data, setData] = useState({
    Todo: [],
    inProgress: [],
    Done: [],
    Backlog: [],
    Canceled: [],
  });

  function sortByPriority(array) {
    return array.sort((a, b) => b.priority - a.priority);
  }
  
  // Function to sort by title (ascending)
  function sortByTitle(array) {
    return array.sort((a, b) => a.title.localeCompare(b.title));
  }

  async function sortAndCategorizeData(props) {
    const categorizedData = {
      NoPriority:[],
      Urgent:[],
      High:[],
      Medium:[],
      Low:[]
    };
    props?.tickets?.forEach((ticket) => {
      switch (ticket.priority) {
        case 0:
          categorizedData.NoPriority.push(ticket);

          break;
        case 1:
          categorizedData.Low.push(ticket);
          break;
        case 2:
          categorizedData.Medium.push(ticket);
          break;
        case 3:
          categorizedData.High.push(ticket);
          break;
        case 4:
          categorizedData.Urgent.push(ticket);
          break;
        default:
          // Handle any other status if needed
          break;
      }
    });
    setData((prevData) => {
      return {
        ...prevData,
        ...categorizedData,
      };
    });
    handlePriority(categorizedData);
  }
  
  const handlePriority = async(temp) => {
    const savedOrderingConfig = localStorage.getItem("ordering_config");
    if(savedOrderingConfig){
    if(savedOrderingConfig=="Priority")
    {
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          const value = temp[key];
          sortByPriority(value);
        }
      }
    }
    else {
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          const value = temp[key];
          sortByTitle(value);
        }
      }
    }
  }else {
    if(props.ordering_config=="Priority")
    {
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          const value = temp[key];
          sortByPriority(value);
        }
      }
    }
    else {
      for (const key in temp) {
        if (temp.hasOwnProperty(key)) {
          const value = temp[key];
          sortByTitle(value);
        }
      }
    }
  }
    setData(temp);
  }
  useEffect(() => {
    sortAndCategorizeData(props.apiData);
  }, [props]);
  return (
    <div className="content-status">
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={dots} width="13px" height="13px" />
          <h6>No Priority</h6>
          <h5>{data?.NoPriority?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.NoPriority?.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={alert} width="13px" height="13px" />
          <h6>Urgent</h6>
          <h5>{data?.Urgent?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.Urgent?.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={high} width="13px" height="13px" />
          <h6>High</h6>
          <h5>{data?.High?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.High?.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={medium} width="13px" height="13px" />
          <h6>Medium</h6>
          <h5>{data?.Medium?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.Medium?.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={low} width="13px" height="13px" />
          <h6>Low</h6>
          <h5>{data?.Low?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.Low?.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
    </div>
  );
}

export default GroupByPriority;
