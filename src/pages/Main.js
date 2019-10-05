import React,{useEffect,useState} from 'react';
import api from '../services/api';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import './Main.css';
function Main ({match}){
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        async function loadUsers()
        {
            const response=await api.get('/devs',{
                headers:{user:match.params.id}
            })
            setUsers(response.data);
        }
        
        loadUsers();
    },[match.params.id])
    async function handleLike(id)
    {
       await api.post(`/devs/${id}/likes`,null,{
        headers:{user:match.params.id},
       })
       setUsers(users.filter(user=>user._id!==id));
    }
    async function handleDislike(id)
    {
        await api.post(`/devs/${id}/dislikes`,null,{
            headers:{user:match.params.id},
        })
        setUsers(users.filter(user=>user._id!==id));
    }
    return(
        <div className="main-container">
            <img src={logo} alt="TinDev" />
            {users.length> 0 ?(
            <ul>
            {users.map(user=>(
                 <li key={user._id}>
                    <img src={user.avatar} className="img-avatar" alt="imgavatar" />
                    <footer>
                        <strong>{user.name}</strong>
                        <p>{user.bios}</p>
                    </footer>
                    <div className="buttons">
                        <button type="button" onClick={()=>{handleLike(user._id)}}><img src={like} alt="Icon de like"></img></button>
                        <button type="button" onClick={()=>{handleDislike(user._id)}}><img src={dislike} alt="Icon de deslike"></img></button>
                    </div>
                </li>
                ))}
            </ul>
            ):(
                <div className="empty">Acabouu :(</div>
            )}
            </div>
    
        
        
        
    )
}
export default Main;