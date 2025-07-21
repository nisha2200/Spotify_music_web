import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protected =({children})=>{
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get('http://localhost:3000/auth/me',{
            withCredentials: true
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(()=>{
            navigate("/login")
        })
    },[])
    return children
}

export default Protected;