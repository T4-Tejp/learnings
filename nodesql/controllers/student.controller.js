const Student = require('../models/studentModel');
const {successResponse,errorResponse}  = require('../lib/responseHandler');

// Retrieve all Tutorials from the database (with condition).
const findAll = (req, res) => {
    try{
        Student.getAll((err,data)=>{
            if(err) return errorResponse(res,500,"Could Not Fetch Students",err);
            return successResponse(res,200,"Students Data Fetched",data); 
        })
        
    }catch(err){
        return errorResponse(res,500,"findAll",err);
    }
};

module.exports = {findAll}