import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={RegisterUser} />
      </Switch>
    </BrowserRouter>
  );
}
