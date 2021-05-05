/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/models/workouts
 * 
 */
import { Schema, Model, model, Document } from 'mongoose'

interface IWorkout extends Document {
    type: string;
    exercises: string;
    reps: string;
    createdAt: Date;
}

const workoutSchema: Schema = new Schema({
    type: {
        type: String
    },
    exercises: {
        type: String,
    },
    reps: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Workout: Model<IWorkout> = model('Workout', workoutSchema)

export { Workout as workoutModel, IWorkout }