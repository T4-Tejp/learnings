const Tutorial = require("../models/tutorialModel.js");
const {successResponse, errorResponse} = require('../lib/responseHandler')

// Create and Save a new Tutorial
exports.create = (req, res) => {
    try{
        if(!req.body) throw new Error("Please provide tutorial body");
        const {title,description,published} = req.body;

        const tutorial = new Tutorial({
            title,
            description,
            published
        });

        //console.log("tutorial created=>",tutorial);

        Tutorial.create(tutorial,(err,data)=>{
            if(err) return errorResponse(res,400,"Tutorial Creation Failed",err);
            return successResponse(res,201,"Tutorial Created",data);
        });

    }catch(err){
        return errorResponse(res,500,"create",err);
    }
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    try{
        Tutorial.getAll("",(err,data)=>{
            if(err) return errorResponse(res,500,"Tutorial Creation Failed",err);
            return successResponse(res,200,"Tutorial Data Fetched",data); 
        })
        
    }catch(err){
        return errorResponse(res,500,"findAll",err);
    }
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    try{
        let tut_id = req.params.id;
        Tutorial.findById(tut_id,(err,data)=>{
            if(err) return errorResponse(res,400,"Tutorial Could Not Be Fetched",err);
            return successResponse(res,200,"Tutorial Info Fetched",data);
        })
       
    }catch(err){
        return errorResponse(res,500,"findOne",err);
    }
  
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    try{
        Tutorial.getAllPublished((err,data)=>{
            if(err) return errorResponse(res,400,"Tutorial Could Not Be Fetched",err);
            return successResponse(res,200,"Published Tutorials Fetched",data);
        })
        
    }catch(err){
        return errorResponse(res,500,"findAllPublished",err);
    }
  
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    try{
        let id = req.params.id;
        let payload = req.body;
        Tutorial.updateById(id,payload,(err,data)=>{
            if(err) return errorResponse(res,400,"Tutorial Could Not Be Updated",err);
            return successResponse(res,201,"Tutorial Updated",data);
        })
    }catch(err){
        return errorResponse(res,500,"update",err);
    }
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    try{
        let id = req.params.id;
        Tutorial.remove(id,(err,data)=>{
            if(err) return errorResponse(res,400,"Tutorial Could Not Be Deleted",err);
            return successResponse(res,200,"Tutorial Deleted",data);
        })
    }catch(err){
        return errorResponse(res,500,"Tutorial Creation Failed",err);
    }
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    try{
        Tutorial.removeAll((err,data)=>{
            if(err) return errorResponse(res,400,"Tutorial Could Not Be Deleted",err);
            return successResponse(res,201,"All Tutorials Deleted",data);
        })
    }catch(err){
        return errorResponse(res,500,"Tutorial Creation Failed",err);
    }
  
};