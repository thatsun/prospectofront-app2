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
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Name'} data={prospectodata.name} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Lastname'} data={prospectodata.lastname} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Second LastName'} data={prospectodata.lastlastname} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Street'} data={prospectodata.adress_street} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Adrees Number'} data={prospectodata.adress_number} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Colony'} data={prospectodata.adress_colony} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Postal Code'} data={prospectodata.adress_cp} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Phonenumber'} data={prospectodata.phonenumber} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'RFC'} data={prospectodata.rfc} />
            <Intelifield  userroll={userroll} hidefrom={"none"} label={'Status'} data={prospectodata.status} />
            <textarea className="inteliinputtextbox" readOnly={true} placeholder={''} value={prospectodata.reject_details}></textarea>


            

        </div>
        
    )

}

export default ProspectoSeleccionado;