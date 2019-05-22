import React from 'react';
import {
  Switch,
  Redirect,
} from 'react-router-dom';
import RouteWithSubRoutes from
  'src/components/layout/RouteWithSubRoutes';
import { getFlatRouterData, getRedirectData } from 'src/router/router';

function Routes() {
  return (
    <Switch>
      {getRedirectData().map(item => (
        <Redirect key={item.from} exact from={item.from} to={item.to} />
      ))}
      <RouteWithSubRoutes routes={getFlatRouterData()}></RouteWithSubRoutes>
    </Switch>
  );
}

export default Routes;
