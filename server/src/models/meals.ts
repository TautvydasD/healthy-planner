import { Schema, Model, model, Document } from 'mongoose'

interface IMeal extends Document {
  name: string,
  from: string,
  to: string,
  createdAt: Date
}

const mealSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Meal name is required']
  },
  from: {
    type: String,
    required: ['Meal start time is required']
  },
  to: {
    type: String,
    required: [true, 'Meal end time is required']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Meal: Model<IMeal> = model('Meal', mealSchema)

export { Meal as mealSchema, IMeal}