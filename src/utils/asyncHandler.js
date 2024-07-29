const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res)).catch((err)=>next(err)).catch((err)=>next(err))
    }
}



//const asyncHandler=()=>{}
// const asyncHandler=(func)=>()=>{}

// const asyncHandler=(fn) => async(req,res,next) => {
//     try{
//         await fn(req,res,next)
//     }catch{
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }


export{asyncHandler}