import React from "react";
import { Link } from 'react-router-dom';
import './Register.css';
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate();

    function handleRegister(event){
        event.preventDefault()

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        axios.post("http://localhost:3000/auth/register",{
            username , password
        },{
            withCredentials: true
        }).then(response=>{
            console.log(response.data)
            navigate('/')
        })
    }

    return(
        <div className="register-section">
            <h1>Sound stream</h1>

            <div className="middle">
                <h1>Create new account</h1>

                <form action="" onSubmit={handleRegister}>
                  <input id="username" type="text"  placeholder="Username" />

                  <input type="password"  id="password" placeholder="Password" />
                  
                  <input type="submit" value={"Register"} />
                </form>
            </div>

            <p> already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register;