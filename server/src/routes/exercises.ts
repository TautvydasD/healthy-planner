/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/routes/exercises
 * 
 */
import express, { NextFunction, Request, Response, Router} from 'express'
import { exerciseModel, IExercise } from '../models/exercises'

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
      const exercises: Array<IExercise>  = await exerciseModel.find()
      res.send({ exercises: exercises })
    } catch {
      res.send({ error: 'Could not get exercises' })
    }
  })
  .post(async (req: Request, res: Response) => {
    // const exerciseObj = await exerciseModel.findOne({ name: req.body.name })

    // if (exerciseObj) {
    //   res.statusCode = 409
    //   res.send({ error: 'Exercise already exists' })
    //   return
    // }
    exerciseModel.create(req.body,
      (err: Error, result: IExercise) => {
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

router.get('/user', async (req: Request, res: Response) => {
  try {
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    const exercises: Array<IExercise>  = await exerciseModel.find({ author: req.body.author })
    res.send({ exercises: exercises })
  } catch {
    res.send({ error: 'Could not get exercises' })
  }
})

router.get('/public', async (req: Request, res: Response) => {
  try {
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    const exercises: Array<IExercise>  = await exerciseModel.find()
    res.send({ exercises: exercises.filter(el => !el.isPrivate) })
  } catch {
    res.send({ error: 'Could not get exercises' })
  }
})

router.route('/:id')
  .all((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req: Request, res: Response) => {
    try {
      await exerciseModel.findOne({ _id: req.params.id }, (err: Error, result: IExercise) => {
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
      res.send({ error: 'Cannot retriever exercise' })
    }
  })
  .post((req: Request, res: Response) => {
    res.statusCode = 400
    res.send({ error: 'Bad Request' })
  })
  .put(async (req: Request, res: Response) => {
    exerciseModel.findByIdAndUpdate(req.params.id , req.body, { new: true }).then((data: IExercise | null) => {
      if (!data) {
        res.statusCode = 404
        res.send({ error: 'Exercise not found' })
        return
      }
      res.statusCode = 200
      res.setHeader('Cache-Control', 'max-age=3600')
      res.send(data)
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 404
        res.send({ error: 'Exercise not found' })
        return
      }
    })
  })
  .delete(async (req: Request, res: Response) => {
    exerciseModel.findByIdAndRemove(req.params.id).then((data: IExercise | null) => {
      if (!data) {
        res.statusCode = 404
        res.send({ error: 'Exercise not found' })
        return
      }
      res.statusCode = 200
      res.send(data)
      return data
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 400
        res.send({ error: 'Cannot remove exercise' })
        return
      }
    })
  })


  export { router as exercises }