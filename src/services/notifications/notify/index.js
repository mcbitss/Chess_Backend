import { sendVerificationEmail } from './confirmation-email'
import { accountActivation } from '../../../config'

const Notify = (userType, email, token) =>
  new Promise(async resolve => {
    console.log("Sending email");
    const notification = await sendVerificationEmail({
      email,
      url: `${accountActivation}/${userType}/${token}/`
    })
    resolve(notification)
  })

export default Notify
