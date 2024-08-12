const mongoose = require('mongoose')

const BlogData = new mongoose.Schema({
    user_id: {                               //user who created the blog
        required: true,
        type: String,
    },
    blogheading: {                                //to indicate heading of blog
        required: true,
        type: String,
    },
    content: {
        required: true,
        type: String,
    },
    views: {
        required: true,
        type: Number,
        default: 0,
    },
    image: [
        {
            name: String,
            img: {
                contentType: String,
                data: Buffer,
            }
        }
    ],
    comments: [
        {
            comment: {
                type: String,
            }
        }
    ]
})



module.exports = Blog = mongoose.model('BLOG', BlogData)