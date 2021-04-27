/**
 * Author: Tautvydas Dikšas
 * Date: 2021-04-26
 * Path: src/helpers/mailer
 * 
 */
import nodemailer from 'nodemailer'
import fs from 'fs'
import { CallbackError } from 'mongoose'
import { Response } from 'express'

export function readHTMLFile (path: string, callback: (path: string | null, html?: string) => void) : void {
  fs.readFile(
    path,
    { encoding: 'utf-8' },
    (err, html) => {
      if (err) {
        throw err
      }
      else {
        callback(null, html)
      }
    }
  )
}

export function sendMail (res: Response, html: string, subject: string, sendTo: string) : void {
  const transporter = nodemailer
    .createTransport({
      service: 'Gmail',
      auth: {
        user: 'popoplannews@gmail.com',
        pass: 'popoPlanPassword'
      }
    }
  )

  const mailOptions = {
    from: 'popoplannews@gmail.com',
    to: sendTo,
    subject: subject,
    html: html
  }

  transporter
    .sendMail(
      mailOptions,
      (err: Error | null, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log('message sent: ' + JSON.stringify(info))
        }
      }
    )
}