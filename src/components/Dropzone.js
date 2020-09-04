import React from 'react'
import './styles/dropzone.css'


const Dropzone=(props)=> {
  
    var {imagechange}=props;
    let message="add a new file";
    
    return(
        <div className="Dropzone">
            <div className="filewraper">
                <input
                className="FileInput"
                id="imageuploader"
                type="file"
                multiple={true}
                onChange={e => imagechange(e)}
            />

            </div>       
            <span>{message}</span>
        </div>
    ) 
}

export default Dropzone;