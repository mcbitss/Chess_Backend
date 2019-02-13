import TaskMapping from './model';

export const createTaskMapped = (req, res, next) => {
  TaskMapping.create(req.body, (err, resp) => {
    if (err) {

    } else {
      showTasksMapped(req, res, next);
    }
  });
}

export const createTaskMappedByUser = (req, res, next) => {
  TaskMapping.find({ "username": req.params.userId }).populate('username').populate('task').exec((err, resp) => {
    if (err) {

    } else {
      res.send({ error: false, message: 'fetch success', result: resp });
    }
  });
}

export const showTasksMapped = (req, res, next) => {
    TaskMapping.find({}, (err, resp) => {
    if (err) {

    } else {
      res.send({ error: false, message: 'fetch success', result: resp });
    }
  });
}