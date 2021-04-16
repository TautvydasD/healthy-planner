import { Schema, Model, model, Document } from 'mongoose'

interface IWorkout extends Document {
    type: string;
    exercises: string;
    reps: string;
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
    }
})

const Workout: Model<IWorkout> = model('Workout', workoutSchema)

export { Workout as workoutModel, IWorkout }