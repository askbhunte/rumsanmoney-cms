import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../utils/sessionManager";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = getUser();

      if (!currentUser) {
        return (
          <Redirect
            to={{
              pathname: "/authentication/Login",
              state: { from: props.location },
            }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
