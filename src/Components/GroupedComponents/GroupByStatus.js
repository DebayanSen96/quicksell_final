import React, { useState, useEffect } from "react";
import "./GroupByStatus.css";
import redDot from "../../Icons/redDot.png";
import yellowDot from "../../Icons/yellowdot.png";
import tick from "../../Icons/tick.png";
import cross from "../../Icons/cross.png";
import plus from "../../Icons/plus.png";
import dots from "../../Icons/dots.png";
import Card from "../Card/Card";
function GroupByStatus({ props }) {
  const [data, setData] = useState({
    Todo: [],
    inProgress: [],
    Done: [],
    Backlog: [],
    Canceled: [],
  });

  async function sortAndCategorizeData(props) {
    const categorizedData = {
      Todo: [],
      inProgress: [],
      Done: [],
      Backlog: [],
      Canceled: [],
    };
    props?.tickets?.forEach((ticket) => {
      switch (ticket.status) {
        case "Todo":
          categorizedData.Todo.push(ticket);

          break;
        case "In progress":
          categorizedData.inProgress.push(ticket);
          break;
        case "Done":
          categorizedData.Done.push(ticket);
          break;
        case "Backlog":
          categorizedData.Backlog.push(ticket);
          break;
        case "Canceled":
          categorizedData.Canceled.push(ticket);
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
    <div className="content-status">
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={redDot} width="13px" height="13px" />
          <h6>Backlog</h6>
          <h5>{data?.Backlog?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.Backlog.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <div className="gray-dot"></div>
          <h6>Todo</h6>
          <h5>{data?.Todo?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.Todo.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={yellowDot} width="13px" height="13px" />
          <h6>In Progress</h6>
          <h5>{data?.inProgress?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.inProgress.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={tick} width="13px" height="13px" />
          <h6>Done</h6>
          <h5>{data?.Done?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.Done.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
      <div className="content-box-status">
        <div className="content-header-status">
          <img src={cross} width="13px" height="13px" />
          <h6>Canceled</h6>
          <h5>{data?.Canceled?.length}</h5>
          <img className="divider-icon" src={plus} width="13px" height="13px" />
          <img src={dots} width="13px" height="13px" />
        </div>
        {data.Canceled.map((item) => {
          return (
            <Card item={item}/>
          );
        })}
      </div>
    </div>
  );
}

export default GroupByStatus;
