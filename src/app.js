import express from express
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()



app.use(express)//app.use is for config annd set middle ware
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//when we fill a form we take this data
app.use(express.json({limit:"16kb"}))

//take data from url
app.use(express.urlencoded({extended:true,limit:"16kb"}))

//sto store public assets static things like mages or pdfs
app.use(express.static("public"))

//user ki cookies access aur uski cookies send bhi kar pau secure cookie place karte hai
app.use(cookieParser())



app.on("error",(error)=>{
    console.log("err:",error);
    throw error
})



export {app}