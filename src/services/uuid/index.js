import uuidv4 from 'uuid/v4'

const generateUUID = () =>
  new Promise(resolve => {
    const token = uuidv4()
    resolve(token)
  })

export { generateUUID }