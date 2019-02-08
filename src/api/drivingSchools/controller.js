import DrivingSchool from './model';
import { success, notFound } from '../../services/response/';

export const create = ({ bodymen: { body } }, res, next) => {
  DrivingSchool.create(body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

export const show = ({ params }, res, next) =>
  DrivingSchool.findById(params.id)
    .then(notFound(res))
    .then(school => (school ? school.view() : null))
    .then(success(res))
    .catch(next);

export const index = (req, res, next) => {
  DrivingSchool.find({}, {}, { sort: { year: 1 } })
    .then(school => school.map(driving => driving.view()))
    .then(success(res))
    .catch(next);
};

export const byCategory = ({ params }, res, next) => {
  DrivingSchool.find(
    {
      category: params.category,
      country: params.country,
      language: params.language,
      isValid: true
    },
    {},
    { sort: { year: 1 } }
  )
    .then(school => school.map(driving => driving.view()))
    .then(success(res))
    .catch(next);
};

export const byCountryAndLanguage = ({ params }, res, next) =>{
  DrivingSchool.find({ country: params.country, language: params.language, isValid: true }, {}, { sort: { year: 1 }})
  .then(school => school.map(driving => driving.view()))
  .then(success(res))
  .catch(next)
}

export const update = (req, res, next) => {
  const { body } = req;
  if (body.length > 0) {
    const promises = body.map(doc => {
      return new Promise((resolve, reject) => {
        DrivingSchool.findByIdAndUpdate(
          doc.id,
          doc,
          { upsert: false, new: true },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  } else {
    res.send({ error: true, message: 'Invalid operation' });
  }
};
export const destroy = (req, res, next) => {
  if (req.params.id) {
    DrivingSchool.findByIdAndRemove(req.params.id, err => {
      if (err) {
        res.send(err);
      } else {
      }
    });
  } else {
    res.send({ error: true, message: 'Object ID missing' });
  }
};

export const updateDrivingSchool = (req, res, next) => {
  DrivingSchool.findOneAndUpdate({ _id: req.params.id }, req.body).then(
    updated => {
      res.send({
        error: false,
        message: 'Updated Successfully'
      });
    }
  );
};
