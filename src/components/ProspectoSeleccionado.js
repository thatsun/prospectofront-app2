import React from 'react';


import Intelifield from './Intelifield.js';
import './styles/intelifield.css';


const ProspectoSeleccionado= (props) =>{

    const {userroll,prospectodata}=props;

    if (prospectodata === null) {
        return null;
    }
    if (prospectodata.name === null) {
        return null;
    }
    

    return(
        
        <div className='intelibox' >
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Nombre'} data={prospectodata.name} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Primer apellido'} data={prospectodata.lastname} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Segundo apellido'} data={prospectodata.lastlastname} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Calle'} data={prospectodata.adress_street} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'NUmero de casa'} data={prospectodata.adress_number} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Colonia'} data={prospectodata.adress_colony} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Codigo postal'} data={prospectodata.adress_cp} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Telefono'} data={prospectodata.phonenumber} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'RFC'} data={prospectodata.rfc} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Estatus'} data={prospectodata.status} />
            <textarea className="inteliinputtextbox" readOnly={true} placeholder={''} value={prospectodata.reject_details}></textarea>


            

        </div>
        
    )

}

export default ProspectoSeleccionado;