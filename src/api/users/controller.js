import Users from './model';
import { success, notFound } from '../../services/response/'

export const create = ({ bodymen: { body } }, res, next) => {
  Users.create(body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

export const login = (req, res, next) => {
  Users.findOne( req.body, ((err, resp) => {
      if (err) {
        res.send(err);
      } else {
        res.send(resp.view())
      }
    }))
}; 

export const show = ({ params }, res, next) =>
Users.findById(params.id)
    .then(notFound(res))
    .then(applications => (applications ? applications.view() : null))
    .then(success(res))
    .catch(next)

export const index = (req, res, next) =>{
  Users.find({}, {}, { sort: { year: 1 }})
  .then(users => users.map(yearly => yearly.view()))
  .then(success(res))
  .catch(next)
}
  
export const applicationDashboardData = (req, res, next) => {

}

export const update = (req, res, next) => {
  const { body } = req;
  Users.findByIdAndUpdate(body.id, body, {upsert: false, new: true}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.view());
    }
  });  
}
export const destroy = (req, res, next) =>{
  if (req.params.id) {
    Users.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.send(err);
      }
      else {
      }
    });
  } else {
    res.send({ error: true, message: "Object ID missing" });
  }
}  