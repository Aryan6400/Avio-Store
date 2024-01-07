import { useState } from "react";
import { Button } from "@mui/material";
import MuiTextField from '@mui/material/TextField';
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import BannerImg from "../../../assets/banner-img.png";
import { useAuth } from "../../../context/AuthContext";


const SignUp = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        Mob: "",
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
        setAuth(true);
        event.preventDefault();
        navigate('/');
    }


    return (
        <div className="signup-banner">
            <div className="signup-content">
                <div className="signup-container">
                    <div className="signup-h1"><h1>Create your Avio Account</h1></div>
                    <form className="signup-form" onSubmit={submitForm}>

                        <div className='name-div'>
                            <MuiTextField className="input" type="text" onChange={handleChange} label="Username" name="username" value={user.username} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="email" onChange={handleChange} label="Email" name="email" value={user.email} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="password" onChange={handleChange} label="Password" name="password" value={user.password} />
                        </div>

                        <div className='name-div'>
                            <MuiTextField className="input" type="text" onChange={handleChange} label="Mobile No" name="Mob" value={user.Mob} />
                        </div>

                        <div className='signup-btn-div'>
                            <Button type="submit" id='signup-btn'>
                                Register
                            </Button>
                        </div>
                        <div className='signup-navigation-div'>
                            <span>Already have an account?</span>
                            <span id='toLogin-btn' onClick={() => navigate("/login")}>
                                Login
                            </span>
                        </div>
                    </form>

                </div>
                <img className="banner-img" src={BannerImg} />
            </div>
        </div>
    );
};

export default SignUp;