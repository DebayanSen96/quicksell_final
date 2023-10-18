import React, { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}

export function MyProvider({ children }) {
  const [data, setData] = useState({
    grouping_config: "Status",
    ordering_config: "Priority",
    apiData: {},
  });

  useEffect(() => {
    // Fetch data from local storage
    handleChange();
  }, []);

  async function handleChange() {
    const savedGroupingConfig = localStorage.getItem("grouping_config");
    const savedOrderingConfig = localStorage.getItem("ordering_config");
    let obj = { ...data };
    if (savedGroupingConfig && savedOrderingConfig) {
      
      obj.ordering_config = savedOrderingConfig;
      obj.grouping_config = savedGroupingConfig;

      // Make the API call after retrieving local storage data
      await apiCall(obj);
    }else {
      await apiCall(obj);
    }
  }

  const apiCall = async (obj) => {
    await fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((result) => {
        // Update the state with the fetched data
        setData({ ...obj, apiData: result });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return <MyContext.Provider value={{ data, setData }}>{children}</MyContext.Provider>;
}