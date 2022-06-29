import Navbar from './Components/Navbar';
import './App.css';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
function App() {
  return (
    <Router>

      <Navbar /> 
      <Switch>
      
      <Route exact path="/" render={(props)=>(
        <>
          <Banner {...props}/>
          <Movies {...props}/>
        </>
      )} /> 

      <Route exact path="/favourites" component={Favourite} />

      </Switch>
    </Router>
  );
}

export default App;
