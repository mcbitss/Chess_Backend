import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import { resetPassword } from '../../services/emailAuth/emailAuth'
import { generateUUID } from '../../services/uuid'
import Users from '../users/model';

export const login = ({ user }, res, next) => {
  sign(user.id)
  .then((token) => ({ token, user: user.view(true) }))
  .then(success(res, 201))
  .catch(next)
}
 
export const emailVerification = (req, res, next) => {
  Users.findOne({ '_id': req.params.userId, token: { $ne: '' } }, (err, validationCheck) => {
    if (err) {
         res.send({ isActive: false });
    } else {
      if (validationCheck) {
        Users.update({ '_id': req.params.userId, token: req.params.userToken  },
        { $set: { isActive: true, token: '' } },
        (updateErr, updateResp) => {
          if (updateErr) {
            res.send({ isActive: false });
          } else {
            res.send({ isActive: true, userType: validationCheck.userType });
          }
        })
      } else {
        res.send({ isActive: false });
      }
    }
  })
}

export const generateToken = async (req, res, next) => {
  try {
  const resetToken = await generateUUID()
  const otp = Math.floor(Math.random() * 90000) + 10000
  Users.findOneAndUpdate(
    { userId: req.body.email },
    { $set: { otp, token: resetToken } },
    { new: true },
    (err, result) => {
      if (err) {
        res.send(err)
      }
      if (result === null) {
        res.send({
          error: true,
          message: 'Email not found. Please enter a valid email.'
        })
      }
      if (result !== null) {
        if (!result.otp || !result.token) {
          res.send({
            error: true,
            message: 'Something went wrong. Please try after sometime.'
          })
        } else if (result.otp && result.token) {
          resetPassword(result.otp, result.token, result.email)
          res.send({
            error: false,
            message: 'Check your email to reset password'
          })
        }
      }
    }
  )
} catch(e) {

}
}