import { Schema, Model, model, Document } from 'mongoose'
import { IActivity } from './activities'
import { IExercise } from './exercises'
import { IMealPlan } from './mealPlans'
import { IRecipe } from './recipes'
import { IWorkout } from './workouts'

interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    age: string,
    gender: string,
    phone: string,
    createdAt: Date,
    exercises: Array<IExercise>,
    recipes: Array<IRecipe>,
    workouts: Array<IWorkout>,
    mealPlans: Array<IMealPlan>,
    activities: Array<IActivity>
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
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ],
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    workouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ],
    mealPlans: [
        {
            type: Schema.Types.ObjectId,
            ref: 'MealPlan'
        }
    ],
    activities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ]
})

const User: Model<IUser> = model('User', userSchema)

export { User as userModel, IUser }