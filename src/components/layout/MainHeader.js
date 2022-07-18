import React, { useContext } from "react";
import { AppContext } from "../../context/app-context";
import classes from "./MainHeader.module.styl";

const MainHeader = () => {
  const ctx = useContext(AppContext);

  const openAddingEventHandler = () => {
    ctx.setLocation(false);
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        {ctx.listLoaction
          ? `Events`
          : ctx.dataOfEvent
          ? `Edit Event`
          : "Create Event"}
      </div>
      <div className={classes.actions}>
        {ctx.listLoaction && (
          <button onClick={openAddingEventHandler} className={classes.button}>
            +New
          </button>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
