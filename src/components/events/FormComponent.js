import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../context/app-context";

import classes from "./FormComponent.module.styl";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";
const reducerFunction = (state, action) => {
  if (action.type === "SET_NAME") {
    return {
      ...state,
      inputName: action.val,
    };
  }
  if (action.type === "SET_DESCRIPTION") {
    return {
      ...state,
      inputDescription: action.val,
    };
  }
  if (action.type === "SET_DATE") {
    return {
      ...state,
      inputDate: action.val,
    };
  }
  if (action.type === "SET_NAME_TOUCHED") {
    return {
      ...state,
      nameTouched: action.value ?? true,
    };
  }
  if (action.type === "SET_DESCRIPTION_TOUCHED") {
    return {
      ...state,
      descriptionTouched: action.value ?? true,
    };
  }
  if (action.type === "SET_DATE_TOUCHED") {
    return {
      ...state,
      dateTouched: action.value ?? true,
    };
  }
  if (action.type === "SET_TOUCHED_ALL") {
    return {
      ...state,
      nameTouched: action.value ?? true,
      descriptionTouched: action.value ?? true,
      dateTouched: action.value ?? true,
    };
  }
  if (action.type === "SET_ALL") {
    return {
      ...state,
      inputName: action.name,
      inputDescription: action.description,
      inputDate: action.date,
    };
  }
};

const FormComponent = (props) => {
  const ctx = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dateRef = useRef();
  const [inputs, despatch] = useReducer(reducerFunction, {
    inputName: "",
    inputDescription: "",
    inputDate: "",
    nameTouched: false,
    descriptionTouched: false,
    dateTouched: false,
  });
  const formIsValid =
    inputs.inputName !== "" &&
    inputs.inputDescription !== "" &&
    inputs.inputDate !== undefined &&
    inputs.inputDate !== "";

  const { fromEvent } = ctx;

  useEffect(() => {
    if (fromEvent) {
      despatch({
        type: "SET_ALL",
        name: ctx.dataOfEvent.name,
        description: ctx.dataOfEvent.description,
        date: ctx.dataOfEvent.date,
      });
      dateRef.current.value = ctx.dataOfEvent.date;
    }
  }, [fromEvent]);

  const submitHandler = (e) => {
    despatch({ type: "SET_TOUCHED_ALL" });

    if (formIsValid) {
      const obj = {
        inputName: inputs.inputName,
        inputDescription: inputs.inputDescription,
        inputDate: inputs.inputDate,
      };
      setLoading(true);
      setError(false);

      if (!fromEvent) {
        fetch("https://task3-99c97-default-rtdb.firebaseio.com/events.json", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            despatch({
              type: "SET_ALL",
              name: "",
              description: "",
              date: "",
            });

            despatch({ type: "SET_TOUCHED_ALL", value: false });

            dateRef.current.value = "";
            ctx.setLocation(true);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      } else {
        fetch(
          `https://task3-99c97-default-rtdb.firebaseio.com/events/${ctx.dataOfEvent.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            despatch({
              type: "SET_ALL",
              name: "",
              description: "",
              date: "",
            });

            despatch({ type: "SET_TOUCHED_ALL", value: false });

            dateRef.current.value = "";
            ctx.setLocation(true);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }
    }
    e.preventDefault();
  };

  const changeInputNameHandler = (event) => {
    despatch({ type: "SET_NAME", val: event.target.value });
  };

  const changeInputDescriptionHandler = (event) => {
    despatch({ type: "SET_DESCRIPTION", val: event.target.value });
  };

  const changeDateHandler = (event) => {
    despatch({ type: "SET_DATE", val: event.target.value });
  };

  const blurNameInputHandler = (event) => {
    despatch({ type: "SET_NAME_TOUCHED" });
  };

  const blurDescriptionInputHandler = (event) => {
    despatch({ type: "SET_DESCRIPTION_TOUCHED" });
  };

  const nameInputClassesInvalid = inputs.inputName === "" && inputs.nameTouched;
  const descriptionInputClassesInvalid =
    inputs.inputDescription === "" && inputs.descriptionTouched;
  const dateInputInvalid = inputs.inputDate === "" && inputs.dateTouched;

  return (
    <>
      {error && (
        <ErrorModal
          onClose={() => {
            setError(false);
          }}
          message={error}
        />
      )}
      <form
        onSubmit={submitHandler}
        className={`${classes.form} ${props.className}`}
      >
        <div className={classes.innerDiv}>
          <label
            className={`${nameInputClassesInvalid ? classes.invalidLabel : ""}`}
            htmlFor="name"
          >
            Name:
          </label>
          <input
            onChange={changeInputNameHandler}
            type="text"
            className={`${nameInputClassesInvalid ? classes.invalidInput : ""}`}
            id="name"
            onBlur={blurNameInputHandler}
            value={inputs.inputName}
          />
        </div>

        <div className={`${classes.innerDiv} ${classes.textAreaDiv}`}>
          <label
            className={`${
              descriptionInputClassesInvalid ? classes.invalidLabel : ""
            }`}
            htmlFor="desc"
          >
            Description:
          </label>
          <textarea
            className={`${
              descriptionInputClassesInvalid ? classes.invalidInput : ""
            }`}
            onChange={changeInputDescriptionHandler}
            id="desc"
            onBlur={blurDescriptionInputHandler}
            cols={5}
            rows={5}
            value={inputs.inputDescription}
          ></textarea>
        </div>
        <div className={classes.innerDiv}>
          <label
            htmlFor="date"
            className={`${dateInputInvalid ? classes.invalidLabel : ""}`}
          >
            Date:
          </label>
          <input
            className={`${dateInputInvalid ? classes.invalidInput : ""}`}
            ref={dateRef}
            onChange={changeDateHandler}
            type="date"
            // value={inputs.inputDate}
          />
        </div>
        {props.children}
        {loading && <LoadingSpinner />}
      </form>
    </>
  );
};

export default FormComponent;
