import React, { useContext } from "react";

import FormComponent from "./FormComponent";
import classes from "./AddEvent.module.styl";
import { AppContext } from "../../context/app-context";

const AddEvent = (props) => {
  const ctx = useContext(AppContext);

  const cancelAddingEvent = () => {
    ctx.setLocation(true);
  };

  const addEventHandler = () => {
    // props.addEvent();
  };
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
              {ctx.fromEvent ? `Save` : `Add`}
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
