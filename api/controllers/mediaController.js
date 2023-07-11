const ErrorResponse= require("../utils/errorResponse")

const asyncHandler = require("../middlewares/asyncHandler");

const Media = require('../models/Media');


//------------------------------------------------------ Add Media  -----------------------------------------//
//desc    Add Media
//route   /api/media
//access  private
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

//------------------------------------------------------ Update Media  -----------------------------------------//
//desc    Update Media
//route   /api/media/:id
//access  private
exports.updateMedia=asyncHandler(async(req,res)=>{
     const id=req.params.id
     const updateMedia=await Media.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
     })

     if (!updateMedia) {
        return next(new ErrorResponse(`Media not found with id of ${id}`, 404));
    }

     res.status(200).json({
        success:true,
        data:updateMedia
     })
})

//------------------------------------------------------ Get All Media  -----------------------------------------//
//desc    Get All Media
//route   /api/media
//access  private
exports.getAllMedia=asyncHandler(async(req,res)=>{
    const media=await Media.find().populate("owner")

    if (!media) {
        return next(new ErrorResponse(`No media files found`, 404));
    }

    res.status(200).json({
        sucess:true,
        data:media
    })
})


//------------------------------------------------------ Get Single Media  -----------------------------------------//
//desc    Get Single Media
//route   /api/media/:id
//access  private
exports.getSingleMedia=asyncHandler(async(req,res)=>{
    const media = await Media.findById(req.params.id)

    if (!media) {
        return next(new ErrorResponse(`Media not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success:true,
        data:media
    })
})

//------------------------------------------------------ Delete Media  -----------------------------------------//
//desc    Delete Media
//route   /api/media/:id
//access  private
exports.deleteMedia=asyncHandler(async(req,res)=>{
    const media = await Media.findByIdAndDelete(req.params.id)

    if (!media) {
        return next(new ErrorResponse(`Media not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success:true,
        message:"media file deleted"
    })
})


