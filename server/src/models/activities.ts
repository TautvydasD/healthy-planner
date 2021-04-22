import { Schema, Model, model, Document } from 'mongoose'

interface IActivity extends Document {
  name: string,
  category: string,
  description: string
  from: string,
  to: string,
  createdAt: Date
}

const activitySchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  category: {
    type: String,
    required: [true, 'Type is required'],
  },
  description: {
    type: String
  },
  from: {
    type: String,
    required: [true, 'Activity start time is required']
  },
  to: {
    type: String,
    required: [true, 'Activity end time is required']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Activity: Model<IActivity> = model('Activity', activitySchema)

export { Activity as activityModel, IActivity }
/**
 * Idejos:
 * Daryti palyginima, kiek nukrypai per diena nuo savo uzsibreztu tikslu
 * Priminimai, kad eiti pasivaikscioti
 * Vandens priminimas
 * Poilsio priminimai
 * Pastovus veiklos priminimas
 * 
 * 
 */