import Reports from './model';
import { success, notFound } from '../../services/response/'

export const create = ({ bodymen: { body } }, res, next) => {
  Reports.create(body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

export const show = ({ params }, res, next) =>
Reports.findById(params.id)
    .then(notFound(res))
    .then(applications => (applications ? applications.view() : null))
    .then(success(res))
    .catch(next)

export const index = (req, res, next) =>{
  Reports.find({ }, {}, { sort: { year: 1 }})
  .then(report => report.map(yearly => yearly.view()))
  .then(success(res))
  .catch(next)
}

export const byUser = ({ params }, res, next) =>{
  Reports.find({user: params.user}, {}, { sort: { year: 1 }})
  .then(report => report.map(yearly => yearly.view()))
  .then(success(res))
  .catch(next)
}

export const update = (req, res, next) => {
  const { body } = req;
  if(body.length > 0) {
    const promises = body.map(doc => {
      return new Promise((resolve, reject) => {
        Reports.findByIdAndUpdate(doc.id, doc, {upsert: false, new: true}, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });    
      });
    })
  } else {
    res.send({ error: true, message: "Invalid operation"});
  }
}
export const destroy = (req, res, next) =>{
  if (req.params.id) {
    Reports.findByIdAndRemove(req.params.id, (err) => {
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