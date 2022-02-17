

import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Data from './Data';
import Logout from './Logout';
import { useState } from "react";
import { LoginContext } from './Context/LoginContext';

function App() {
  const title = "SoftEng";
  //create login state
  const [globalUsername, setGlobalUsername] = useState(null);
  const [globalLoginToken, setGlobalLoginToken] = useState(null);
  return (
    
    <Router>
      <LoginContext.Provider value={{globalUsername, setGlobalUsername, globalLoginToken, setGlobalLoginToken}}>
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
      </LoginContext.Provider>
    </Router>
    
  );
}

export default App;
