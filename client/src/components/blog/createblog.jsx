import '../../css/blog/createblog.css'
import Postimg from './postimg'
import { useState } from 'react';

const Create = () => {

    const [blog , setBlog] = useState({
        blogheading: "",content: ""
    });

    let a , value;
    const handleinput = (e) => { 
        console.log(e)
        a = e.target.name;
        value = e.target.value;

        setBlog({...blog , [a]:value})
    }

    const senddata = async (e) => {
        e.preventDefault();
        console.log('inside')

        const { blogheading,content} = blog;
        console.log('1',blog)

        try{
            const resp = await fetch('/createblog' , { 
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Request-Method": "POST"
            },
            body:JSON.stringify({
                blogheading,content
            }),
        }) 
        console.log(resp)

        const data = await resp.json()

        if(resp.status === 422 || !data){
            window.alert("Error Occurred...Please try again.");
            console.log("Error Occurred...Please try again.");
        } else{
            window.alert("Blog saved...proceed to add image.");
            console.log("Blog saved...proceed to add image.");
        }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='blog'>
            <div id='circ'></div>
            <div id='back'>
                <h2>Lets create a Blog for you.</h2>
            </div>
            <div id='blgfrm'>
                <form>
                    <div className='field'>
                        <label htmlFor='name'>Let's Start by entering the Title of your Blog</label>
                       
                        <textarea rows="3" cols="60" name="blogheading" id='blogheading'
                            value={blog.blogheading}
                            onChange={handleinput}
                            placeholder="Enter Heading"></textarea>
                    </div>

                    <div className='field'>
                        <label htmlFor='name'>Let's enter the content of your Blog</label>
                       
                        <textarea rows="25" cols="60" name="content" id='content' 
                            value={blog.content}
                            onChange={handleinput}
                            placeholder="Enter Blog content"></textarea>
                    </div>

                    <div className='sub'>
                        <input type='submit' name='signup' id='signup' value='Create Blog' onClick={senddata} className='sub-btn' />
                    </div>
                </form>
            </div>

            <Postimg/>

            

        </div>
    )
}

export default Create;