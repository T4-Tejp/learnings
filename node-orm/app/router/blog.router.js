const express = require('express');
const router = express.Router();
const blogsController = require('../controller/blog.controller');


router.route("/")
.get(blogsController.getAllBlogs)
.post(blogsController.createBlog)

router.route('/single/:blogId')
.get(blogsController.getSingleBlog)
.patch(blogsController.updateBlog)
.delete(blogsController.deleteBlog)

module.exports = router;