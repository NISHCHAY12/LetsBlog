import Hero from './hero'
import Achieve from '../../assets/images/achievement.png'
import '../../css/home/home.css'
import { NavLink } from 'react-router-dom'
import Demoblog from '../../api/blog_4'
import { useState } from 'react'
import random1 from '../../assets/images/banner.jpg'

const Home = () => {

    const [demoData] = useState(Demoblog);
    console.log(demoData);

    return (
        <div className='body'>
            <Hero />

            <div id="box1">
                <img src={Achieve} alt='searching-img' />

                <p>So you have just acquired a new skill? Or just looking out to read minds of Industry experts .<br />
                    Our Platform is meant for you we have a plethora of Blogs on cutting Edge technologies from Experts and fellow Learners around the Globe<br />
                    So what are you waiting for , Just  <NavLink to="#1" style={({ isActive }) => ({ color: isActive ? 'greenyellow' : 'red', textDecoration: 'none' })}> Sign In </NavLink>  and get Started!</p>
            </div>



            <div style={{backgroundColor:'#e8e8e8',paddingBlock:'5vh'}}>
                <h2 style={{ textAlign: 'center' }}>Top Blogs</h2>
                <div className='demo-blogs'>
                    {demoData.map((curElem) => {
                        const { author, info } = curElem;
                        return (
                            <>
                                <div className='blogcard'>
                                    <div className='cardim'>
                                        <img src={random1} alt='random' />
                                    </div>
                                    <div style={{ height: '23vh', marginBlock: '1vh', marginInline: '1vw', overflow: 'hidden' }}>
                                        <h6>{`${author}`}</h6>
                                        <p>{`${info}`}</p>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;