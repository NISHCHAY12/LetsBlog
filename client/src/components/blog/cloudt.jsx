import '../../css/blog/browse.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cloudt = ({ blog }) => {


    return (
        <>
            {blog.map((curele) => {
                const { content, blogheading, views, user_id } = curele;
                

                return(
                    <div className="cld">
                        <div className="imgcld">
                            <img src={'http://localhost:5000/server/assets/images/1691238395862_Screenshot%20(196).png'} alt='blogimage' />
                        </div>
                        <div className="cldinfo">
                            <h2>{`${blogheading}`}</h2>
                            <div className="autview">
                                <p className="auth">author</p>
                                <p className="view">{`${views}`}</p>
                            </div>
                            <p className="cldcont">{`${content}`}</p>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default Cloudt;