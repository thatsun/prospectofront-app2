import React, { useState } from 'react';
import Autohidebutton from './Autohidebutton.js';
import Autohidelabel from './Autohidelabel.js';
import ProspectoSeleccionado from './ProspectoSeleccionado.js'
import Archivosmgr from './Archivosmgr.js'
import Inteliinput from './Inteliinput.js'
import Advertencia from './Advertencia.js';
import Documentslist from './Documentslist.js';

const Prospecto=(props)=> {
    const {openstatus} = props;
    const prospectos=props.prospectosData.prospectos;
    return (
      <ul className="propectos_ulist">
        {prospectos.map((prospecto) =>
          <ListItem key={prospecto.Id} id={prospecto.Id} name={prospecto.name} lastname={prospecto.lastname} lastlastname={prospecto.lastlastname} status={prospecto.status} openstatus={openstatus} prospectodata={prospecto}/>
        )}
      </ul>
    );
}

const ListItem=(props)=>{
    const {id,name,lastname,lastlastname,status,openstatus,prospectodata}=props;
    const handledetailsbutton= (e)=>{
        e.preventDefault();

        
        openstatus(id,name,status,prospectodata);


    }
    

    return(
        <div className="prospectoitem" onClick={e=>handledetailsbutton(e)}>            
            <h3 className="prospectoitemname">{name}</h3>                             
            <h3 className="prospectoitemname">{lastname}</h3>
            <h3 className="prospectoitemname">{lastlastname}</h3>
            <h3 className="prospectoitemname">{status}</h3>
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
    
    
    const [files,setFiles]=useState([null]);
    const [filenames,setFilenames]=useState([""]);
    const [filepickshow,setpickfileshow]=useState([true]);
    
    
    
    


    const [prospectoId,setProspectoId]=useState('');
    const [prospectoSelectedData,setselectedProspectoData]=useState(null);
    const [rejectiondetails,setRejectiondetails]=useState('');

    const {user,loged,userid,token,prospectosData,setProspectosdata,username,userroll}=props;
    
    const openstatus= (_id,_name,_status,_prospectodata)=>{
       
        
        setProspectoId(_id);
        setselectedProspectoData(_prospectodata);

       
        document.getElementById("detailspanel").classList.add("openmodal");

    }
    const resetprospectosinfo=()=>{
        setProspectoname("");
        setProspectoLastName("");
        setProspectoLastLastName("");
        setAdressSreet("");
        setAdressNumber("");
        setAdressColony("");
        setAdressCp("");
        setPhone("");
        setRfc("");
        setRejectiondetails("");
        

        setFilenames([""]);
        setFiles([null]);
        setpickfileshow([true]);


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
        changestatus('autorizado');
    }
    const changestatus=(_status)=>{
        
        if(_status==='rechazado' && rejectiondetails===''){
            
            document.getElementById("mesageboxtext").innerHTML='para rechazar un prospecto favor d ecapturar las observaciones del rechazo';
            document.getElementById("messagebox").classList.add("openmodal");
            return;

        }
        console.log(_status);
        
        var statusdata = {
            prosid: prospectoId,
            status: _status,
            reject_details: rejectiondetails
        };
        

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

                setRejectiondetails('');
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

        

        let filesstring="";
        let _filenamesfilter=[];
        
        for(let i=0; i< filenames.length ;i++){

            if(filepickshow[i]===true){
                if(filenames[i].length!==0 && files[i]!==null){
                    _filenamesfilter.push(filenames[i]);
                     
    
                }
                else{
                    document.getElementById("loadingbox").classList.remove("openmodal");
                    document.getElementById("mesageboxtext").innerHTML='uno o mas docuentos sin nombre, o no ha seleccionado un archivo, si no desea subir ese documento haga click en remove';
                    document.getElementById("messagebox").classList.add("openmodal");
                    return;
                }

            }
            
                  


        }

        for(let e=0; e< _filenamesfilter.length ;e++){
            filesstring=filesstring+ _filenamesfilter[e];
            if(e<_filenamesfilter.length-1){
                filesstring=filesstring+".%.";
            }

        }
        
        
        
        

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
            if(filepickshow[i]===true){
                if(files[i]!==null){
                    formdata.append('multi-files', files[i]);
                    
    
                }

            }
            
            
        }
        
        

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
            
            
            if(data.message==="prospecto creado"){
                resetprospectosinfo();
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
        resetprospectosinfo();
        document.getElementById("newprospectopanel").classList.remove("openmodal");
        document.getElementById("advertencia").classList.remove("openmodal");

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
    const closeadvertencia=(e)=>{
        e.preventDefault();
        
        document.getElementById("advertencia").classList.remove("openmodal");

    }
    const openadvertencia=(e)=>{
        e.preventDefault();
        
        document.getElementById("advertencia").classList.add("openmodal");
    }
    const openAtachedDocs=(e)=>{
        e.preventDefault();
        
        document.getElementById("attacheddocs").classList.add("openmodal");

    }
    const closeAtachedDocs=(e)=>{
        e.preventDefault();
        
        document.getElementById("attacheddocs").classList.remove("openmodal");
    }

    return(
        <div className="prospectospanel">
            <div className="postheaderitem">
                <h3>Prospectos</h3>
                <Autohidebutton userroll={userroll} handleclick={openprospectonewpanel} hidefrom={'admin'} action={'Nuevo prospecto'} />
                
            </div>      
            <Prospecto prospectosData={prospectosData} openstatus={openstatus}/>            
            <div className="loginmodal" id={"newprospectopanel"}>                
                <div className="bigform">
                    <h1>Agregar un Prospecto</h1>
                    <div className="prospectdatosbox">
                        <div className="capturadatos">
                            <input className="textbox" value={prospectoName} type={"text"} placeholder={"nombre"} onChange={(e) => setProspectoname(e.target.value)}></input>
                            <input className="textbox" value={prospectoLastName} type={"text"} placeholder={"primer apellido"} onChange={(e) => setProspectoLastName(e.target.value)}></input>
                            <input className="textbox" value={prospectoLastLastName} type={"text"} placeholder={"segundo apellido"} onChange={(e) => setProspectoLastLastName(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressStreet} type={"text"} placeholder={"calle"} onChange={(e) => setAdressSreet(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressNumber} type={"text"} placeholder={"numero de casa"} onChange={(e) => setAdressNumber(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressColony} type={"text"} placeholder={"colonia"} onChange={(e) => setAdressColony(e.target.value)}></input>
                            <input className="textbox" value={prospectoAdressCp} type={"text"} placeholder={"codigo postal"} onChange={(e) => setAdressCp(e.target.value)}></input>
                            <input className="textbox" value={prospectoPhone} type={"text"} placeholder={"telefono"} onChange={(e) => setPhone(e.target.value)}></input>
                            <input className="textbox" value={prospectoRfc} type={"text"} placeholder={"rfc"} onChange={(e) => setRfc(e.target.value)}></input>
                    
                        
                        </div>
                        <div className="subedocumentos">
                            
                            <Archivosmgr files={files} setFiles={setFiles} filenames={filenames} setFilenames={setFilenames} filepickshow={filepickshow} setpickfileshow={setpickfileshow}/>
                        </div>
                    </div>
                    <div className="formbuttonfooter">
                    <button className="buton_normal cafe" onClick={e =>addprospecto(e)}  >Enviar prospecto</button>
                    <button className="buton_normal blanco" onClick={e =>openadvertencia(e)}  >salir</button>
                    </div>                    
                    
                </div>
            </div>
            <div className="loginmodal" id={"detailspanel"}>
                
                <div className="bigform">
                  
                    <h1>Detalle del Propsecto</h1>
                    <div className="prospectdatosbox" >
                        <div className="prospectodatailbox">  
                                        
                            <ProspectoSeleccionado prospectodata={prospectoSelectedData}/>
                            <button className="buton_normal cafe" onClick={e =>openAtachedDocs(e)}  >Ver documentos</button> 
                        </div>
                        <div className="prospectodatailbox">
                             
                            <Autohidelabel userroll={userroll} hidefrom={'promo'} message={'Autorizar o rechazar prospecto'}/>
                            <Autohidebutton userroll={userroll} handleclick={aprobarprospecto} hidefrom={'promo'} action={'Autorizar'} />
                            <Autohidebutton userroll={userroll} handleclick={rechazarprospecto} hidefrom={'promo'} action={'Rechazar'} />
                            <Inteliinput  userroll={userroll} hidefrom={'promo'} label={'en caso of rechazo capture observaciones'} data={rejectiondetails} setData={setRejectiondetails}/>
                            <Autohidebutton userroll={userroll} handleclick={closeprospectosdetailspanel} hidefrom={'none'} action={'Salir'} />

                        </div>
                    </div>                    
                    
                </div>
            </div>
            <div className="loginmodal" id={"attacheddocs"}>
                <div className="bigform">
                    <Documentslist data={prospectoSelectedData} />
                    <button className="buton_normal cafe" onClick={e =>closeAtachedDocs(e)}  >Salir</button>


                </div>
            </div>       
            <Advertencia  exit={closeprospectonewpanel} resume={closeadvertencia} />
        </div>
    )

}

export default Prospectos;