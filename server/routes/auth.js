const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const multer = require('multer')


require('../db/db_connect')
const User = require('../models/userSchema')
const Blog = require('../models/blogSchema')
const authenticate = require('../middleware/authenticate')

router.get('/', (req, res) => {
    res.send("server running at home");
})


const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => { 
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({ storage: filestorage })



router.post('/signup', async (req, res) => {
    const { name, email, phone, password, conpassword } = req.body;

    if (!name || !email || !phone || !password || !conpassword) {
        return res.status(422).json({ error: "pls fill form" });   
    }

    try {
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(422).json({ error: "User exists with the entered email" });
        } else if (password != conpassword) {
            return res.status(422).json({ error: "passwords don't match" });
        } else {
            const user = new User({ name, email, phone, password, conpassword });

            await user.save();
        }


        res.status(201).json({ message: "data saved successfully" });
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return req.status(400).json({ error: 'enter full details' })
    }

    try {
        const exists = await User.findOne({ email: email });
        console.log(exists)
 


        if (exists) {
            const match = await bcrypt.compare(password, exists.password);
            const token = await exists.generateAuthToken();
            console.log(token);

            res.cookie("LetsBlog", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!match) {
                return res.status(400).json({ error: 'Invalid Credentials' })
            }
            else {
                return res.status(200).json({ message: 'user sign in successful' }) 
            }
        }
        else {
            return res.status(400).json({ error: 'Invalid Credentials' })
        }
    } catch (err) {
        console.log(err);
    }

})

router.post('/createblog', authenticate, async (req, res) => {
    const { blogheading, content } = req.body;
    console.log('hi')

    if (!blogheading || !content) {
        return res.status(422).json({ error: "pls fill in full details" });
    }
 
    try {
        const token = req.cookies.LetsBlog;
        console.log(token)
        const verifyed = jwt.verify(token, process.env.SECRET_KEY);
        user_id = verifyed._id
        const exists = await User.findOne({ _id: user_id });


        const blog = new Blog({ user_id, blogheading, content });
 
        await blog.save(); 


        exists.blogs = exists.blogs.concat({ blog: blog._id })
        await exists.save()

        res.status(201).json({ message: "data saved successfully" });
    } catch (err) {
        console.log(err);
    }
});




router.post('/single', upload.single('picture'), async (req, res) => {
    console.log(req.file)
    const _id = req.body.blog_id;
    const exists = await Blog.findOne({ _id: _id });
    var myquery = { '_id': exists._id }; 
    var newvalues = { $set: { 'image.name': req.file.filename } };
    Blog.db.collection('blogs').updateOne(myquery, newvalues, );

    console.log("image uploaded");
    return res.status(201).json({ messsage: 'image uploaded' })
    
})

// router.get('/single', async (req, res) => {
//     const alldata = await Blog.find();
//     res.json(alldata[0].image);
    
// })


router.get('/profile', (req, res) => {
    res.send("Profile PAGE loaded.")
})

router.get('/postimg', authenticate , async (req, res) => {
    const token = req.cookies.LetsBlog;
    const verifyed = jwt.verify(token, process.env.SECRET_KEY);
    user_id = verifyed._id
    const exists = await Blog.find({ user_id: user_id });
    var exist = exists[exists.length-1]._id;
    // console.log(exist)
    res.send(exist);
})



// router.post('/selectblog' , async (req,res) => {
//     const { _id } = req.body;

//     try {
//         const exists = await Blog.findOne({ _id: _id });


//         if (exists) {
//             vi = exists.views + 1;
//             var myquery = { 'blogheading': blogheading };
//             var newvalues = { $set: { 'views': vi } };
//             Blog.db.collection('blogs').updateOne(myquery, newvalues, { upsert: true });

//             const found = await User.findOne({ _id: exists.user_id });   //gives the id and name of author of blog 
//             console.log(found.name)

//             return res.status(200).json({ message: exists.content })
//         }
//         else {
//             return res.status(400).json({ error: 'No blog found' })
//         }
//     } catch (err) {
//         console.log(err);
//     }
// })

// router.post('/findblog', async (req, res) => {
//     const { blogheading } = req.body;

//     if (!blogheading) {
//         return req.status(400).json({ error: 'search field empty' })
//     }

//     try {
//         const exists = await Blog.find({ blogheading: blogheading });
//         res.send(exists);

//         // if (exists) {
//         //     vi = exists.views + 1;
//         //     var myquery = { 'blogheading': blogheading };
//         //     var newvalues = { $set: { 'views': vi } };
//         //     Blog.db.collection('blogs').updateOne(myquery, newvalues, { upsert: true });

//         //     const found = await User.findOne({ _id: exists.user_id });   //gives the id and name of author of blog 
//         //     console.log(found.name)

//         //     return res.status(200).json({ message: exists.content })
//         // }
//         // else {
//         //     return res.status(400).json({ error: 'No blog found' })
//         // }
//     } catch (err) {
//         console.log(err);
//     }

// })




module.exports = router; 