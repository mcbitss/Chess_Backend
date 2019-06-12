import { sendProfileUpdateEmail } from './confirmation-email'
import { resetPassword } from '../../../config'

const Editnotify = (userType, email, token, message) =>
  new Promise(async resolve => {
    const notification = await sendProfileUpdateEmail({
      email,
      url: `${resetPassword}/${userType}/${token}/`,
      message
    })
    resolve(notification)
  })

export default Editnotify
