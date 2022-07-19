import React, { useContext } from "react";
import { AppContext } from "../../context/app-context";
import classes from "./MainHeader.module.styl";
import { useHistory, useLocation } from "react-router-dom";
const MainHeader = () => {
  const ctx = useContext(AppContext);

  const location = useLocation();
  const history = useHistory();
  console.log(location);

  const openAddingEventHandler = () => {
    history.push("/new-event");
    console.log(location);
  };

  const query = new URLSearchParams(location.search);
  console.log("asas", query.get("fromEvent"));
  const fromEvent = query.get("fromEvent");

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        {location.pathname !== "/new-event"
          ? `Events`
          : fromEvent
          ? `Edit Event`
          : "Create Event"}
      </div>
      <div className={classes.actions}>
        {location.pathname !== "/new-event" && (
          <button onClick={openAddingEventHandler} className={classes.button}>
            +New
          </button>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
