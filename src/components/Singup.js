import React from 'react';

import logo from '../img/logo2.svg'



const Singup= (props) =>{

    const {singup,setuser,setpass,user,password,close,username,setUsername,userroll,setUserroll}=props;



    return(
        
        <div className="loginmodal loginboxes" id="singupmodal">
            
            <div className="loginformbox" >
                <img className="logochico" src={logo} alt="logo"></img>
                <h1 className="titlepanel">Create a new profile</h1>
                <input className="textbox" value={user} placeholder="email" type="text" onChange={(e) => setuser(e.target.value)}  ></input>
                <input className="textbox" value={username} placeholder="username" type="text" onChange={(e) => setUsername(e.target.value)}  ></input>
                <input className="textbox" value={password} placeholder="password" type="text" onChange={(e) => setpass(e.target.value)}  ></input>
                <input className="textbox" value={userroll} placeholder="userroll" type="text" onChange={(e) => setUserroll(e.target.value)}  ></input>
                <button className="buton_normal cafe" onClick={(e) => singup(e)} >Singup</button>
                <button className="buton_border blanco" onClick={(e) => close(e)} >Nevermind</button>



            </div>

        </div>
    )

}

export default Singup;