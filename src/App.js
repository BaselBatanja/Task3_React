import React, { useContext } from "react";
import {} from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import AddEvent from "./components/events/AddEvent";
import EventsList from "./components/events/EventsList";
import Layout from "./components/layout/Layout";
import NotFound from "./components/UI/NotFound";

import { AppContext } from "./context/app-context";
// import classes from "./СomponentStyle.module.styl";
//npm run serve

const App = () => {
  const list = useContext(AppContext).listLoaction;
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/events-list" />
        </Route>
        <Route path="/events-list">
          <EventsList />
        </Route>
        <Route path="/new-event">
          <AddEvent />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
