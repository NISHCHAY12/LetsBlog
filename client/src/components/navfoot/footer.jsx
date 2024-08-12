import '../../css/navfoot/footer.css'
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { useEffect, useState } from 'react';

const Footer = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetch("http://api.quotable.io/random")
            .then(res => res.json())
            .then(
                (quote) => {
                    setQuote(quote.content);
                    setAuthor(quote.author);
                    // console.log(quote.content);
                }
            )
    }, []);


    return (
        <footer>
            <div className='footsection'>
                <h1>LetsBlog.</h1>

                <h3><i>"{quote}"</i><p>- {author}</p></h3>
                

                <div id='foot-links'>
                    <h2>About</h2>
                    <ul>
                        <li>About Us</li>
                        <li>Help Centre</li>
                    </ul>
                </div>
            </div>

            <div className='socialicons'>
                <a href="https://www.linkedin.com/in/nishchay-singh-2a8bb4229"><FaFacebookSquare style={{color:'#0165E1'}}/></a>
                <a href='https://github.com/NISHCHAY12'><FaGithubSquare style={{color:'#000000'}}/></a>
                <a href="https://www.facebook.com/nishchay.singh.180"><FaLinkedin style={{color:'#0A66C2'}}/></a>
                <a href="https://twitter.com/Nishchay404?t=efCTR6vXDNMasTHHlcaCQQ&s=08"><FaTwitterSquare style={{color:'#1D9BF0'}}/></a>
            </div>
        </footer>
    )
}

export default Footer;


