import React from 'react';





const Autohidelabel= (props) =>{

    const {userroll,hidefrom,message}=props;

    if (hidefrom === userroll) {
        return null;
    }

    return(
        
        
        <h3>{message}</h3>
    )

}

export default Autohidelabel;