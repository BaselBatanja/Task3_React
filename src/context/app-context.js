import React, { useState } from "react";

export const AppContext = React.createContext({
  dataOfEvent: null,
  setDataOfEvent: (date) => {},
});

const AppContextProvider = (props) => {
  const [dataOfEvent, setDataOfEvent] = useState(null);

  function dataOfEventHandler(data) {
    if (data === null) setDataOfEvent(null);
    setDataOfEvent({
      name: data.name,
      description: data.description,
      date: data.date,
      id: data.id,
    });
  }
  const obj = {
    dataOfEvent: dataOfEvent,
    setDataOfEvent: dataOfEventHandler,
  };
  return (
    <AppContext.Provider value={obj}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
