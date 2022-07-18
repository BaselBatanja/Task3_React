import React, { useContext } from "react";
import AddEvent from "./components/events/AddEvent";
import EventsList from "./components/events/EventsList";
import Layout from "./components/layout/Layout";
import ErrorModal from "./components/UI/ErrorModal";
import { AppContext } from "./context/app-context";

// import classes from "./СomponentStyle.module.styl";
//npm run serve

const App = () => {
  const list = useContext(AppContext).listLoaction;
  return (
    <>
      <Layout>
        {list && <EventsList />}
        {!list && <AddEvent />}
      </Layout>
    </>
  );
};

export default App;
