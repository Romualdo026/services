import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
    user: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    user:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    }
})

export const User = mongoose.model<User>('User', userSchema)