import React, {useRef, useState, useEffect} from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import ChatFeed from './ChatFeed';


const Chats = () => {
    const history = useHistory();
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        if ('refreshToken' in user){
            await auth.signOut();
        }
        updateUser({})
        history.push('./');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('./')
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_PROJECT_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL).then(avatar => {
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users', formdata, {
                    headers: { "private-key": process.env.REACT_APP_PRIVATE_KEY }
                }).then(() => setLoading(false))
                .catch((error) => console.log("ERROR", error));

            })
        })

    }, [user, history])

    if(!user || loading) return "Loading";

    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Unichat
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            />
        </div>
    )
}

export default Chats
