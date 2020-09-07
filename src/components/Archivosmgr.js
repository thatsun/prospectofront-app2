import React, { useState } from 'react';

import Dropzone from './Dropzone.js';
import { useEffect,useRef } from 'react';

const Elemento=(props)=>{

    const {files,filenames,fileindex,removefile,changename,changeimage,show}=props;
    const[docfilename,setDocfilename]=useState("");

    const handleclick= (e)=>{
        e.preventDefault();

        
        removefile(fileindex);


    }
    const handlechange=(e)=>{
        e.preventDefault();

        
        changename(fileindex,e.target.value);
    }
    const handleimagechange=(e)=>{
        e.preventDefault();        
        
        changeimage(fileindex,e.target.files[0]);   
        
        
    }
    useEffect(()=>{
        if(files[fileindex]===null){
            setDocfilename("");
    
        }
        else{
            setDocfilename(files[fileindex].name);
        }
    },[files]);
    if(show[fileindex]===false){
        return null

    }
    
    
    return (
        <div className="documentoitem" >
        <div className="textboxfile">
        <input className="documentoname" tag={fileindex} value={filenames[fileindex]} type={"text"} placeholder={"nombre del documento"} onChange={(e) => handlechange(e)}></input>
        </div>
        <div className="textboxfile">
            <h3 className="documentoitem_text" >{docfilename}</h3>
        </div> 
        <Dropzone tag={fileindex} imagechange={handleimagechange}/>           
        <button className="deletefile" onClick={(e) => handleclick(e)} >{'quitar'}</button>
        </div>
    
    )
}


const Archivosmgr= (props) =>{

    const {files,setFiles,filenames,setFilenames,filepickshow, setpickfileshow}=props;

    const removefile=(_index)=>{
        let _show=filepickshow.slice();

        _show.splice(_index,1);
        
        setpickfileshow(_show);
        
        let _names=filenames.slice();

        _names.splice(_index,1);
        
        setFilenames(_names);      
        

        let _files=files.slice();
        
        _files.splice(_index,1);
        setFiles(_files);

    }
    const addfiles=(e)=>{
        e.preventDefault();
        if(filepickshow.length==10){
            return;
        }

        let _show=filepickshow.slice();

        _show.push(true);
        
        setpickfileshow(_show);
        
        let _names=filenames.slice();

        _names.push("");

        
        setFilenames(_names);      
        

        let _files=files.slice();
        
        _files.push(null);
        setFiles(_files);


    }  
    const changename=(_index,_newname)=>{
        let _names=[...filenames];
        _names[_index]=_newname;
        setFilenames(_names);

    }
    const changeimage=(_index,_file)=>{
        let _files=[...files];
        _files[_index]=_file;
        setFiles(_files);

    }
    if(files===null){
        return null 
    }
    
    return(
        <div className="caja1"> 
            <button className="addfiles" onClick={(e) => addfiles(e)} >{'+ agregararchivo'}</button>
            {
                files.map((file,index)=>
                    <Elemento key={index} files={files} filenames={filenames} fileindex={index} removefile={removefile} changeimage ={changeimage} changename={changename} show={filepickshow}/>
                
                )
            }
                
                
        </div>  


    )   
}

export default Archivosmgr;