import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home.jsx'
import TermsOfUse from './components/parts/termsOfUse.jsx'

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact={true} path="/" component={Home}/>
                        <Route exact={true} path="/terms-of-service" component={TermsOfUse}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
