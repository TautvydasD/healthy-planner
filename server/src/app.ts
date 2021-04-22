import express, { Application, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import config from '../config.json'
import { routes } from './routes'
import favicon from 'serve-favicon'
import cors from 'cors'

mongoose.connect(`mongodb://${config.IP}/${config.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true}
)
mongoose.set('useFindAndModify', false)
// Database enabling
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database is Online')
})


const app: Application = express()
app.use(favicon(__dirname + '/../public/health-logo.ico'))
app.use(express.json())
app.use(cors())
app.set('etag', false)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE')
    // res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization')
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept')
    next()
})

app.get('/', (req: Request, res: Response) => {
    res.send({'garbage': true})
})

// Api route enabling
app.use('/api', routes.api)
app.use('/api/plans', routes.plans)
app.use('/api/users', routes.users)
app.use('/api/exercises', routes.exercises)
app.use('/api/recipes', routes.recipes)
app.use('/api/activities', routes.activities)

app.use((req: Request, res: Response) => {
    return res.status(404)
            .json({ message: 'Route not found' })
})

app.listen(config.PORT, () => {
    console.log(`✨📡Server listening port at: ${config.PORT}📡✨`)
})
// setInterval(() => {
//     console.log('testing interval')
// }, 5000)
