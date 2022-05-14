import logo from './mylogo.png';
import './App.css';
import NavBar from "./Navbar";
import {Link, Switch, Route} from 'react-router';
import SignUp from './SignUp';
import {render} from 'react-dom';

function App() {
    {
        return (
            <>
                <div className="App">
                    <header className="App-header">
                        <NavBar/>
                        <h1>Welcome to FINCONO</h1>

                    </header>
                </div>
            </>
        );

    }
}

export default App;

