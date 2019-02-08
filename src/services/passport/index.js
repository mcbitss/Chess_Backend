import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
// import * as facebookService from '../facebook'
// import * as githubService from '../github'
// import * as googleService from '../google'
import Users, { schema } from '../../api/users/model'

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    console.log(err, user, info, 'some')
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

export const facebook = () =>
  passport.authenticate('facebook', { session: false })

export const github = () =>
  passport.authenticate('github', { session: false })

export const google = () =>
  passport.authenticate('google', { session: false })

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required, roles = Users.roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user)) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      req.body.auth = user;
      next()
    })
  })(req, res, next)

passport.use('password', new BasicStrategy((email, password, done) => {
  const userSchema = new Schema({ userId: schema.tree.userId, password: schema.tree.password })
  userSchema.validate({ userId: email, password }, (err) => {
    if (err) done(err)
  })

  Users.findOne({ userId: email }).then((user) => {
    console.log(user)
    if (!user) {
      done(true)
      return null
    }
    return user.authenticate(password, user.password).then((user) => {
      console.log(user)
      done(null, user)
      return null
    }).catch(done)
  })
}))

// passport.use('facebook', new BearerStrategy((token, done) => {
//   facebookService.getUser(token).then((user) => {
//     return User.createFromService(user)
//   }).then((user) => {
//     done(null, user)
//     return null
//   }).catch(done)
// }))

// passport.use('github', new BearerStrategy((token, done) => {
//   githubService.getUser(token).then((user) => {
//     return User.createFromService(user)
//   }).then((user) => {
//     done(null, user)
//     return null
//   }).catch(done)
// }))

// passport.use('google', new BearerStrategy((token, done) => {
//   googleService.getUser(token).then((user) => {
//     return User.createFromService(user)
//   }).then((user) => {
//     done(null, user)
//     return null
//   }).catch(done)
// }))

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) => {
  Users.findById(id).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))
