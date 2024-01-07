import React from "react";
import "./About.css";
import Aryan from "../../assets/aryan.JPG";

const About = () => {
    return (
        <div className="about">
            <center><h1 style={{ paddingTop: "20px" }}>Meet The Team</h1>
            </center>
            <br />

            <div class="row">
                <div class="columns">
                    <div class="cards">
                        <img class="images" src={Aryan} alt="Jane" />
                        <div class="container">
                            <h2>Aryan Singh</h2>
                            <p>BTech Indian Institute of Technology Kharagpur</p>
                            <p>singharyan7481@gmail.com</p>
                            <p><button class="buttons"> <a rel="stylesheet" href="https://www.linkedin.com/in/aryan-singh-103179233/" style={{textDecoration:"none" , color:"white"}}> Contact</a></button></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
