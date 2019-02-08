import Rating from './model';
import { success, notFound } from '../../services/response/';

export const create = (req, res, next) => {
  Rating.create(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.view);
    }
  })
}

export const show = ({ params }, res, next) =>
Rating.findById(params.id)
    .then(notFound(res))
    .then(rating => (rating ? rating.view() : null))
    .then(success(res))
    .catch(next)

export const index = (req, res, next) =>{
  Rating.find({ }, {}, { sort: { year: 1 }})
  .then(rating => rating.map(ques => ques.view()))
  .then(success(res))
  .catch(next)
}

export const byUser = ({ params }, res, next) =>{
  Rating.findOne({ user: params.user }, {}, {})
  .then(rating => (rating ? rating.view() : null))
  .then(success(res))
  .catch(next)
}

export const update = (req, res, next) => {
  const { body } = req;
  if(body.length > 0) {
    const promises = body.map(doc => {
      return new Promise((resolve, reject) => {
        Rating.findByIdAndUpdate(doc.id, doc, {upsert: false, new: true}, (err, result) => {
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
    Rating.findByIdAndRemove(req.params.id, (err) => {
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