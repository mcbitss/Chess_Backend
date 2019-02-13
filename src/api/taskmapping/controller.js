import TaskMapping from './model';

export const showTasks = (req, res, next) => {
    TaskMapping.find({}, (err, resp) => {
    if (err) {

    } else {
      res.send({ error: false, message: 'fetch success', result: resp });
    }
  });
}