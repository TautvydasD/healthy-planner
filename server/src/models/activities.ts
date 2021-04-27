/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/models/activities
 * 
 */
import { Schema, Model, model, Document } from 'mongoose'

interface IActivity extends Document {
  name: string,
  category: string,
  description: string
  fromDate: Date,
  fromTime: Date,
  toDate: Date,
  toTime: Date,
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
  fromDate: {
    type: Date,
    required: [true, 'Date is required']
  },
  fromTime: {
    type: Date
  },
  toDate: {
    type: Date,
  },
  toTime: {
    type: Date
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