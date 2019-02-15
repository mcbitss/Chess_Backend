import TaskMapping from './model';

export const createTaskMapped = (req, res, next) => {
  TaskMapping.create(req.body, (err, resp) => {
    if (err) {

    } else {
      showTasksMapped(req, res, next);
    }
  });
}

export const updateTaskMapping = (req, res, next) => {
  TaskMapping.findOneAndUpdate({ '_id': req.params.id }, req.body, { upsert: false }, (err, resp) => {
    if (err) {

    } else {
      showTasksMapped(req, res, next);
    }
  });
}

export const createTaskMappedByUser = (req, res, next) => {
  TaskMapping.findOne({ "username": req.params.userId, 'taskStatus': 'Assigned'}).exec((err, resp) => {
    if (err) {} 
    else {
      const currentSequence = resp.sequencenumber;
      const lte = currentSequence === 1 && 5 || currentSequence === 2 && 5 ||  currentSequence + 2;
      const gte = currentSequence - 2;
      TaskMapping.find({ "username": req.params.userId, 'sequencenumber': { $lte: lte,  $gte: gte, }}).populate('username').populate('task').exec((err, result) => {
        if (err) {} 
        else {
          res.send({ error: false, message: 'fetch success', result: result });
        }
      });
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

export const update = (req, res, next) => {
  const { body } = req;
  TaskMapping.findOne({'username': body.username, 'sequencenumber':body.sequencenumber}, body, {upsert: false, new: true}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });  
}