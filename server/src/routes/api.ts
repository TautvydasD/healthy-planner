import express, { Request, Response, Router} from 'express'

const router : Router = express.Router()

router.post('/login', async (req : Request, res : Response) => {
  // res.setHeader('Content-Type', 'application/json')
  res.send({ success: true })
})

router.post('/signup', async (req : Request, res : Response) => {
  res.send({ success: true })
})

export { router as api }