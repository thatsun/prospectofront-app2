import React from 'react';

import './styles/intelifield.css'



const Intelifield= (props) =>{

    const {userroll,hidefrom,label,data}=props;

    if (hidefrom === userroll) {
        return null;
    }

    return(
        
        <div className='intelifield'>
            <div className='intelifield_label'>
                <h3>{label}</h3>
            </div>
            
            <div className='intelifield_data'>
                <h3 className='intelifield_data_text'>{data}</h3>
            </div>
        </div>
        
    )

}

export default Intelifield;