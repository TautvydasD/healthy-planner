import express, { Application, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import config from '../config.json'
import { routes } from './routes'
import favicon from 'serve-favicon'

mongoose.connect(`mongodb://${config.IP}/${config.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true}
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database is Online')
})


const app: Application = express()
app.use(favicon(__dirname + '/../public/health-logo.ico'))

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        res.send(req.body)
    }
    res.setHeader('Content-type', 'application/json')
    next()
})

app.get('/', (req: Request, res: Response) => {
    res.send({'garbage': true})
})

app.use('/api', routes.api)
app.use('/api/plans', routes.plans)
app.use('/api/users', routes.users)

app.listen(config.PORT, () => console.log(`✨📡Server listening port at: ${config.PORT}📡✨`))
