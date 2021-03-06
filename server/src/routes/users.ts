import express, { Router, Request, Response, NextFunction } from 'express'

const router : Router = express.Router()

router.route('/')
  .all(async (req: Request, res: Response, next: NextFunction) => {
    // res.setHeader('Content-Type', 'application/json')
    next()  
  })
  .get(async (req: Request, res: Response) => {
    res.send({ users : [] })
  })

export { router as users }