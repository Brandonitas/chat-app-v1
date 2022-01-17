import React from 'react'
import { ChatEngine } from 'react-chat-engine';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import { AuthProvider } from "./contexts/AuthContext"
import LoginForm from './Components/LoginForm';
import Chats  from './Components/Chats';

const App = () => {

    return (
        <div style={{ fontFamily: 'Avenir' }}>
            <Router>
                <AuthProvider>
                <Switch>
                    <Route path="/chats" component={Chats} />
                    <Route path="/" component={LoginForm} />
                </Switch>
                </AuthProvider>
            </Router>
        </div>
    )
}

export default App
