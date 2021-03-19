import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(matchProps) =>
            localStorage.getItem("access_token") ? (
            <>
              <Component {...matchProps} />
            </>
          ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: matchProps.location },
                }} />
            )} />
    )
  };
export default ProtectedRoute;