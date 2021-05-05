/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/routes/api
 * 
 */
import express, { Request, Response, Router} from 'express'
import { userModel, IUser } from '../models/users'
import handlebars from 'handlebars'
import { sendMail, readHTMLFile} from '../helpers/mailer'

const router : Router = express.Router()

router.post('/login', login)

async function login (req : Request, res : Response) {
  console.log(req.body)
  const { username, password, email } = req.body
  
  const loggedUser = await userModel.findOne({ username: username, password: password })
  const loggedUserEmail = await userModel.findOne({ email: email, password: password})
  
  if (loggedUser || loggedUserEmail) {
    return res
      .status(200)
      .send({
        success: true,
        userId: loggedUser ? loggedUser['_id'] : ''
      })
  } else {
    return res
      .status(401)
      .send({ error: 'Incorrect Credentials' })
  }
}

router.post('/signup', async (req : Request, res : Response) => {
  console.log(req.body)
  const user = await userModel.findOne({ username: req.body.username })
  // const userEmail = await userModel.findOne({ email: req.body.email })

  if (user) {
    return res
      .status(409)
      .send({ error: 'User already exists' })
  }

  userModel.create(
    req.body,
    (err: Error, result: IUser) => {
      if (err) {
        return res
          .status(409)
          .send({ error: err.message})
      } else {
        return res
          .status(201)
          .send(result)
      }
    }
  )

  readHTMLFile(
    './src/template/mailApi.html',
    (err, html) => {
      const template = handlebars.compile(html)
      const replacements = {
        username: req.body.username,
        text: 'Welcome to popoPlan planner.\
        We are happy that you chose this service.'
      }
      const htmlToSend = template(replacements)
      sendMail(res, htmlToSend, 'Welcome to popoPlan', req.body.email)
    }
  )
})

export { router as api, login }