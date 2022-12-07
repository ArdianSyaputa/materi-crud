import './App.css';
// import Tabel from './component/Tabel';
// import Form from './component/Form';
import NavigationBar from './component/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Login from './pages/Login';
import { BrowserRouter,Switch,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
    <div className="center">
      <NavigationBar />
      <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/edit/:id" component={Edit} exact/>
          <Route path="/login" component={Login} exact/>
        </Switch>
      </main>
      </BrowserRouter>
    {/* <Form />
    <Tabel/> */}
    </div>
    </div>
  );
}

export default App;
