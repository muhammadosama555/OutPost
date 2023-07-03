const errorResponse = require("../utils/errorResponse");

const errorHandler= (err,req,res,next)=>{
    
    let error= {...err}
    error.message=err.message


    //Log error to console for developer
    console.log(err.stack);
    
    //mongooose bad object id 
    if(err.name=== "CastError"){
        const message="resource not found with the given id"
        error= new errorResponse(message,404)

    }

    //mongoose duplicate key error
    if(err.code === 11000){
        const message="Duplicate field entered"
        error= new errorResponse(message,400)
    }

    //Mongoose validation error
    if(err.name === 'ValidationError') {
        const message =Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message,400)

    }

    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || "server error"
    })
}


module.exports=errorHandler