import express, { NextFunction, Request, Response, Router} from 'express'
import { sleepModel, ISleep } from '../models/sleeps'

const router: Router = express.Router()

router.route('/')
  .all((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req: Request, res: Response) => {
    try {
      res.statusCode = 200
      res.setHeader('Cache-Control', 'max-age=3600')
      const sleeps: Array<ISleep>  = await sleepModel.find()
      res.send({ sleeps: sleeps })
    } catch {
      res.send({ error: 'Could not get sleep activities' })
    }
  })
  .post(async (req: Request, res: Response) => {
    // const exerciseObj = await exerciseModel.findOne({ name: req.body.name })

    // if (exerciseObj) {
    //   res.statusCode = 409
    //   res.send({ error: 'Exercise already exists' })
    //   return
    // }
    sleepModel.create(req.body,
      (err: Error, result: ISleep) => {
        if (err) {
          res.statusCode = 404
          res.send({ error: err.message })
        } else {
          res.statusCode = 201
          res.send(result)
        }
      })
  })
  .put(async (req: Request, res: Response) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })
  .delete(async (req: Request, res: Response) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })

router.route('/:id')
  .all((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req: Request, res: Response) => {
    try {
      await sleepModel.findOne({ _id: req.params.id }, (err: Error, result: ISleep) => {
        // if (err) {
        //   res.statusCode = 500
        //   res.send({ message: 'Something went wrong' })
        //   return
        // }
        if (!result) {
          res.statusCode = 404
          res.send({ message: 'Item not found'})
          return
        }
        res.statusCode = 200
        res.setHeader('Cache-Control', 'max-age=3600')
        res.send(result)
      })
    } catch {
      res.send({ error: 'Cannot retriever sleep activity' })
    }
  })
  .post((req: Request, res: Response) => {
    res.statusCode = 400
    res.send({ error: 'Bad Request' })
  })
  .put(async (req: Request, res: Response) => {
    sleepModel.findByIdAndUpdate(req.params.id , req.body, { new: true }).then((data: ISleep | null) => {
      if (!data) {
        res.statusCode = 404
        res.send({ error: 'Sleep activity not found' })
        return
      }
      res.statusCode = 200
      res.setHeader('Cache-Control', 'max-age=3600')
      res.send(data)
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 404
        res.send({ error: 'Sleep activity not found' })
        return
      }
    })
  })
  .delete(async (req: Request, res: Response) => {
    sleepModel.findByIdAndRemove(req.params.id).then((data: ISleep | null) => {
      if (!data) {
        res.statusCode = 404
        res.send({ error: 'Sleep activity not found' })
        return
      }
      res.statusCode = 200
      res.send(data)
      return data
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 400
        res.send({ error: 'Cannot remove sleep activity' })
        return
      }
    })
  })


  export { router as sleeps }