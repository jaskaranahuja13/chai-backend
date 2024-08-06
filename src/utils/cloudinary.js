import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
       const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded
        console.log("file is uploade in cloudnary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove locally saved temp file as upload fail
        return null;
    }
}

export {uploadOnCloudinary}