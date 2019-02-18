import Questions from './model';

export const create = (req, res, next) => {
  Questions.create(req.body, (err, resp) => {
      if (err) {

      } else {
          show (req, res, next);
      }
  })
}

export const updateQuestion = (req, res, next) => {
    Questions.findOneAndUpdate({ '_id': req.params.id }, req.body, { upsert: false }, (err, resp) => {
      if (err) {
  
      } else {
        show(req, res, next);
      }
    });
  }

export const show = (req, res, next) => {
    Questions.Task.find({}).sort({ _id: -1 }).exec((err, resp) => {
        if (err) {

        } else {
            res.send({ error: false, message: 'fetch success', result: resp });
        }
    })
}

export const getByTaskId = (req, res, next) => {
    Questions.find({ task: req.params.getByTaskId }, (err, resp) => {
        if (err) {

        } else {
            res.send({ error: false, message: 'fetch success', result: resp });
        }
    })
}