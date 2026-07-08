const mongoose=require("mongoose")
async function connectDB(){
    try{
        await mongoose.connect("")
        //connectio not shown due to security reasons

        

    }
    catch(error){
        console.error("Database Problem",error)
    }
}
module.exports=connectDB