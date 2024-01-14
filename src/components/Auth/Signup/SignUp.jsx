import { useState } from "react";
import { Button } from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import BannerImg from "../../../assets/banner-img.png";
import { useAuth } from "../../../context/AuthContext";


const SignUp = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        mob: "",
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
        if (user.name == "" || user.username == "" || user.password == "" || user.mob == "") {
            alert("Please fill all the fields!!");
            return;
        }
        try {
            const response = await fetch('https://avio-backend.onrender.com/register', {
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
                    name: "",
                    username: "",
                    password: "",
                    mob: ""
                })
                alert("Username already exists!!");
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="signup-banner">
            <div className="signup-content">
                <div className="signup-container">
                    <div className="signup-h1"><h1>Create your Avio Account</h1></div>
                    <div className="signup-form">

                        <div className='name-div'>
                            <MuiTextField className="input" type="text" onChange={handleChange} label="Name" name="name" value={user.name} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="email" onChange={handleChange} label="Email" name="username" value={user.username} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="password" onChange={handleChange} label="Password" name="password" value={user.password} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="text" onChange={handleChange} label="Mobile No" name="mob" value={user.mob} />
                        </div>

                        <div className='signup-btn-div'>
                            <Button onClick={submitForm} id='signup-btn'>
                                Register
                            </Button>
                        </div>
                        <div className='signup-navigation-div'>
                            <span>Already have an account?</span>
                            <span id='toLogin-btn' onClick={() => navigate("/login")}>
                                Login
                            </span>
                        </div>
                    </div>

                </div>
                <img className="banner-img" src={BannerImg} />
            </div>
        </div>
    );
};

export default SignUp;