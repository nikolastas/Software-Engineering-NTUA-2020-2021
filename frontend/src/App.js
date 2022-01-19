

import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Data from './Data';
import Logout from './Logout';

function App() {
  const title = "SoftEng";
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>    
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/data">
              <Data />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>    
            <Route path="*">
              <NotFound />
            </Route>    
          </Switch>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
