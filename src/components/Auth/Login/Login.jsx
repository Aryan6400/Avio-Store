import { useState } from "react";
import { Button } from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import BannerImg from "../../../assets/banner-img.png";
const root = "http://localhost:3000";


const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            };
        })
    }

    function submitForm(event) {
        localStorage.setItem("User", JSON.stringify(user));
        event.preventDefault();
        window.location.href = root;
    }


    return (
        <div className="login-banner">
            <div className="login-content">
                <div className="login-container">
                    <div className="login-h1"><h1>Login to your Avio Account</h1></div>
                    <form className="login-form" onSubmit={submitForm}>

                        <div className='name-div'>
                            <MuiTextField className="input" type="text" onChange={handleChange} label="Username" name="username" value={user.username} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="password" onChange={handleChange} label="Password" name="password" value={user.password} />
                        </div>

                        <div className='login-btn-div'>
                            <Button type="submit" id='login-btn'>
                                Login
                            </Button>
                        </div>
                        <div className='login-navigation-div'>
                            <span>Don't have an account?</span>
                            <span id='toSignup-btn' onClick={() => navigate("/signup")}>
                                Register
                            </span>
                        </div>
                    </form>

                </div>
                <img className="banner-img" src={BannerImg} />
            </div>
        </div>
    );
};

export default Login;

