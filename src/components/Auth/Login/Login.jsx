import { useState } from "react";
import { Button } from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import BannerImg from "../../../assets/banner-img.png";
import { useAuth } from "../../../context/AuthContext";


const Login = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();
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

    const submitForm = async() => {
        if (user.username == "" || user.password == "") {
            alert("Please fill all the fields!!");
            return;
        }
        try {
            const response = await fetch('https://avio-backend.onrender.com/login', {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(user),
            });
            const result = await response.json();

            if (result.user) {
                const currentTimestamp = new Date();
                const isoString = currentTimestamp.toISOString();
                localStorage.setItem("User", JSON.stringify(result));
                localStorage.setItem("timestamp", JSON.stringify(isoString));
                setAuth(true);
                navigate("/");
            } else {
                setUser({
                    username: "",
                    password: "",
                })
                alert("Invalid credentials!!");
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="login-banner">
            <div className="login-content">
                <div className="login-container">
                    <div className="login-h1"><h1>Login to your Avio Account</h1></div>
                    <div className="login-form">

                        <div className='name-div'>
                            <MuiTextField className="input" type="text" onChange={handleChange} label="Username" name="username" value={user.username} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="password" onChange={handleChange} label="Password" name="password" value={user.password} />
                        </div>

                        <div className='login-btn-div'>
                            <Button onClick={submitForm} id='login-btn'>
                                Login
                            </Button>
                        </div>
                        <div className='login-navigation-div'>
                            <span>Don't have an account?</span>
                            <span id='toSignup-btn' onClick={() => navigate("/signup")}>
                                Register
                            </span>
                        </div>
                    </div>

                </div>
                <img className="banner-img" src={BannerImg} />
            </div>
        </div>
    );
};

export default Login;

