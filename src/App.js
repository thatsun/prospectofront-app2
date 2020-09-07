import React, { useEffect,useRef } from 'react';
import {useState} from 'react';
import Dash from './components/Dash.js';
import './components/styles/dash.css';
import './components/styles/main.css';
import loginback from './img/loginback.png'
import logo from './img/logo2.svg'
import Singup from './components/Singup.js';
import Login from './components/Login.js';
import Message from './components/Message.js';
import Loading from './components/Loading.js';
import axios from 'axios'



const App= () =>{    
    const [loged,setLoged]=useState(false);
    const [actualtoken,setToken]=useState('');
    const [user,setUser]=useState('');
    const [userroll,setUserroll]=useState('');    
    const [currentusername,setUsername]=useState('');
    const [userid,setUserid]=useState('');
    const [password,setPassword]=useState('');
    const [prospectosData,setProspectosdata]= useState(null);

    const [count, setCount] = useState(0);

    
    const [newuserroll,setnewUserroll]=useState('');
    const [newuserpassword,setnewUserPassword]=useState('');
    const [newusername,setnewUserName]=useState('');
    const [newuseremail,setnewUseremail]=useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const fetchUser = (data) => {
        
        setLoading(true)
        setError(false)
    
        //make edit to redeploy
        axios.post({url:'.netlify/functions/userlogin',body:JSON.stringify(data)})
          .then((data) => {
            console.log(data);
          })
          .catch(e => {
            setError(true)
            console.log(e)
          })
          .finally(() => {
            setLoading(false)
          })
    }



    const useInterval=(callback, delay)=> {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
    }
    useInterval(() =>{       
        if(loged===true && userid!=='' && actualtoken!==''){ 
                console.log('fetching')
                
                let newsurl = '/prospectos/'+userid;
                if(userroll==="admin"){
                    newsurl = '/prospectos';

                }                
                fetch(newsurl, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {                
                        'Authorization': 'bearer '+actualtoken
                    }
                }).then(resp => resp.json()
                ).then( (data ) => {
                    
                    console.log(data);
                    if(data.prospectos.length>0){
                        

                    }
                    
                    
                    setProspectosdata(data);
                    
                })
                .catch(err => {
                    console.log(err);
                    
                });

        }
        setCount(count+1);
    }, 600000);

    

    const handleLoginButton=(e)=>{
        //fetch login and get token
        e.preventDefault();
        if(user==='' || password==='' ){
            document.getElementById("mesageboxtext").innerHTML='por favoe escribe un correo y contraseña validos';
            document.getElementById("messagebox").classList.add("openmodal");
            return;

        }

        const url = '/user/login';
        var data = {email: user, password : password};

        document.getElementById("loadingbox").classList.add("openmodal");
        fetchUser(data);
        return;

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()
        ).then( (data ) => {

            var {token , userId, username, userroll}=data;
            if(token){
                setUserid(userId);
                setToken(token);
                setUsername(username);
                setUserroll(userroll);
                setLoged(true);
                //console.log(token);
                document.getElementById("loadingbox").classList.remove("openmodal");
                document.getElementById("loginmodal").classList.remove("openmodal");
                document.getElementById("dashboard").classList.add("openmodal");
                

                let prospectosurl = '/prospectos/'+userId;

                if(userroll==="admin"){
                    prospectosurl = '/prospectos';
                }

                //console.log(dogsurl);           

                
                fetch(prospectosurl, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {                
                        'Authorization': 'bearer '+token
                    }
                }).then(resp => resp.json()
                ).then( (data ) => {
                    console.log(data);
                    if(data.prospectos.length>0){
                        

                    }
                    
                    
                    setProspectosdata(data);
                    
                })
                .catch(err => {
                    console.log(err);
                });
                


            }
            else{
                document.getElementById("loadingbox").classList.remove("openmodal");                
                document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                document.getElementById("messagebox").classList.add("openmodal");
            }
            
            
        })
        .catch(err => {
            console.log(err);
            document.getElementById("loadingbox").classList.remove("openmodal");            
            document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
            document.getElementById("messagebox").classList.add("openmodal");
            
        });
    };    
    const handleSingUpButton=(e)=>{
        //fetch singup crete user and login, get first token
        e.preventDefault();
        if(newuseremail==='' || newuserpassword==='' ){
            document.getElementById("mesageboxtext").innerHTML='por favor escribe un correo y contraseña validos';
            document.getElementById("messagebox").classList.add("openmodal");
            return;

        }

        const url = '/user/singup';
        var newdata = {
            email: newuseremail,
            password : newuserpassword,
            username: newusername,
            userroll: newuserroll
        };

        console.log(newdata);

        document.getElementById("loadingbox").classList.add("openmodal");

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newdata),
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+actualtoken
            }
        }).then(resp => resp.json()
        ).then( data => {
            console.log(data);

            var {message}=data;
            if(message){

                //console.log(message);
                if(message==="User created"){
                    document.getElementById("loadingbox").classList.remove("openmodal");
                    document.getElementById("mesageboxtext").innerHTML='usuario creado';
                    document.getElementById("messagebox").classList.add("openmodal");
                    document.getElementById("singupmodal").classList.remove("openmodal");
                    document.getElementById("loginmodal").classList.add("openmodal");

                }
                else{
                    if(message==="Mail Exist"){
                        document.getElementById("loadingbox").classList.remove("openmodal");
                        document.getElementById("mesageboxtext").innerHTML='este correo ya existe';
                        document.getElementById("messagebox").classList.add("openmodal");

                    }
                    else{
                        document.getElementById("loadingbox").classList.remove("openmodal");
                        document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                        document.getElementById("messagebox").classList.add("openmodal");
                    }

                }
                

            }
            else{
                document.getElementById("loadingbox").classList.remove("openmodal");
                document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
                document.getElementById("messagebox").classList.add("openmodal");

            }
            
        })
        .catch(err => {
            console.log(err);
            document.getElementById("loadingbox").classList.remove("openmodal");
            document.getElementById("mesageboxtext").innerHTML='ha ocurrido un error';
            document.getElementById("messagebox").classList.add("openmodal");
            
        });   
        
    };
    const closemmessagebox=()=>{
        document.getElementById("messagebox").classList.remove("openmodal");
    }
    const openLoginBox=()=>{
        document.getElementById("loginmodal").classList.add("openmodal");

    };
    const openSingupBox=()=>{
        document.getElementById("singupmodal").classList.add("openmodal");

    };
    const closeLoginBox=(e)=>{
        document.getElementById("loginmodal").classList.remove("openmodal");
        e.preventDefault();

    };
    const closeSingupBox=(e)=>{
        document.getElementById("singupmodal").classList.remove("openmodal");
        e.preventDefault();

    }; 
    const handlelogoutButton=()=>{
        document.getElementById("dashboard").classList.remove("openmodal");
        setUser('');
        setUserid('');
        setPassword('');
        setUsername('');
        setToken('');
        setLoged(false);
    };    
    return(
        <div className="fullscreencontainer">
                <div className="midlepanel_h">
                    <img className="cover" src={loginback} alt="cover"></img>
                </div>
                <div className="centerlogo">
                    <img className="logo" src={logo} alt="logo"></img>
                </div>                            
                <div className="midlepanel_h2">
                    <h1 className="titlepanel">
                        Prueba Prospectos.
                    </h1>
                    <button className="buton_normal cafe" onClick={(e) => openLoginBox()} >Entrar</button>
                    <button className="buton_border blanco" onClick={(e) => openSingupBox()} >Registrarse</button>

                </div>
                <Login login={handleLoginButton} setuser={setUser} setpass={setPassword} user={user} password={password} close={closeLoginBox} />
                <Singup singup={handleSingUpButton} setuser={setnewUseremail} setpass={setnewUserPassword} user={newuseremail} password={newuserpassword} close={closeSingupBox} username={newusername} setUsername={setnewUserName} userroll={newuserroll} setUserroll={setnewUserroll}/>
                <Dash user={user} loged={loged} logout={handlelogoutButton} token={actualtoken} userid={userid} prospectosData={prospectosData} setProspectosdata={setProspectosdata} username={currentusername} userroll={userroll} />
                <Message close={closemmessagebox} />                
                <Loading />

                
                
        </div>    
        
    )
};

export default App;
