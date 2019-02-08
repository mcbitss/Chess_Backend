import Translations from './model';
import { success, notFound } from '../../services/response/'

export const create = ({ bodymen: { body } }, res, next) => {
  Translations.create(body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

export const show = ({ params }, res, next) =>
Translations.findById(params.id)
    .then(notFound(res))
    .then(applications => (applications ? applications.view() : null))
    .then(success(res))
    .catch(next)

export const index = (req, res, next) =>{
  Translations.find({ }, {}, { sort: { year: 1 }})
  .then(Questions => Questions.map(yearly => yearly.view()))
  .then(success(res))
  .catch(next)
}

export const byCategory = ({ params }, res, next) =>{
  Translations.find({ category: params.category, country: params.country, language: params.language }, {}, { sort: { year: 1 }})
  .then(translations => translations.map(yearly => yearly.view()))
  .then(success(res))
  .catch(next)
}

export const update = (req, res, next) => {
  const { body } = req;
  if(body.length > 0) {
    const promises = body.map(doc => {
      return new Promise((resolve, reject) => {
        Translations.findByIdAndUpdate(doc.id, doc, {upsert: false, new: true}, (err, result) => {
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
    Translations.findByIdAndRemove(req.params.id, (err) => {
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