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
  console.log('antony', 'checking', req.body, req.params)
  const user = req.params.userId ? req.params.userId : req.body.username;
  TaskMapping.findOne({ "username": user, 'taskStatus': 'Assigned'}).exec((err, resp) => {
    if (err) {} 
    else {
      if(resp === null){
        TaskMapping.find({ "username": user}).populate('username').sort({'sequencenumber': -1}).limit(2).populate('task').exec((err, result) => {
          if (err) {} 
          else {
            res.send({ error: false, message: 'fetch success', result: result });
          }
        });
      }else{
        const currentSequence = resp.sequencenumber;
        const lte = currentSequence === 1 && 5 || currentSequence === 2 && 5 ||  currentSequence + 2;
        const gte = currentSequence - 2;
        TaskMapping.find({ "username": user, 'sequencenumber': { $lte: lte,  $gte: gte, }}).populate('username').populate('task').exec((err, result) => {
          if (err) {} 
          else {
            res.send({ error: false, message: 'fetch success', result: result });
          }
        });
      }
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
  TaskMapping.findOneAndUpdate({'username': body.username, 'sequencenumber':body.sequencenumber}, body, {upsert: false, new: true}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      TaskMapping.findOneAndUpdate({'username': body.username, 'sequencenumber':body.sequencenumber + 1}, {taskStatus:'Assigned'}, {upsert: false, new: true}, (err, result) => {
        if (err) {
          // res.send(err);
        } else {
          next()
          // console.log('antony', 'hello')
        }
      });  
    }
  });  
}