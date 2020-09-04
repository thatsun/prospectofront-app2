import React from 'react';


import Prospectos from './Prospectos.js';


const Dash= (props) =>{

    const {user,loged,logout,userid,token,prospectosData,setProspectosdata,username,userroll}=props;

    

    return(
        <div className="dashboard" id="dashboard">
            <div className="profileheader" >
                <div className="profileinfo">
                    <h1 className="username">{username}</h1>
                </div>
                
                <button className="logout blanco" onClick={(e) => logout(e)} >Logout</button>

            </div>
            <div className="dashpanelcontainer">
                <Prospectos user={user} loged={loged} token={token} userid={userid} prospectosData={prospectosData} setProspectosdata={setProspectosdata} username={username} userroll={userroll}/>
            </div>
                       
        </div>
    )

}

export default Dash;