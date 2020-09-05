import React from 'react';

import './styles/intelifield.css'

const Inteliinput= (props) =>{

    const {userroll,hidefrom,label,data,setData}=props;

    if (hidefrom === userroll) {
        return null;
    }

    return(
        
        <div className='inteliboxmedium'>
            <div className='intelifield_label'>
                <h3>{label}</h3>
            </div>
            
            <div className='inteliinput_boxb'>
            <textarea className="inteliinputtextbox" placeholder={label} value={data} onChange={(e) => setData(e.target.value)}></textarea>
            </div>
        </div>
        
    )

}

export default Inteliinput;