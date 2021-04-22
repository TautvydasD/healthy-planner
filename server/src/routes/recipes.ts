import express, { NextFunction, Request, Response, Router} from 'express'
import { recipeModel, IRecipe } from '../models/recipes'

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
      const recipes: Array<IRecipe> = await recipeModel.find()
      res.send({ recipes: recipes })
    } catch {
      res.send({ error: 'Could not get recipes' })
    }
  })
  .post(async (req: Request, res: Response) => {
    recipeModel.create(req.body,
      (err: Error, result: IRecipe) => {
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

  router.get('/public', async (req: Request, res: Response) => {
    try {
      res.statusCode = 200
      res.setHeader('Cache-Control', 'max-age=3600')
      const recipes: Array<IRecipe>  = await recipeModel.find()
      res.send({ recipes: recipes.filter(el => !el.isPrivate) })
    } catch {
      res.send({ error: 'Could not get exercises' })
    }
  })



export { router as recipes }
