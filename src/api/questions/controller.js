import Questions from './model';

export const create = (req, res, next) => {
  Questions.create(req.body, (err, resp) => {
    if (err) {
    } else {
      show(req, res, next);
    }
  });
};

export const updateQuestion = (req, res, next) => {
  Questions.findOneAndUpdate({ _id: req.params.id }, req.body, {
    upsert: false
  })
    .populate('task')
    .exec((err, resp) => {
      if (err) {
      } else {
        show(req, res, next);
      }
    });
};

export const show = (req, res, next) => {
  Questions.find({ status: 'Active' })
    .populate('task')
    .sort({ _id: -1 })
    .exec((err, resp) => {
      if (err) {
      } else {
        res.send({ error: false, message: 'fetch success', result: resp });
      }
    });
};

export const getByTaskId = (req, res, next) => {
  Questions.find({ task: req.params.getByTaskId }, (err, resp) => {
    if (err) {
    } else {
      res.send({ error: false, message: 'fetch success', result: resp });
    }
  });
};

export const inActiveQuestion = (req, res, next) => {
  console.log(req.params);
  Questions.update(
    { _id: req.params.id },
    { status: 'inActive' },
    (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        show(req, res, next);
      }
    }
  );
};
