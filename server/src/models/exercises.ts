/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/models/exercises
 * 
 */
import { Schema, Model, model, Document } from 'mongoose'

interface IExercise extends Document {
  author: string,
  name: string,
  category: string,
  description: string,
  muscleGroup: string,
  image: string,
  tutorial: string,
  equipment: string,
  duration: number,
  createdAt: Date,
  isPrivate: boolean,
}

const exerciseSchema: Schema = new Schema({
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  category: {
    type: String,
  },
  description: {
    type: String
  },
  muscleGroup: {
    type: String
  },
  image: {
    type: String
  },
  tutorial: {
    type: String
  },
  equipment: {
    type: String,
    default: 'None'
  },
  duration: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  isPrivate: {
    type: Boolean,
    default: true
  }
})

const Exercise: Model<IExercise> = model('Exercise', exerciseSchema)

export { Exercise as exerciseModel, IExercise}