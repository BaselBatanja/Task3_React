import React, { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import EventItem from "./EventItem";

import classes from "./EventsList.module.styl";
const EventsList = React.memo(() => {
  const [arrOfEvents, setArrayOfEvents] = useState([]);
  const [emptyContent, setEmptyContent] = useState(false);
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://task3-99c97-default-rtdb.firebaseio.com/events.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          setArrayOfEvents([]);
        }
        const tempArr = [];
        for (const event in data) {
          tempArr.push({
            id: event,
            inputDate: data[event].inputDate,
            inputName: data[event].inputName,
            inputDescription: data[event].inputDescription,
          });
        }
        setArrayOfEvents([...tempArr]);
        setIsLoading(false);
        if (tempArr.length === 0) {
          setEmptyContent(true);
          return;
        }
        setEmptyContent(false);
      });
  }, []);
  return (
    <div className={classes.list}>
      {arrOfEvents.map((event) => {
        return (
          <EventItem
            key={event.id}
            date={event.inputDate}
            name={event.inputName}
            description={event.inputDescription}
            id={event.id}
          />
        );
      })}
      {emptyContent && <div className={classes.notFound}>NO DATA FOUND</div>}
      {!emptyContent && loading && (
        <LoadingSpinner className={classes.notFound} />
      )}
    </div>
  );
});

export default EventsList;
