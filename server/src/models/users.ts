import { Schema, Model, model, Document } from 'mongoose'

interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    age: string,
    gender: string,
    phone: string,
    createdAt: Date
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    firstName: {
        type: String,    
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    }
})

const User: Model<IUser> = model('User', userSchema)

export { User as userModel, IUser }