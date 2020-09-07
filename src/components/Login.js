import React from 'react';

import logo from '../img/logo2.svg'


const Login= (props) =>{

    const {login,setuser,setpass,user,password,close}=props;



    return(
        
        <div className="loginmodal loginboxes" id="loginmodal">
            
            <div className="loginformbox">
                <img className="logochico" src={logo} alt="logo"></img>
                <h1 className="titlepanel">Iniciar sesion</h1>
                <input className="textbox" value={user} placeholder="email" type="text" onChange={(e) => setuser(e.target.value)}  ></input>
                <input className="textbox" value={password} placeholder="password" type="password" onChange={(e) => setpass(e.target.value)}  ></input>
                <button className="buton_normal cafe" onClick={(e) => login(e)} >Iniciar Sesion</button>
                <button className="buton_border blanco" onClick={(e) => close(e)} >Cancelar</button>



            </div>

        </div>
    )

}

export default Login;