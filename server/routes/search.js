const router = require("express").Router();
const Blog = require("../models/blogSchema");

router.get("/search", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";

		const blog = await Blog.find({ blogheading: { $regex: search, $options: "i" } })
			.skip(page * limit)
			.limit(limit);

		const total = await Blog.countDocuments({
			name: { $regex: search, $options: "i" },
		});

		const response = {  
			error: false,
			total,
			page: page + 1, 
			blog,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});

module.exports = router;