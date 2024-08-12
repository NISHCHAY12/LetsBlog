import '../../css/navfoot/navbar.css'
import { useEffect } from 'react';

const Navbar = () => {

    useEffect(() => {
        const changenav = () => {
            let navBody = document.querySelector('nav');
            let windowPosition = window.scrollY > 650;
            navBody.classList.toggle('scrolling-active', windowPosition)
        };
    
        window.addEventListener("scroll", changenav);
      }, []);


    return(
        <nav>
            <h2>LetsBlog.</h2>

            <div id='nav-links'>
                <ul>
                    <a href="#1"><li>Browse</li></a>
                    <a href="/create"><li>Create Blog</li></a>
                    <a href="/login"><li>Sign In</li></a>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;