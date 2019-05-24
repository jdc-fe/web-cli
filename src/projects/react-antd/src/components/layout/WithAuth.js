import React from 'react';
import { Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { PATHS } from 'src/router';
import RouteWithSubRoutes from './RouteWithSubRoutes';

function WithAuth(RenderComponent) {
  @inject('user')
  @observer
  class Auth extends React.Component {
    constructor(props) {
      super(props);
      this.authCheck();
    }

    componentWillUpdate() {
      this.authCheck();
    }

    async authCheck() {
      const { history, user: { isLogin } } = this.props;
      if (isLogin) {
        return;
      }
      history.push(PATHS.LOGIN);
    }

    render() {
      const { routes } = this.props;
      return (
        <RenderComponent
          routeContent={(
            <Switch>
              <RouteWithSubRoutes routes={routes}></RouteWithSubRoutes>
            </Switch>
          )}
        />
      );
    }
  }

  return Auth;
}

export default WithAuth;
