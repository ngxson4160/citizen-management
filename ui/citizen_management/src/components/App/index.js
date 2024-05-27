import React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Account from '../Account/Account';
import AlertCustom from '../Alert';
import Header from '../Header';
import LeftSideBar from '../LeftSideBar';
import Home from '../Home';
import Household from '../Household';
import HouseholdDetail from '../HouseholdDetail';
import ContributionMoney from '../MoneyManagement/ContributionMoney';
import PeriodMoney from '../MoneyManagement/PeriodMoney';
import MoneyDetail from '../MoneyManagement/MoneyDetail';
import People from '../People';
import PersonDetail from '../PeopleDetail';
import UnAuthorizedPage from '../401Page';
import NotFoundPage from '../404Page';

import commonStore from '../../stores/commonStore';
import { routingPaths } from '../../stores/routingStore';
import userStore from '../../stores/userStore';
import './styles.css';

class App extends React.Component {
  getUnAuthorizedPage() {
    return (
      <Switch>
        <Route exact path={routingPaths.home} component={Home} />
        <Route exact path={routingPaths.people} component={UnAuthorizedPage} />
        <Route path={routingPaths.personDetail} component={UnAuthorizedPage} />
        <Route
          exact
          path={routingPaths.households}
          component={UnAuthorizedPage}
        />
        <Route
          path={routingPaths.householdDetail}
          component={UnAuthorizedPage}
        />
        <Route
          exact
          path={routingPaths.periodMoney}
          component={UnAuthorizedPage}
        />
        <Route
          exact
          path={routingPaths.contributionMoney}
          component={UnAuthorizedPage}
        />
        <Route path={routingPaths.moneyDetail} component={UnAuthorizedPage} />
        <Route path={routingPaths.account} component={Account} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default withRouter(observer(App));
