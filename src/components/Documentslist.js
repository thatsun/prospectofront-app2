import React from 'react';
import {useState} from 'react';
import { Document,Page } from 'react-pdf';


import './styles/intelifield.css'


const ListItemDocsPreview= (props) =>{

    const {docname,imageurl}=props;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
 
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    let temname=imageurl.slice();
    
    if(temname.split('.').pop() == 'pdf'){

        return(
            <div className="documentolistitem">
                <h3>{docname}</h3>
                <Document file={imageurl}
                    options={{ workerSrc: "/pdf.worker.js" }}
                    onLoadSuccess={onDocumentLoadSuccess}> 
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>

            </div>
            
        )
    }
    return(
        
        <div className="documentolistitem">
        <h3>{docname}</h3>
        <div className="image_holder_doc">
        <img className="docpreviewimg" src={imageurl} alt="docimage" />
        </div>


        </div>
        
    )

}

const Documentslist= (props) =>{

    const {data}=props;
    

    
    if(data===null){
        return null;

    }
    

    return(
        
        <div className='loginformbox'>
            
            
            <div className='subedocumentos'>
                <div className='documentostitulo'>
                   <h1>{'Documentos subidos'}</h1>
                </div>
                <div className="filescaja1">
                {data.documentsrequest.map((doc,index)=>{
                    return(
                    <ListItemDocsPreview key={index} docname={data.documentsnames[index]} imageurl={doc} />
                    ) 
                    
                })

                }
                </div>
                
            </div>
            
        </div>
        
    )

}

export default Documentslist;