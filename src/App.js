import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CheckVaccine from './CheckVaccine';
import Homepage from './Homepage';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/CheckVaccine" >
          <CheckVaccine />
        </Route>
        <Route exact path="/" >
          <Homepage />
        </Route>
      </Switch>
    </Router>
   
  );
}

export default App;
