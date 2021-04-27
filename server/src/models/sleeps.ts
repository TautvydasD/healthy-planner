/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/models/sleeps
 * 
 */
import { Schema, Model, model, Document } from 'mongoose'

interface ISleep extends Document {
    name: string;
    from: string;
    to: string;
    createdAt: Date;
}

const sleepSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Sleep name required']
  },
  from: {
    type: String,
    required: [true, 'Sleep start time required']
  },
  to: {
    type: String,
    required: [true, 'Sleep end time is required']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Sleep: Model<ISleep> = model('Sleep', sleepSchema)

export { Sleep as sleepModel, ISleep }