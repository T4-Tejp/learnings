exports.successResponse = (res,statusCode,message="",data) =>{
    //update the success response api log table
    console.log("custom id from success responseHandler",res.myCustomId)
    return res.status(statusCode).json({
        status:"success",
        statusCode,
        message,
        data
    })
}

exports.errorResponse = (res,statusCode,message="",err) =>{
    //here update the log in case of api failure
    console.log("custom id from failure responseHandler",res.myCustomId)

    console.log(res.tableInfo)
    return res.status(statusCode).json({
        status:"failure",
        statusCode,
        message,
        data:err.message ? err.message :"Error"
    })
}