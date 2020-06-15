import React, {Component} from 'react'
import Home from './components/Home.jsx'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
