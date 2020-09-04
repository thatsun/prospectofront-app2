import React, { useState } from 'react';
import Dropzone from './Dropzone.js'
import Autohidebutton from './Autohidebutton.js';
import Autohidelabel from './Autohidelabel.js';
import ProspectoSeleccionado from './ProspectoSeleccionado.js'
import Archivosmgr from './Archivosmgr.js'

const Prospecto=(props)=> {
    const {openstatus} = props;
    const prospectos=props.prospectosData.prospectos;
    return (
      <ul className="propectos_ulist">
        {prospectos.map((prospecto) =>
          <ListItem key={prospecto.Id} id={prospecto.Id} name={prospecto.name} status={prospecto.status} openstatus={openstatus} prospectodata={prospecto}/>
        )}
      </ul>
    );
}

const ListItem=(props)=>{
    const {id,name,status,openstatus,prospectodata}=props;
    const handledetailsbutton= (e)=>{
        e.preventDefault();

        
        openstatus(id,name,status,prospectodata);


    }
    

    return(
        <div className="prospectoitem" onClick={e=>handledetailsbutton(e)}>            
            <h3 className="prospectoitemname">{name}</h3>                             
            <h3 className="prospectoitemstatus">{status}</h3>
        </div>
    )
}


const Prospectos= (props) =>{

    const [prospectoName,setProspectoname]=useState('');
    const [prospectoLastName,setProspectoLastName]=useState('');
    const [prospectoLastLastName,setProspectoLastLastName]=useState('');
    

    const [prospectoAdressStreet,setAdressSreet]=useState('');
    const [prospectoAdressNumber,setAdressNumber]=useState('');
    const [prospectoAdressColony,setAdressColony]=useState('');
    const [prospectoAdressCp,setAdressCp]=useState('');
    const [prospectoPhone,setPhone]=useState('');
    const [prospectoRfc,setRfc]=useState('');
    
    
    const [files,setFiles]=useState(null);
    
    
    
    


    const [prospectoId,setProspectoId]=useState('');
    const [prospectoSelectedData,setselectedProspectoData]=useState(null);

    const {user,loged,userid,token,prospectosData,setProspectosdata,username,userroll}=props;
    const imagechange=(e)=>{
        e.preventDefault();        
        
        setFiles(e.target.files);   
        
        
    }
    const openstatus= (_id,_name,_status,_prospectodata)=>{
       
        
        setProspectoId(_id);
        setselectedProspectoData(_prospectodata);

       
        document.getElementById("detailspanel").classList.add("openmodal");

    }
    const closeprospectosdetailspanel=(e)=>{
        e.preventDefault();
        
        document.getElementById("detailspanel").classList.remove("openmodal");

    }
    const rechazarprospecto=(e)=>{
        e.preventDefault();
        changestatus('rechazado');

    }
    const aprobarprospecto=(e)=>{
        e.preventDefault();
        changestatus('aprobado');
    }
    const changestatus=(_status)=>{
        
        
        console.log(_status);
        
        var statusdata = {
            prosid: prospectoId,
            status: _status,
        };
        console.log(JSON.stringify(statusdata));
        console.log(statusdata);
        console.log(prospectoId);
        console.log(_status);

        fetch('/prospectos/status', {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(statusdata),
            headers: {            
                'Authorization': 'bearer '+token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()
        ).then( ( data ) =>{
            //console.log(data);
            if(data.message==="updated"){
                let prospectossurl = '/prospectos/'+userid;

                //console.log(dogsurl);
                if(userroll==="admin"){
                    prospectossurl = '/prospectos';
                }
            

                document.getElementById("loadingbox").classList.add("openmodal");

                fetch(prospectossurl, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {                
                        'Authorization': 'bearer '+token
                    }
                }).then(resp => resp.json()
                ).then( (data ) => {
                    //console.log(data);
                    document.getElementById("detailspanel").classList.remove("openmodal");
                    setProspectosdata(data);
                    if(data.prospectos.length>0){
                        
                        document.getElementById("loadingbox").classList.remove("openmodal");
                        document.getElementById("newprospectopanel").classList.remove("openmodal");

                    }
                    else{
                        document.getElementById("loadingbox").classList.remove("openmodal");
                        document.getElementById("mesageboxtext").innerHTML='no hay registros';
                        document.getElementById("messagebox").classList.add("openmodal");

                    }
                })
                .catch(err => {
                    console.log(err);
                    document.getElementById("loadingbox").classList.remove("openmodal");
                    document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                    document.getElementById("messagebox").classList.add("openmodal");
                });



            }
            else{
                document.getElementById("loadingbox").classList.remove("openmodal");
                document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                document.getElementById("messagebox").classList.add("openmodal");
                //sometthing was wrong
            }
        }).catch((err)=>{
            console.log(err);
            document.getElementById("loadingbox").classList.remove("openmodal");
            document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
            document.getElementById("messagebox").classList.add("openmodal");

        });


    }
    const addprospecto=(e)=>{
        e.preventDefault();
        if(files===null || prospectoName===''){
            return;

        }
        if(files.length===0){
            return; 
        } 
        
        document.getElementById("loadingbox").classList.add("openmodal");

        let docs=document. getElementsByClassName("documentoname");

        let filesstring="";
        for(let i=0; i< docs.length ;i++){
            filesstring=filesstring+docs[i].value;
            if(i<docs.length-1){
                filesstring=filesstring+".%.";
            }         


        }
        console.log(filesstring);
        
        

        var formdata = new FormData();
        
        formdata.append('user', userid);
        formdata.append('name', prospectoName);
        formdata.append('lastname', prospectoLastName);
        formdata.append('lastlastname', prospectoLastLastName);
        formdata.append('adress_street', prospectoAdressStreet);
        formdata.append('adress_number', prospectoAdressNumber);
        formdata.append('adress_colony', prospectoAdressColony);
        formdata.append('adress_cp', prospectoAdressCp);
        formdata.append('phonenumber', prospectoPhone);
        formdata.append('rfc', prospectoRfc);
        formdata.append('documentosnames', filesstring);
        formdata.append('status', "enviado");
        for (let i = 0 ; i < files.length ; i++) {
            formdata.append('multi-files', files[i]);
        }
        
        console.log(formdata);

        fetch('/prospectos', {
            method: 'POST',
            mode: 'cors',
            body: formdata,
            headers: {                
                'Authorization': 'bearer '+token
            }
        }).then(resp => resp.json()
        ).then( ( data ) =>{
            //console.log(data);
            setProspectoname('');
            
            if(data.message==="prospecto creado"){
                document.getElementById("loadingbox").classList.remove("openmodal");
                document.getElementById("mesageboxtext").innerHTML='prospecto añadido con exito';
                document.getElementById("messagebox").classList.add("openmodal");
                let prospectosurl = '/prospectos/'+userid;
                if(userroll==="admin"){
                    prospectosurl = '/prospectos';
                }

                
            

                document.getElementById("loadingbox").classList.add("openmodal");

                fetch(prospectosurl, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {                
                        'Authorization': 'bearer '+token
                    }
                }).then(resp => resp.json()
                ).then( (data ) => {
                //console.log(data);
                    if(data.prospectos.length>0){
                        setProspectosdata(data);
                        document.getElementById("loadingbox").classList.remove("openmodal");
                        document.getElementById("newprospectopanel").classList.remove("openmodal");

                    }
                    else{
                        document.getElementById("loadingbox").classList.remove("openmodal");
                        document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                        document.getElementById("messagebox").classList.add("openmodal");

                    }
                    

                
                //console.log(data.dogs[0].name);
                

           
            
                })
                .catch(err => {
                    console.log(err);
                    document.getElementById("loadingbox").classList.remove("openmodal");
                    document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                    document.getElementById("messagebox").classList.add("openmodal");
                    
                });

            }
            else{
                document.getElementById("loadingbox").classList.remove("openmodal");
                document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                document.getElementById("messagebox").classList.add("openmodal");

            }
            



        }).catch(error=>{
            console.log(error);
            document.getElementById("loadingbox").classList.remove("openmodal");
            document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
            document.getElementById("messagebox").classList.add("openmodal");

        });
        

    }
    const closeprospectonewpanel=(e)=>{
        e.preventDefault();
        document.getElementById("newprospectopanel").classList.remove("openmodal");

    }
    const openprospectonewpanel=(e)=>{
        e.preventDefault();
        
        document.getElementById("newprospectopanel").classList.add("openmodal");
    }

    if(!prospectosData){
        return(
        <div className="prospectospanel">
            <h3>Loading data</h3>
                 
        </div>
        )

    }
    

    return(
        <div className="prospectospanel">
            <div className="postheaderitem">
                <h3>Prospectos</h3>
                <Autohidebutton userroll={userroll} handleclick={openprospectonewpanel} hidefrom={'admin'} action={'New prospect'} />
                
            </div>      
            <Prospecto prospectosData={prospectosData} openstatus={openstatus}/>            
            <div className="loginmodal" id={"newprospectopanel"}>                
                <div className="bigform">
                    <h1>Add a Prospect</h1>
                    <div className="prospectdatosbox">
                        <div className="capturadatos">
                            <input className="textbox" value={prospectoName} type={"text"} placeholder={"name"} onChange={(e) => setProspectoname(e.target.value)}></input>
                            <input className="textbox" value={prospectoLastName} type={"text"} placeholder={"lastname"} onChange={(e) => setProspectoLastName(e.target.value)}></input>
                            <input className="textbox" value={prospectoLastLastName} type={"text"} placeholder={"second lastname"} onChange={(e) => setProspectoLastLastName(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressStreet} type={"text"} placeholder={"adress street"} onChange={(e) => setAdressSreet(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressNumber} type={"text"} placeholder={"adress number"} onChange={(e) => setAdressNumber(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressColony} type={"text"} placeholder={"adress colony"} onChange={(e) => setAdressColony(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressCp} type={"text"} placeholder={"adress cp"} onChange={(e) => setAdressCp(e.target.value)}></input>
                            <input className="textbox" value={prospectoPhone} type={"text"} placeholder={"phone number"} onChange={(e) => setPhone(e.target.value)}></input>
                            <input className="textbox" value={prospectoRfc} type={"text"} placeholder={"rfc"} onChange={(e) => setRfc(e.target.value)}></input>
                    
                        
                        </div>
                        <div className="subedocumentos">
                            <Dropzone imagechange={imagechange}/>
                            <Archivosmgr files={files} setFiles={setFiles}/>
                        </div>
                    </div>                    
                    <button className="buton_normal cafe" onClick={e =>addprospecto(e)}  >add prospect</button>
                    <button className="buton_normal blanco" onClick={e =>closeprospectonewpanel(e)}  >nevermind</button>
                </div>
            </div>
            <div className="loginmodal" id={"detailspanel"}>
                
                <div className="bigform">
                    <h1>Detalles de Prospecto</h1>                    
                    <ProspectoSeleccionado prospectodata={prospectoSelectedData}/>
                    <Autohidelabel userroll={userroll} hidefrom={'promo'} message={'aprovar o rechazar prospecto'}/>
                    <Autohidebutton userroll={userroll} handleclick={aprobarprospecto} hidefrom={'promo'} action={'aprovar'} />
                    <Autohidebutton userroll={userroll} handleclick={rechazarprospecto} hidefrom={'promo'} action={'rechazar'} />
                    <Autohidebutton userroll={userroll} handleclick={closeprospectosdetailspanel} hidefrom={'none'} action={'salir'} />
                    
                    
                </div>
            </div>       
            
        </div>
    )

}

export default Prospectos;