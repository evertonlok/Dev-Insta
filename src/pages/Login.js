import React,{useState} from 'react';
import './Login.css'
import logo from '../assets/logo.svg';
import api from '../services/api';

function Login({history}){
    const [username,setusername]=useState('');

    async function handleSubmit(e)
    {
        e.preventDefault();
        const response= await api.post('/devs',{
            user:username,
        });
        const {_id} =response.data;
        history.push(`/dev/${_id}`);
    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit} action="/main">
                <img src={logo} alt="Imagem da logo" />
                <input type="text" 
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e=>setusername(e.target.value)}
                />
                <button type="submit" >Enviar</button>
            </form>
        </div>  
    );
}
export default Login;