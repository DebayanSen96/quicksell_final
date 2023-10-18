import logo from "./logo.svg";
import "./App.css";
import down from "./Icons/down.png";
import menu from "./Icons/menu.png";
import Dropdown from "./Components/DropDowns/Dropdown";
import { useEffect, useState } from "react";
import { useMyContext } from "./MyContext";
import GroupByPriority from "./Components/GroupedComponents/GroupByPriority";
import GroupByStatus from "./Components/GroupedComponents/GroupByStatus";
import GroupByUser from "./Components/GroupedComponents/GroupByUser";
function App() {
  const [show, setShow] = useState(false);
  const [component, setComponent] = useState(1);
  const { data, setData, obj } = useMyContext();
  useEffect(() => {
    const savedGroupingConfig = localStorage.getItem("grouping_config");
    // Create the initial data state
   if(savedGroupingConfig){
    switch (savedGroupingConfig) {
      case "Status":
        setComponent(1);
        
        break;
      case "Priority":
        setComponent(2);
        break;
      case "User":
        setComponent(3);
        break;
    }
   }
   else{
    switch (data.groupingConfig) {
      case "Status":
        setComponent(1);
        break;
      case "Priority":
        setComponent(2);
        break;
      case "User":
        setComponent(3);
        break;
    }
   }

   
   
  }, [data]);
 
  return (
    <div className="App">
      <div className="upper_div">
        <div className="drop-down">
          <div
            className="button"
            onClick={() => {
              setShow(!show);
            }}
          >
            <img src={menu} width="16px" height="16px" />
            <h6>Display</h6>
            <img src={down} width="10px" height="10px" />
          </div>
          {show && <Dropdown />}
        </div>
      </div>

      {component == 1 && <GroupByStatus props={data} />}
      {component == 2 && <GroupByPriority props={data} />}
      {component == 3 && <GroupByUser props={data} />}
    </div>
  );
}

export default App;
