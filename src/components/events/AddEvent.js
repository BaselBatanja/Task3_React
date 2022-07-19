import React, { useContext } from "react";

import FormComponent from "./FormComponent";
import classes from "./AddEvent.module.styl";
import { AppContext } from "../../context/app-context";
import { useHistory, useLocation } from "react-router-dom";

const AddEvent = (props) => {
  const ctx = useContext(AppContext);

  const location = useLocation();
  const history = useHistory();

  const cancelAddingEvent = () => {
    history.push("/events-list");
  };

  const addEventHandler = () => {
    // props.addEvent();
  };

  const notFromEvent =
    new URLSearchParams(location.search).get("fromEvent") === null;
  return (
    <div className={classes.addEvent}>
      <FormComponent className={classes.formComponent}>
        <div className={classes.control}>
          <div>
            <button
              type="submit"
              onClick={addEventHandler}
              className={classes.button}
            >
              {notFromEvent ? "Add" : "Save"}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={cancelAddingEvent}
              className={classes.button}
            >
              Cancel
            </button>
          </div>
        </div>
      </FormComponent>
    </div>
  );
};

export default AddEvent;
