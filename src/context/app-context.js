import React, { useState } from "react";

export const AppContext = React.createContext({
  listLoaction: true,
  setLocation: (value) => {},
  fromEvent: null,
  setFromEvent: (e) => {},
  dataOfEvent: null,
  setDataOfEvent: (date) => {},
});

const AppContextProvider = (props) => {
  const [list, setList] = useState(true);
  const [fromEvent, setFromEvent] = useState(null);
  const [dataOfEvent, setDataOfEvent] = useState(null);

  function setLocationHandler(value) {
    setList(value);
    if (value === true) {
      setFromEvent(null);
      setDataOfEvent(null);
    }
  }
  function setFromEventHandler(e = true) {
    setFromEvent(e);
  }
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
    listLoaction: list,
    setLocation: setLocationHandler,
    fromEvent: fromEvent,
    setFromEvent: setFromEventHandler,
    dataOfEvent: dataOfEvent,
    setDataOfEvent: dataOfEventHandler,
  };
  return (
    <AppContext.Provider value={obj}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
