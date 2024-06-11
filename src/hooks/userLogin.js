
import React,{useState,useEffect} from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const {user} = useContext(UserContext);

  
   const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // login user
           const  data  = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            setLoading(false);
            user(data);
        }
        catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }


    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" >Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};


export default Login;