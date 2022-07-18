import React, { useContext } from "react";
import { AppContext } from "../../context/app-context";

import classes from "./NavBar.module.styl";
const NavBar = (props) => {
  const ctx = useContext(AppContext);

  const openListHandler = () => {
    ctx.setLocation(true);
  };

  const openFormHandler = () => {
    ctx.setLocation(false);
  };

  const classesOfListButton = `${classes.button} ${
    ctx.listLoaction ? classes.active : ""
  }`;

  const classesOfFormButton = `${classes.button} ${
    !ctx.listLoaction ? classes.active : ""
  }`;
  return (
    <nav className={`${classes.nav} ${props.className}`}>
      <div className={classes.firstDiv}>
        <button onClick={openListHandler} className={classesOfListButton}>
          List
        </button>
      </div>
      <div className={classes.secondDiv}>
        <button onClick={openFormHandler} className={classesOfFormButton}>
          Form
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
