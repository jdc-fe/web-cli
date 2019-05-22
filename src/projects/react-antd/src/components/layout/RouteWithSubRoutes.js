import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

let count = 0;

class RouteWidthSubRoutes extends React.Component {
  render() {
    const { routes } = this.props;
    return (
      <Switch>
        {
          routes.map((route, idx) => {
            count += 1;
            const { path, exact } = route;
            return (
              <Route
                key={`${count}-${idx}`}
                exact={!!exact}
                path={path}
                render={(props) =>
                  <route.component {...props} routes={route.routes} />}
              />
            );
          })
        }
      </Switch>
    );
  }
}
export default withRouter(RouteWidthSubRoutes);
