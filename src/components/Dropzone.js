import React from 'react'
import './styles/dropzone.css'


const Dropzone=(props)=> {
  
    var {imagechange}=props;
    let message="browse file";
    
    return(
        <div className="Dropzone">
            <div className="filewraper">
                <input
                className="FileInput"
                id="imageuploader"
                type="file"
                multiple={false}
                onChange={e => imagechange(e)}
            />

            </div>       
            <span>{message}</span>
        </div>
    ) 
}

export default Dropzone;