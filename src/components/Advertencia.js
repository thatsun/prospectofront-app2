import React from 'react';


const Advertencia=(props)=>{

    const {exit,resume}=props;


    return(
        <div className="loginmodal messagebox" id="advertencia">
            <div className="loginformbox" >            
                <h1 className="mesagetext" id="advertenciaboxtext">quiting this form means the lost the current data, Did you want to quit?</h1>
                <button className="buton_border blanco" onClick={(e) => exit(e)} >quit</button>
                <button className="buton_border blanco" onClick={(e) => resume(e)} >resume</button>
            </div>

        
        </div>

    )
};

export default Advertencia;