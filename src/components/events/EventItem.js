import React, { useContext } from "react";
import { AppContext } from "../../context/app-context";

import classes from "./EventItem.module.styl";

const checkDate = (date) => {
  const dateObject = new Date(date);

  const thisDayObject = new Date();

  if (
    dateObject.getFullYear() === thisDayObject.getFullYear() &&
    dateObject.getMonth() === thisDayObject.getMonth() &&
    dateObject.getDate() === thisDayObject.getDate()
  ) {
    return 0;
  }
  if (dateObject.getTime() > thisDayObject.getTime()) {
    return 1;
  }
  if (dateObject.getTime() < thisDayObject.getTime()) {
    return -1;
  }
  throw new Error("error");
};
const EventItem = (props) => {
  const ctx = useContext(AppContext);

  const dateState = checkDate(props.date);
  let color;
  switch (dateState) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "purple";
      break;
    case -1:
      color = "red";
      break;
  }
  const stylebackground = {
    backgroundColor: color,
  };

  const clickEventHandler = () => {
    ctx.setFromEvent();
    ctx.setLocation(false);
    ctx.setDataOfEvent({
      name: props.name,
      description: props.description,
      date: props.date,
      id: props.id,
    });
  };
  return (
    <div
      onClick={clickEventHandler}
      className={classes.eventItem}
      style={stylebackground}
    >
      <div title={props.name} className={classes.nameDiv}>
        <h1>{props.name}</h1>
      </div>
      <div className={classes.dateDiv}>
        <div>{props.date}</div>
      </div>
    </div>
  );
};

export default EventItem;
