import { cloneDeep } from 'lodash'
import QuestionTranslations from './model';
import { success, notFound } from '../../services/response/'
import Questions from '../Questions/model';

export const createTranslations = (req, res, next) => {
  const finalLanguages = [];
  req.body.questionTranslations.languages.map((language) => {
    const lang = language;
     if (req.body.question.language === language.sortname) {
      lang.questionId = req.body.questionsId;
      lang.isValid = true;
     }
     finalLanguages.push(lang);
  });
  req.body.questionTranslations.ref = req.body.questionsId;
  req.body.questionTranslations.languages = finalLanguages;
  QuestionTranslations.create(req.body.questionTranslations, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

export const show = ({ params }, res, next) =>
QuestionTranslations.findById(params.id)
    .then(notFound(res))
    .then(applications => (applications ? applications.view() : null))
    .then(success(res))
    .catch(next)

export const index = (req, res, next) =>{
  QuestionTranslations.find({ }, {}, { sort: { year: 1 }})
  .then(Questions => Questions.map(yearly => yearly.view()))
  .then(success(res))
  .catch(next)
}

export const byCategory = ({ params }, res, next) =>{
  QuestionTranslations.find({ category: params.category, country: params.country, language: params.language }, {}, { sort: { year: 1 }})
  .then(QuestionTranslations => QuestionTranslations.map(yearly => yearly.view()))
  .then(success(res))
  .catch(next)
}

export const update = (req, res, next) => {
  const { body } = req;
  if(body.length > 0) {
    const promises = body.map(doc => {
      return new Promise((resolve, reject) => {
        QuestionTranslations.findByIdAndUpdate(doc.id, doc, {upsert: false, new: true}, (err, result) => {
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
    QuestionTranslations.findByIdAndRemove(req.params.id, (err) => {
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

export const updateCreateTranslations = (req, res, next) => {
  QuestionTranslations.findOneAndUpdate({ref: req.body.ref,'languages.sortname': req.body.question.language },
  {$set: {
    'languages.$.isValid': true, 'languages.$.questionId': req.body.questionsId}
  }, { new: true },(err, resp) => {
    console.log(resp, '222222');
    const questions = resp.languages.map((language) => {
       return language.questionId;
    });
    console.log(questions);
    QuestionTranslations.findOne({ ref: req.body.ref, 'languages.isValid': false }, (err, resp) => {
      if (resp === null) {
        Questions.updateMany({ '_id': { $in: questions } }, { $set: { isValid: true }}, (err, resp) => {
          index(req, res, next)
        })
      } else {
        index(req, res, next)
      }
    })
  })
}