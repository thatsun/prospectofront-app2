import React from 'react';


const Message=(props)=>{

    const {close}=props;


    return(
        <div className="loginmodal messagebox" id="messagebox">
            <div className="loginformbox" >            
                <h1 className="mesagetext" id="mesageboxtext">message</h1>
                <button className="buton_border blanco" onClick={(e) => close(e)} >ok</button>
            </div>

        
        </div>

    )
};

export default Message;