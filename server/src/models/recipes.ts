/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/models/recipes
 * 
 */
import { Schema, Model, model, Document } from 'mongoose'

interface IRecipe extends Document {
  author: string,
  name: string,
  category: string,
  image: string,
  tutorial: string,
  description: string,
  calories: string,
  ingredients: string,
  createdAt: Date,
  isPrivate: boolean
}

const recipeSchema: Schema = new Schema({
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  category: {
    type: String
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
  calories: {
    type: String
  },
  ingredients: {
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

const Recipe: Model<IRecipe> = model('Recipe', recipeSchema)

export { Recipe as recipeModel, IRecipe }