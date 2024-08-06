import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const registerUser = asyncHandler( async(req,res)=>{
    //get user details from frontend
    const{fullName,email,username,password}=req.body
    console.log("email: ",email)
    //validation-not empty
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
        //check if user already exists:username , email
   const existedUser= User.findOne({
        $or:[{username} , {email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
        //check for images ,check for avatar

    const avatarLocalPath=req.files?.avatar[0]?.path;
   
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }
    
    //upload them to cloudnary ,avatar
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await  uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    //creeate user object - create entry in db
    User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.tolower
    })
    //remove password and refresh token ield from response
    //check for user creation
    //return res
} )


export {registerUser}