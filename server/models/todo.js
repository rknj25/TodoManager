import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
        },
    description:{
        type:String,
        required:true
                },
    status:{
            type:String,
            enum:["Pending","Completed"],
            default:"Pending"
            },
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
            }
})

const todo=mongoose.model("todo",todoSchema);

export default todo;