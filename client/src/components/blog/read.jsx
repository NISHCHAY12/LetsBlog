import React, { useEffect, useState } from 'react';
import '../../css/blog/createblog.css'
// import Postimg from './postimg'
import { NavLink, useNavigate } from 'react-router-dom';

const nl2br = require("react-nl2br");

const Read = () => {

    const [data, setData] = useState(null);
    const [blg, setBlg] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('pageData');
        if (storedData) {
            console.log("Stored data:", storedData); // Confirm the JSON string is correct
            const parsedData = JSON.parse(storedData); // Parse the JSON string
            console.log("Parsed data:", parsedData); // Confirm parsing works
            setData(parsedData); // Update the state
        } else {
            console.error('No data found in local storage');
        }

    }, []);

    return (
        <div>
            {/* <h1>Target Page</h1>
            {data ? 
            (
                <div>
                    <p>Param1: {data.blog._id}</p>
                    <p>Param2: {data.param2}</p>
                </div>
            ) 
            : (
                <p>Loading data...</p>
            )}
            <div></div> */}

            {data ?
                (
                    <div className='blog'>
                <div id='circ' ></div>
                <div id='back' style={{height:'30vh'}}>      
                    <h2>{data.blog.blogheading}</h2>
                </div>
                
                <div className='rbox'>
                    <p className='read_blog'>
                    {nl2br(data.blog.content)}
                    </p>
                </div>



            </div>
                )
                : (
                    <p>Loading data...</p>
                )}
            
        </div>
    );
}

export default Read;