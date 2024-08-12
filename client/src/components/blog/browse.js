import '../../css/blog/browse.css'
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cloudt from './cloudt';

const Browse = () => {

    const [obj, setObj] = useState({});
    const [page, setPage] = useState(1);
    const [serch, setSerch] = useState("");
    const base_url = 'http://localhost:5000/api/search'

    useEffect(() => {
        const getAllResults = async () => {
            try {
                const url = `${base_url}?page=${page},&search=${serch}`;
                const { data } = await axios.get(url);
                setObj(data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllResults(); 
    }, [page, serch]);


 
    return (
        <div className='brow'>

            <div className='search'>
                <input id="srchbr" name='srchbr' type="text"
                    onChange={({ currentTarget: input }) => setSerch(input.value)}
                    placeholder='search' />
            </div>


            <Cloudt blog={obj.blog ? obj.blog : []}/>

        </div>
    )
}

export default Browse;