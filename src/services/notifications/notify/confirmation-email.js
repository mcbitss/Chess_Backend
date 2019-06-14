import nodemailer from 'nodemailer'
import path from 'path'
import { accountEmail, accountPassword } from '../../../config'
import EmailVerificationTemplate from '../templates/email-verification'
import EmailCertificateVerificationTemplate from '../templates/emailCertificateVerificationForStudents'
import EmailOrderDetailsForEmployer from '../templates/emailOrderDetailsForEmployer'

const fs = require('fs')

// console.log(accountEmail,accountPassword,"CHECK AE AP")
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user: accountEmail,
    pass: accountPassword
  },
  tls: {
    rejectUnauthorized: false
  }
})

export const sendVerificationEmail = ({ email, url }) =>
  new Promise(resolve => {
    // setup email data with unicode symbols
    console.log(email, 'mailOptions')
    let mailOptions = {
      from: '"Bytrol" <bytrol@iteron.in>', // sender address
      to: email, // list of receivers
      subject: 'Welcome to Student Verification Portal: Verify your account', // Subject line
      html: EmailVerificationTemplate(url)
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return resolve({ hasError: true, error })
      }
      resolve({ hasError: false })
      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  })

export const sendVerificationEmailToStudent = ({ email, url }) =>
  new Promise(resolve => {
    // setup email data with unicode symbols
    console.log(email, 'mailOptions')
    let mailOptions = {
      from: '"Bytrol" <bytrol@iteron.in>', // sender address
      to: email, // list of receivers
      subject: 'Certificate Verification: Verify your Certificates', // Subject line
      html: EmailCertificateVerificationTemplate(url)
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return resolve({ hasError: true, error })
      }
      resolve({ hasError: false })
      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  })

export const sendProfileUpdateEmail = ({ email, url, message }) =>
  new Promise(resolve => {
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Bytrol" <bytrol@iteron.in>', // sender address
      to: email, // list of receivers
      subject: 'Profile Update', // Subject line
      text: `${message} have been updated.`
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return resolve({ hasError: true, error })
      }
      resolve({ hasError: false })
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  })

export const sendVerificationEmailToEmployer = ({ email, url, file }) =>
  new Promise(resolve => {
    // setup email data with unicode symbols
    console.log(path.join(__dirname, '../../..'))
    let mailOptions = {
      from: '"Bytrol" <bytrol@iteron.in>', // sender address
      to: email, // list of receivers
      subject: 'Transaction Status', // Subject line
      html: EmailOrderDetailsForEmployer(url),
      attachments: [
        {
          filename: 'Invoice',
          path: path.join(__dirname, '../../../api/callback/rich.pdf')
        }
      ]
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Message sent: %s', error)
        return resolve({ hasError: true, error })
      }
      fs.unlink(
        `${path.join(__dirname, '../../../api/callback/rich.pdf')}`,
        function (err) {
          if (err) {
            console.log(err)
          } else {
            console.log('file deleted successfully')
          }
        }
      )
      resolve({ hasError: false })
      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  })
