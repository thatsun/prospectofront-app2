import React from 'react';





const Autohidebutton= (props) =>{

    const {userroll,handleclick,hidefrom,action}=props;

    if (hidefrom === userroll) {
        return null;
    }

    return(
        
        
        <button className="buton_border blanco" onClick={(e) => handleclick(e)} >{action}</button>
    )

}

export default Autohidebutton;