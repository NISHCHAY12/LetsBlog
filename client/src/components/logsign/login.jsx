import React , {useState} from 'react';
import '../../css/logsign/login.css'
import Register from '../../assets/images/regbg.png'
import { FaEnvelope } from "react-icons/fa";
import { NavLink , useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";

const Log = () => {

    const navigate = useNavigate();

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const loginuser = async (e) => {
        e.preventDefault();

        const resp = await fetch('/login' , {
            method: "POST",
            headers: { 
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,password
            }),
            credentials:"include"
        })

        const data = await resp.json();
        console.log(data);

        if(resp.status === 400 || !data)
        {
            window.alert("Inavlid credentials")
        } else{
            window.alert("Log In Successfull")
            navigate('/');
        }
    }



    return(
        <div>
            <div className='reg-block'>
            <div style={{height:'45vh' , background:'#1d5a7976'}}></div>
                <div id='cloud-log'>
                    <div id='form'>
                        <h2 style={{marginBlock:'0px' ,marginBottom:'5vh' , fontSize : '1.8rem'}}>Log In</h2>

                        <form method='POST' id='sub-form'>
                            <div className='fieldreg'>
                                <label htmlFor='email'>< FaEnvelope /></label>
                                <input type='text' name='email' id='email' autoComplete='off'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder='e-mail'/>
                            </div>

                            <div className='fieldreg'>
                                <label htmlFor='password'>< FaLock /></label>
                                <input type='password' name='password' id='password' autoComplete='off' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder='password'/>
                            </div>

                            <div className='subn'>
                                <input type='submit' name='signup' id='signup' value='Log In' onClick={loginuser} className='sub-bttn'/>
                            </div>
                        </form>

                    </div>
                    


                    <div style={{width: '15vw'}}>
                        <img id='img-log' src={Register} alt='register'/>
                        <NavLink to="/register" className='lnk-reg'><p>Don't have an account?<br/>Sign up!</p></NavLink>
                    </div>
                </div>

        </div>
        </div>
    )
}

export default Log;