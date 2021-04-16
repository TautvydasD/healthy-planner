import express, { NextFunction, Request, Response, Router} from 'express'
import { activityModel, IActivity } from '../models/activity'

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
      const activities: Array<IActivity>  = await activityModel.find()
      res.send({ activities: activities })
    } catch {
      res.send({ error: 'Could not get exercises' })
    }
  })
  .post(async (req: Request, res: Response) => {
    activityModel.create(req.body,
      (err: Error, result: IActivity) => {
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
//broken
router.get('/user', async (req: Request, res: Response) => {
  try {
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    
    const activities: Array<IActivity>  = await activityModel.find({ author: req.body.author })
    res.send({ activities: activities })
  } catch {
    res.send({ error: 'Could not get activities' })
  }
})

router.get('/public', async (req: Request, res: Response) => {
  try {
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    const activities: Array<IActivity>  = await activityModel.find()
    res.send({ activities: activities })
  } catch {
    res.send({ error: 'Could not get activities' })
  }
})

router.route('/:id')
  .all((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req: Request, res: Response) => {
    try {
      await activityModel.findOne({ _id: req.params.id }, (err: Error, result: IActivity) => {
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
      res.send({ error: 'Cannot retriever activity' })
    }
  })
  .post((req: Request, res: Response) => {
    res.statusCode = 400
    res.send({ error: 'Bad Request' })
  })
  .put(async (req: Request, res: Response) => {
    activityModel.findByIdAndUpdate(req.params.id , req.body, { new: true }).then((data: IActivity | null) => {
      if (!data) {
        res.statusCode = 404
        res.send({ error: 'Activity not found' })
        return
      }
      res.statusCode = 200
      res.setHeader('Cache-Control', 'max-age=3600')
      res.send(data)
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 404
        res.send({ error: 'Activity not found' })
        return
      }
    })
  })
  .delete(async (req: Request, res: Response) => {
    activityModel.findByIdAndRemove(req.params.id).then((data: IActivity | null) => {
      if (!data) {
        res.statusCode = 404
        res.send({ error: 'Activity not found' })
        return
      }
      res.statusCode = 200
      res.send(data)
      return data
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 400
        res.send({ error: 'Cannot remove activity' })
        return
      }
    })
  })


  export { router as activities }