import React, { useState } from 'react';


import { useEffect,useRef } from 'react';

const Elemento=(props)=>{

    const {filename,fileindex,removefile}=props;
    const [docname,setDocname]=useState('');
    const handleclick= (e)=>{
        e.preventDefault();

        
        removefile(fileindex);


    }
    const handlechange=(e)=>{
        e.preventDefault();

        
        setDocname(e.target.value);
    }
    return (
        <div className="documentoitem" >
        <div className="textboxfile">
        <input className="documentoname" value={docname} type={"text"} placeholder={"filename"} onChange={(e) => handlechange(e)}></input>
        </div>
        <div className="textboxfile">
            <h3 className="documentoitem_text" >{filename}</h3>
        </div>            
        <button className="deletefile" onClick={(e) => handleclick(e)} >{'remove'}</button>
        </div>
    
    )
}


const Archivosmgr= (props) =>{

    const {files,setFiles}=props;

    const removefile=(_index)=>{
        
        
    }  
    
    if(files===null){
        return null 
    }
    if(files.length===0){
        
        return null 
    }

    return(
        <div className="caja1"> 
                {Array.from(files).map((file,index) =>
                    <Elemento key={index} filename={file.name} fileindex={index} removefile={removefile} />
                )}
        </div>  


    )   
}

export default Archivosmgr;