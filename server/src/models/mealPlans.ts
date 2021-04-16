import { Schema, Model, model, Document } from 'mongoose'

interface IMealPlan extends Document {
  author: string,
  name: string,
  category: string,
  image: string,
  tutorial: string,
  description: string,
  createdAt: Date,
  isPrivate: boolean
}

const mealPlanSchema: Schema = new Schema({
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
  image: {
    type: String
  },
  tutorial: {
    type: String
  },
  description: {
    type: String
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

const MealPlan: Model<IMealPlan> = model('MealPlan', mealPlanSchema)

export { MealPlan as mealPlanSchema, IMealPlan}