const ErrorResponse= require("../utils/errorResponse")

const asyncHandler = require("../middlewares/asyncHandler");

const Media = require('../models/Media');
const User = require('../models/User');

//create media
exports.addMedia = asyncHandler(async(req,res)=>{
    const {type,url,ownerId}=req.body

    //Create a new media
    const media = new Media({
        type,
        url,
        owner:ownerId
    })
    await media.save()

    res.status(200).json({
        success:true,
        data:media
    })
})


exports.updateMedia=asyncHandler(async(req,res)=>{
     const id=req.params.id
     const updateMedia=await Media.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
     })

     res.status(200).json({
        success:true,
        data:updateMedia
     })
})

exports.getAllMedia=asyncHandler(async(req,res)=>{
    const media=await Media.find().populate("owner")
    res.status(200).json({
        sucess:true,
        data:media
    })
})


//Get Single Media
exports.getSingleMedia=asyncHandler(async(req,res)=>{
    const media = await Media.findById(req.params.id)
    res.status(200).json({
        success:true,
        data:media
    })
})

//Delete Media
exports.deleteMedia=asyncHandler(async(req,res)=>{
    const media = await Media.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        message:"media file deleted"
    })
})


