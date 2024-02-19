import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    console.log('this is home')
    
    useEffect(() => {
        navigate("/chats");
        // console.log('AuthProtectedLayout rerender')
        // const jwt = localStorage.getItem("jwt");
        // navigate("/chats");
        
    }, []);

    return <div className="Home">This is home. Complete your profile after registration</div>;
};

export default Home;
