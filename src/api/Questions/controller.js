import Questions from './model';
import { success, notFound } from '../../services/response/';

export const create = (req, res, next) => {
  Questions.create(req.body.question, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result._id, 'result._id');
      req.body.questionsId = result._id
      next()
    }
  })
}

export const show = ({ params }, res, next) =>
Questions.findById(params.id)
    .then(notFound(res))
    .then(questions => (questions ? questions.view() : null))
    .then(success(res))
    .catch(next)

export const index = (req, res, next) =>{
  Questions.find({ }, {}, { sort: { year: 1 }})
  .then(Questions => Questions.map(ques => ques.view()))
  .then(success(res))
  .catch(next)
}

export const byCategory = ({ params }, res, next) =>{
  Questions.find({ category: params.category, country: params.country, language: params.language, isValid: true }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
        const arrLength = 8;
        const shuffled = result.sort(function(){return .5 - Math.random()});
        const selected =shuffled.slice(0,arrLength);
        res.send(selected.map(ques => ques.view()))
    }
  })
}

export const byCountryAndLanguage = ({ params }, res, next) =>{
  Questions.find({ country: params.country, language: params.language, isValid: true }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
        const arrLength = 8;
        const shuffled = result.sort(function(){return .5 - Math.random()});
        const selected =shuffled.slice(0,arrLength);
        res.send(selected.map(ques => ques.view()))
    }
  })
}

export const update = (req, res, next) => {
  const { body } = req;
  if(body.length > 0) {
    const promises = body.map(doc => {
      return new Promise((resolve, reject) => {
        Questions.findByIdAndUpdate(doc.id, doc, {upsert: false, new: true}, (err, result) => {
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
    Questions.findByIdAndRemove(req.params.id, (err) => {
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