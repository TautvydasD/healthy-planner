import express, { Request, Response, Router} from 'express'
import { userModel, IUser } from '../models/users'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

const router : Router = express.Router()

router.post('/login', async (req : Request, res : Response) => {
  console.log(req.body)
  const { username, password, email } = req.body

  const loggedUser = await userModel.findOne({ username: username, password: password })
  const loggedUserEmail = await userModel.findOne({ email: email, password: password})
  
  if (loggedUser || loggedUserEmail) {
    res.send({ success: true })
  } else {
    res.statusCode = 401
    res.send({ error: 'Incorrect Credentials' })
  }
})

router.post('/signup', async (req : Request, res : Response) => {
  console.log(req.body)
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
  readHTMLFile('./src/template/mailApi.html', (err, html) => {
    const template = handlebars.compile(html)
    const replacements = {
      username: req.body.username,
      text: 'Welcome to popoPlan planner.\
      We are happy that you chose this service.'
    }
    const htmlToSend = template(replacements)
    sendMail(res, htmlToSend, 'Welcome to popoPlan', req.body.email)
  })
})



// router.post('/restorePassword', async (req: Request, res: Response) => {

// })

const readHTMLFile = (path: string, callback: (path: string | null, html?: string) => void) => {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      throw err
      // callback(err)
    }
    else {
      callback(null, html)
    }
  })
}

const sendMail = (res: Response, html: string, subject: string, sendTo: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tautvydas.diksas@gmail.com',
      pass: ''
    }
  })
  const mailOptions = {
    from: 'tautvydas.diksas@gmail.com',
    to: sendTo,
    subject: subject,
    html: html
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      // res.json({ error: err })
      // return
    } else {
      console.log('message sent: ' + info)
    }
  })
}

export { router as api }