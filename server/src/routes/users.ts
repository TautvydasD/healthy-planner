import express, { Router, Request, Response, NextFunction } from 'express'
import { userModel, IUser } from '../models/users'

const router : Router = express.Router()


router.route('/')
  .all(async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json')
    next()  
  })
  .get(async (req: Request, res: Response) => {
    try {
      res.statusCode = 200
      res.setHeader('Cache-Control', 'max-age=3600')
      const users: Array<IUser> = await userModel.find()
      res.send({ users : users })
    } catch {
      res. send({ error: 'Could not get users' })
    }
  })
  .post(async (req : Request, res : Response) => {
    const user = await userModel.findOne({ username: req.body.username })
    const userEmail = await userModel.findOne({ email: req.body.email })
  
    if (user || userEmail) {
      res.statusCode = 409
      res.send({ error: 'User already exists' })
      return
    }
  
    userModel.create(req.body,
      (err: Error, result: IUser) => {
        if (err) {
          res.statusCode = 409
          res.send({ error: err.message})
        } else {
          res.statusCode = 201
          res.send(result)
        }
      }
    )
  })
  .put((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })
  .delete((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })

router.route('/:id')
  .all((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json')
      next()
  })
  .get(async (req : Request, res : Response) => {
    userModel.findOne({ _id: req.params.id }, (err: Error, results: IUser) => {
          if (!results) {
              res.statusCode = 404
              res.send({ message: 'Item not found' })
              return
          }
          res.statusCode = 200
          res.setHeader('Cache-Control', 'max-age=3600')
          res.send(results)
      })
  })
  .post((req : Request, res : Response) => {
      res.statusCode = 400
      res.send({ message: 'Bad Request' })
  })
  .put(async (req : Request, res : Response) => {
    userModel.findByIdAndUpdate(req.params.id, req.body, { new: true}).then((doc: IUser | null) => {
          if(!doc) {
              res.statusCode = 404
              res.send({ message: 'Item not found' })
              return
          }
          res.statusCode = 200
          res.setHeader('Cache-Control', 'max-age=3600')
          res.send(doc)
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 404
        res.send({ error: 'Exercise not found' })
        return
      }
    })
  })
  .delete(async (req : Request, res : Response) => {
    userModel.findByIdAndRemove(req.params.id).then((results: IUser | null) => {
      if (!results) {
        res.statusCode = 404
        res.send({ message: 'User not found' })
        return
      }

      res.statusCode = 200
      res.send('')
    })
    .catch((err: Error) => {
      if (err) {
        res.statusCode = 400
        res.send({ error: 'Cannot remove user' })
        return
      }
    })
  })
// router.route('/:id/:param')
//   .all((req, res, next) => {
//     next()
//   })
//   .get(async (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     try {
//       const userObj: IUser | null = await userModel.findOne({ _id: req.params.id })
//       if (userObj[req.params.param]) {
//         res.statusCode = 200
//         res.setHeader('Cache-Control', 'max-age=3600')
//         res.send({ [req.params.param]: userObj[req.params.param] })
//       } else {
//         res.statusCode = 404
//         res.send({ message: 'Item parameter not found' })
//       }
//     } catch {
//       res.statusCode = 404
//       res.send({ message: 'Item not found' })
//     }
//   })
export { router as users }