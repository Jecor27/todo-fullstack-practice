import mongoose, { Mongoose } from "mongoose";

const todoSchema = new mongoose.Schema({
    text: { type: String },
    completed: { type: Boolean, default: false }

})

const Todo = Mongoose.model('Todo', todoSchema) //collection called todos

export default Todo