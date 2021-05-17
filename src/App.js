import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CheckVaccine from './CheckVaccine';
import Homepage from './Homepage';
import Unsubscribe from './Unsubscribe'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/CheckVaccine" >
          <CheckVaccine />
        </Route>
        <Route exact path="/unsubscribe/:email" >
          <Unsubscribe />
        </Route>
        <Route path="/" >
          <Homepage />
        </Route>
      </Switch>
    </Router>
   
  );
}

export default App;
