import express, { Router, Request, Response, NextFunction } from 'express'

const router : Router = express.Router()

router.route('/')
  .all(async (req: Request, res: Response, next: NextFunction) => {
      next()
  })
  .get(async (req: Request, res: Response) => {
      res.send({ workouts: [] })
  })

export { router as workouts }