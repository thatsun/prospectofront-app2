import React from 'react';


const Advertencia=(props)=>{

    const {exit,resume}=props;


    return(
        <div className="loginmodal messagebox" id="advertencia">
            <div className="loginformbox" >            
                <h1 className="mesagetext" id="advertenciaboxtext">Perdera los datos, realmente desea salir?</h1>
                <button className="buton_border blanco" onClick={(e) => exit(e)} >salir</button>
                <button className="buton_border blanco" onClick={(e) => resume(e)} >seguir captura</button>
            </div>

        
        </div>

    )
};

export default Advertencia;