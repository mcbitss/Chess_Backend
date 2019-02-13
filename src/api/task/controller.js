import Task from './model';

export const createTask = (req, res, next) => {
  Task.create(req.body, (err, resp) => {
    if (err) {

    } else {
      showTasks(req, res, next);
    }
  });
}

export const showTasks = (req, res, next) => {
  Task.find({}, (err, resp) => {
    if (err) {

    } else {
      res.send({ error: false, message: 'fetch success', result: resp });
    }
  });
}