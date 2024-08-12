import '../../css/blog/postimg.css'
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const Postimg = () => {

    const [userData, serUserData] = useState('');

    // const navigate = useNavigate();

    const callPimg = async () => {
        try {
            const res = await fetch('/postimg', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            console.log("works" + res);

            const dat = await res.json();
            console.log("works" + dat);
            serUserData(dat)
            console.log(userData)

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error;
            }

        } catch (err) {
            console.log("hi" + err);
        }
    }

    useEffect(() => {
        callPimg();
    }, );



 


    const [image, setImage] = useState({
        picture:'',blog_id:''
    });

    // let a, value;
    const handleinput = (e) => {
        setImage(e.target.files[0]);
    }

    const senddata = async (e) => {
        e.preventDefault();
        console.log('inside')

        const data = new FormData();
 
        data.append("picture" , image) 
        data.append("blog_id" , userData) 
        console.log(data);

        try { 
            
            fetch('/single', {
                method: "POST",
                body:data,
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='imgsec'>
            <h2>Lets add a picture:</h2>
            <form>
                <input type='file' name='picture' id='picture' alt='blog image'
                    onChange={handleinput} />

                <input type='submit' name='subimg' id='subimg' value='submit image' onClick={senddata} className='sub-btn' />
            </form>
        </div>
    )
}

export default Postimg; 