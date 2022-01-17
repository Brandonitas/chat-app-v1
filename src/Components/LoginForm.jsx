import { useState } from "react"
import axios from "axios";
import { GoogleOutlined } from '@ant-design/icons';
import "firebase/app";
import { useHistory } from 'react-router-dom';

import { auth } from '../firebase';
import firebase from 'firebase/app';
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { updateUser } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        //
        const authObject = { 'Project-ID':  process.env.REACT_APP_PROJECT_ID, 'User-Name': username, 'User-Secret': password};
        try{
            await axios.get('https://api.chatengine.io/chats', { headers: authObject});

            updateUser({
                email: username,
                uid: password
            })

            history.push('/chats');

        }catch(error){
            setError('Incorrect credentials');
        }
    }
    
    return (
        <div className="wrapper">

            <div id="login-card">
                <h2>Welcome!</h2>
                <div className="form">
                <h1 className="title">Chat App</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} className="input" placeholder="Username" required/>
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="input" placeholder="Password" required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                    <div className="separator">Or</div>
                    <div className='login-button google'
                        //onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                        >
                        <GoogleOutlined /> Sign In With Google
                    </div>
                    <h2 className="error" style={{ textAlign: 'center', color: 'white', marginTop: '1rem' }}>{error}</h2>
                </form>
            </div>

            </div>
        </div>
    )
}

export default LoginForm
