import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../servises/api";

const LongPulling = () => {
    const [username, setUsername] = useState('')
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        subscribe()
    }, [])
    useEffect(() => {
        const userRequest = async () => {
            try {
                const user = await API.user.getCurrentUser();
            } catch (e) {
                if (e instanceof Error) {

                }
            }
        };
        userRequest();
    }, []);

    const subscribe = async () => {
        try {

            const {data} = await axios.get('http://localhost:3001/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage = async () => {

        const user = await API.user.getCurrentUser();
        await axios.post('http://localhost:3001/new-messages', {
            username: `${user.login}. `,
            message: value,
            id: Date.now(),
        })

    }
    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.username}
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LongPulling;