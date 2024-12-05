import '../../css/blog/browse.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cloudt = ({ blog }) => {
    const navigate = useNavigate();
    const [_id, setId] = useState('');

    const open = async (selectedId) => {
        // console.log(selectedId)
        try {
            const resp = await fetch('/open', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ _id: selectedId }),
                credentials: "include"
            });

            const { redirectTo, data } = await resp.json(); 
            // console.log(data);
            localStorage.setItem('pageData', JSON.stringify(data));
            

            if (resp.status === 400 || !data) {
                window.alert("ID missing");
            } else {
                // window.alert("Blog Found");
                
                navigate(redirectTo);
            }
        } catch (error) {
            console.error("Error in fetch:", error);
            window.alert("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            {blog.map((curele) => {
                const { _id, content, blogheading, views, uname } = curele;

                return (
                    <div key={_id} className="cld" onClick={() => open(_id)}>
                        <div className="cldinfo">
                            <h2>{blogheading}</h2>
                            <div className="autview">
                                <p className="auth">Author : {uname}</p>
                                <p className="view">{views}</p>
                            </div>
                            <p className="cldcont">{content}</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Cloudt;
