const blogService = require('../service/blog.service');


const getAllBlogs = async(req,res) =>{
    try{
        const allBlogs = await blogService.getRows({});
        return res.status(200).json({
            status:"success",
            data:allBlogs
        })

    }catch(err){
        console.log('server error',err);
        return res.status(500).json({
            status:"failed",
            msg:err?.message
        })
    }
}

const createBlog = async(req,res) =>{
    try{
        const allBlogs = await blogService.createRow({});
        return res.status(200).json({
            status:"success",
            data:allBlogs
        })

    }catch(err){
        console.log('server error',err);
        return res.status(500).json({
            status:"failed",
            msg:err?.message
        })
    }
}

const getSingleBlog = async(req,res) =>{
    try{
        const allBlogs = await blogService.getRows({});
        return res.status(200).json({
            status:"success",
            data:allBlogs
        })

    }catch(err){
        console.log('server error',err);
        return res.status(500).json({
            status:"failed",
            msg:err?.message
        })
    }
}

const updateBlog = async(req,res) =>{
    try{
        const allBlogs = await blogService.getRows({});
        return res.status(200).json({
            status:"success",
            data:allBlogs
        })

    }catch(err){
        console.log('server error',err);
        return res.status(500).json({
            status:"failed",
            msg:err?.message
        })
    }
}

const deleteBlog = async(req,res) =>{
    try{
        const allBlogs = await blogService.getRows({});
        return res.status(200).json({
            status:"success",
            data:allBlogs
        })

    }catch(err){
        console.log('server error',err);
        return res.status(500).json({
            status:"failed",
            msg:err?.message
        })
    }
}

module.exports = {
    getAllBlogs,
    createBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog
}