import express, { Router, Request, Response, NextFunction } from 'express'
import { userModel, IUser } from '../models/users'
import { exerciseModel, IExercise } from '../models/exercises'
import { CallbackError, Types } from 'mongoose'
import { IRecipe, recipeModel } from '../models/recipes'
import { IWorkout, workoutModel } from '../models/workouts'
import { activityModel, IActivity } from '../models/activities'
import { blockParams } from 'handlebars'

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
      const users: Array<IUser> = await userModel.find().populate('exercises')
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
    userModel.findById(req.params.id)
    .populate('exercises')
    .exec((err: Error, results: IUser | null) => {
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

  /** Exercises */
  router.route('/:id/exercises')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req, res) => {
    try {
      const userObj: IUser | null = await userModel.findById(req.params.id).populate('exercises')
      if (userObj?.exercises) {
        res.statusCode = 200
        res.send({ ['exercises']: userObj.exercises })
      } else {
        res.setHeader('Cache-Control', 'max-age=3600')
        res.statusCode = 404
        res.send({ message: 'Item parameter not found' })
      }
    } catch {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
    }
  })
  .post(async (req: Request, res: Response) => {
    console.log(req.body.exercises)
    const ids = req.body.exercises.filter((el: IExercise) => typeof el === 'string')
    const exercises = req.body.exercises.filter((el: IExercise) => typeof el != 'string')
    const exercisesIds = [
      (await exerciseModel.create(exercises[0]).then((doc: IExercise) => {
        return doc
      }))['_id'].toString()
    ]
    exercisesIds.push(...ids)

    const userObj = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          exercises: {
            $each: exercisesIds
          }
        }
      },
      { new: true, useFindAndModify: false }
    ).populate('exercises')
    res.statusCode = 200
    res.send({ ['exercises']: userObj?.exercises })
  })
  .put((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })
  .delete((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })

  router.route('/:id/exercises/:exercise')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req : Request, res : Response) => {
    const userObj: IUser | null = await userModel.findById(req.params.id).populate('exercises')
    const obj = userObj?.exercises.find(el => el['_id'] == req.params.exercise)
    if (!obj) {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
      return
    }
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    res.send(obj)
  })
  .post((req : Request, res : Response) => {
    res.statusCode = 400
    res.send({ message: 'Bad Request' })
  })
  .put(async (req: Request, res: Response) => {
    const userObj = await userModel.findById(req.params.id).populate('exercises').exec()
    if (!userObj) {
      res.statusCode = 404
      res.send({ message: 'Exercise not found' })
      return
    }

    let exists = false
    userObj.exercises.forEach(el => {
      if (el['_id'] == req.params.exercise) {
        exists = true
      }
    })

    if (!exists) {
      res.statusCode = 404
      res.send({ message: 'Exercise not found' })
      return
    }

    exerciseModel.findByIdAndUpdate(req.params.exercise, req.body.exercise, { new: true}).then((doc: IExercise | null) => {
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
  .delete(async (req: Request, res: Response) => {
    const user = await userModel.findById(req.params.id).populate('exercises').exec()
    if (!user) {
      res.statusCode = 404
      res.send({ message: 'Exercise not found' })
      return
    }
    const ids: number = user?.exercises.map(el => el['_id']).indexOf(req.params.exercise) ?? 0
    user?.exercises.splice(ids, 1)
    user?.save((err) => {
      if (err) {
        res.statusCode = 400
        res.send(err)
        return
      }
      exerciseModel.findByIdAndRemove(req.params.exercise).then((results: IExercise | null) => {
        if (!results) {
          res.statusCode = 404
          res.send({ message: 'Exercise not found' })
          return
        }
  
        res.statusCode = 200
        res.send('')
      })
      .catch((err: Error) => {
        if (err) {
          res.statusCode = 400
          res.send({ error: 'Cannot remove exercise' })
          return
        }
      })
    })
  })

  /** Recipes */
  router.route('/:id/recipes')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req, res) => {
    try {
      const userObj: IUser | null = await userModel.findById(req.params.id).populate('recipes')
      if (userObj?.recipes) {
        res.statusCode = 200
        res.send({ ['recipes']: userObj.recipes })
      } else {
        res.setHeader('Cache-Control', 'max-age=3600')
        res.statusCode = 404
        res.send({ message: 'Item parameter not found' })
      }
    } catch {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
    }
  })
  .post(async (req: Request, res: Response) => {
    const ids = req.body.recipes.filter((el: IRecipe) => typeof el === 'string')
    console.log(ids)
    const recipes = req.body.recipes.filter((el: IRecipe) => typeof el != 'string')
    console.log(recipes)
    const recipesIds = [
      (await recipeModel.create(recipes[0]).then((doc: IRecipe) => {
        return doc
      }))['_id'].toString()
    ]
    recipesIds.push(...ids)

    const userObj = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          recipes: {
            $each: recipesIds
          }
        }
      },
      { new: true, useFindAndModify: false }
    ).populate('recipes')
    res.statusCode = 200
    res.send({ ['recipes']: userObj?.recipes })
  })
  .put((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })
  .delete((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })

  router.route('/:id/recipes/:recipe')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req : Request, res : Response) => {
    const userObj: IUser | null = await userModel.findById(req.params.id).populate('recipes')
    const obj = userObj?.recipes.find(el => el['_id'] == req.params.recipe)
    if (!obj) {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
      return
    }
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    res.send(obj)
  })
  .post((req : Request, res : Response) => {
    res.statusCode = 400
    res.send({ message: 'Bad Request' })
  })
  .put(async (req: Request, res: Response) => {
    const userObj = await userModel.findById(req.params.id).populate('recipes').exec()
    if (!userObj) {
      res.statusCode = 404
      res.send({ message: 'Recipe not found' })
      return
    }

    let exists = false
    userObj.recipes.forEach(el => {
      if (el['_id'] == req.params.recipe) {
        exists = true
      }
    })

    if (!exists) {
      res.statusCode = 404
      res.send({ message: 'Recipe not found' })
      return
    }

    recipeModel.findByIdAndUpdate(req.params.recipe, req.body.recipe, { new: true}).then((doc: IRecipe | null) => {
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
        res.send({ error: 'Recipe not found' })
        return
      }
    })
  })
  .delete(async (req: Request, res: Response) => {
    const user = await userModel.findById(req.params.id).populate('recipes').exec()
    if (!user) {
      res.statusCode = 404
      res.send({ message: 'Recipe not found' })
      return
    }
    const ids: number = user?.recipes.map(el => el['_id']).indexOf(req.params.recipe) ?? 0
    user?.recipes.splice(ids, 1)
    user?.save((err) => {
      if (err) {
        res.statusCode = 400
        res.send(err)
        return
      }
      recipeModel.findByIdAndRemove(req.params.recipe).then((results: IRecipe | null) => {
        if (!results) {
          res.statusCode = 404
          res.send({ message: 'Recipe not found' })
          return
        }
  
        res.statusCode = 200
        res.send('')
      })
      .catch((err: Error) => {
        if (err) {
          res.statusCode = 400
          res.send({ error: 'Cannot remove Recipe' })
          return
        }
      })
    })
  })

  /** Workouts */
  router.route('/:id/workouts')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req, res) => {
    try {
      const userObj: IUser | null = await userModel.findById(req.params.id).populate('workouts')
      if (userObj?.workouts) {
        res.statusCode = 200
        res.send({ ['workouts']: userObj.workouts })
      } else {
        res.setHeader('Cache-Control', 'max-age=3600')
        res.statusCode = 404
        res.send({ message: 'Item parameter not found' })
      }
    } catch {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
    }
  })
  .post(async (req: Request, res: Response) => {
    const ids = req.body.workouts.filter((el: IWorkout) => typeof el === 'string')
    console.log(ids)
    const workouts = req.body.workouts.filter((el: IWorkout) => typeof el != 'string')
    console.log(workouts)
    const workoutsIds = [
      (await workoutModel.create(workouts[0]).then((doc: IWorkout) => {
        return doc
      }))['_id'].toString()
    ]
    workoutsIds.push(...ids)

    const userObj = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          workouts: {
            $each: workoutsIds
          }
        }
      },
      { new: true, useFindAndModify: false }
    ).populate('workouts')
    res.statusCode = 200
    res.send({ ['workouts']: userObj?.workouts })
  })
  .put((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })
  .delete((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })

  router.route('/:id/workouts/:workout')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req : Request, res : Response) => {
    const userObj: IUser | null = await userModel.findById(req.params.id).populate('workouts')
    const obj = userObj?.workouts.find(el => el['_id'] == req.params.workout)
    if (!obj) {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
      return
    }
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    res.send(obj)
  })
  .post((req : Request, res : Response) => {
    res.statusCode = 400
    res.send({ message: 'Bad Request' })
  })
  .put(async (req: Request, res: Response) => {
    const userObj = await userModel.findById(req.params.id).populate('workouts').exec()
    if (!userObj) {
      res.statusCode = 404
      res.send({ message: 'Workout not found' })
      return
    }

    let exists = false
    userObj.workouts.forEach(el => {
      if (el['_id'] == req.params.workout) {
        exists = true
      }
    })

    if (!exists) {
      res.statusCode = 404
      res.send({ message: 'Workout not found' })
      return
    }

    workoutModel.findByIdAndUpdate(req.params.workout, req.body.workout, { new: true}).then((doc: IWorkout | null) => {
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
        res.send({ error: 'Workout not found' })
        return
      }
    })
  })
  .delete(async (req: Request, res: Response) => {
    const user = await userModel.findById(req.params.id).populate('workouts').exec()
    if (!user) {
      res.statusCode = 404
      res.send({ message: 'Workout not found' })
      return
    }
    const ids: number = user?.workouts.map(el => el['_id']).indexOf(req.params.workout) ?? 0
    user?.workouts.splice(ids, 1)
    user?.save((err) => {
      if (err) {
        res.statusCode = 400
        res.send(err)
        return
      }
      workoutModel.findByIdAndRemove(req.params.workout).then((results: IWorkout | null) => {
        if (!results) {
          res.statusCode = 404
          res.send({ message: 'Workout not found' })
          return
        }
  
        res.statusCode = 200
        res.send('')
      })
      .catch((err: Error) => {
        if (err) {
          res.statusCode = 400
          res.send({ error: 'Cannot remove Workout' })
          return
        }
      })
    })
  })

  /** Activities */
  router.route('/:id/activities')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req, res) => {
    try {
      const userObj: IUser | null = await userModel.findById(req.params.id).populate('activities')
      if (userObj?.activities) {
        res.statusCode = 200
        res.send({ ['activities']: userObj.activities })
      } else {
        res.setHeader('Cache-Control', 'max-age=3600')
        res.statusCode = 404
        res.send({ message: 'Item parameter not found' })
      }
    } catch {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
    }
  })
  .post(async (req: Request, res: Response) => {
    const ids = req.body.activities.filter((el: IActivity) => typeof el === 'string')
    console.log(ids)
    const activities = req.body.activities.filter((el: IActivity) => typeof el != 'string')
    console.log(activities)
    const activitiesIds = [
      (await activityModel.create(activities[0]).then((doc: IActivity) => {
        return doc
      }))['_id'].toString()
    ]
    activitiesIds.push(...ids)

    const userObj = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          activities: {
            $each: activitiesIds
          }
        }
      },
      { new: true, useFindAndModify: false }
    ).populate('activities')
    res.statusCode = 200
    res.send({ ['activities']: userObj?.activities })
  })
  .put((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })
  .delete((req, res) => {
    res.statusCode = 405
    res.send({ message: 'Method not allowed, Missing item id' })
  })

  router.route('/:id/activities/:activity')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get(async (req : Request, res : Response) => {
    const userObj: IUser | null = await userModel.findById(req.params.id).populate('activities')
    const obj = userObj?.activities.find(el => el['_id'] == req.params.activity)
    if (!obj) {
      res.statusCode = 404
      res.send({ message: 'Item not found' })
      return
    }
    res.statusCode = 200
    res.setHeader('Cache-Control', 'max-age=3600')
    res.send(obj)
  })
  .post((req : Request, res : Response) => {
    res.statusCode = 400
    res.send({ message: 'Bad Request' })
  })
  .put(async (req: Request, res: Response) => {
    const userObj = await userModel.findById(req.params.id).populate('activities').exec()
    if (!userObj) {
      res.statusCode = 404
      res.send({ message: 'Activity not found' })
      return
    }

    let exists = false
    userObj.activities.forEach(el => {
      if (el['_id'] == req.params.activity) {
        exists = true
      }
    })

    if (!exists) {
      res.statusCode = 404
      res.send({ message: 'Activity not found' })
      return
    }

    activityModel.findByIdAndUpdate(req.params.activity, req.body.activity, { new: true}).then((doc: IActivity | null) => {
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
        res.send({ error: 'Activity not found' })
        return
      }
    })
  })
  .delete(async (req: Request, res: Response) => {
    const user = await userModel.findById(req.params.id).populate('activities').exec()
    if (!user) {
      console.log('fails here')
      res.statusCode = 404
      res.send({ message: 'Activity not found' })
      return
    }
    const ids: number = user?.activities.map(el => el['_id']).indexOf(req.params.activity) ?? 0
    user?.activities.splice(ids, 1)
    user?.save((err) => {
      if (err) {
        res.statusCode = 400
        res.send(err)
        return
      }
      activityModel.findByIdAndRemove(req.params.activity).then((results: IActivity | null) => {
        if (!results) {
          res.statusCode = 404
          res.send({ message: 'Activity not found' })
          return
        }
  
        res.statusCode = 200
        res.send('')
      })
      .catch((err: Error) => {
        if (err) {
          res.statusCode = 400
          res.send({ error: 'Cannot remove Activity' })
          return
        }
      })
    })
  })

export { router as users }