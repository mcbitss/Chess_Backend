import TaskMapping from './model';
import Task from '../task/model';

export const createTaskMapped = (req, res, next) => {
  TaskMapping.find({ username: req.body.username, taskStatus: { $in: ['Upcoming', 'Assigned'] } }).sort({ sequencenumber: -1 }).exec().then((resp) => {
     if (resp.length === 0) {
       req.body.sequencenumber = 1;
       req.body.taskStatus = 'Assigned';
     } else {
       req.body.sequencenumber = resp[0].sequencenumber + 1;
     }
     TaskMapping.create(req.body, (err, resp) => {
      if (err) {
  
      } else {
        showTasksMapped(req, res, next);
      }
    });
  })
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
  const user = req.params.userId ? req.params.userId : req.body.username;
  TaskMapping.findOne({ "username": user, 'taskStatus': 'Assigned'}).sort({'sequencenumber': 1}).exec((err, resp) => {
    if (err) {} 
    else {
      if(resp === null){
        TaskMapping.find({ "username": user}).sort({'sequencenumber': -1}).limit(2).populate('task').exec((err, result) => {
          if (err) {} 
          else {
            res.send({ error: false, message: 'fetch success', result: result });
          }
        });
      }else{
        const currentSequence = resp.sequencenumber;
        const lte = currentSequence === 1 && 5 || currentSequence === 2 && 5 ||  currentSequence + 2;
        const gte = currentSequence - 2;
        TaskMapping.find({ "username": user, 'sequencenumber': { $lte: lte,  $gte: gte, }}).populate('task').exec((err, result) => {
          if (err) {} 
          else {
            res.send({ error: false, message: 'fetch success', result: result });
          }
        });
      }
    }
  });
}

export const showCompletedTasksMapped = (req, res, next) => {
  TaskMapping.find({ "username": req.params.userId, taskStatus:'Completed'}).sort({'sequencenumber': -1}).populate('task').exec((err, resp) => {
  if (err) {

  } else {
    res.send({ error: false, message: 'fetch success', result: resp });
  }
});
}

export const showTasksMappedToUser = (req, res, next) => {
  TaskMapping.find({ "username": req.params.userId}).sort({'sequencenumber': 1}).populate('task').exec((err, resp) => {
  if (err) {

  } else {
    res.send({ error: false, message: 'fetch success', result: resp });
  }
});
}

export const showTasksMapped = (req, res, next) => {
    TaskMapping.find({}).sort({ _id: -1 }).exec((err, resp) => {
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
        } else {
          next()
        }
      });  
    }
  });  
}

export const createTaskByUserMapping = (req, res, next) => {
  const { body } = req;
  const promises = body.users.map(user => {
    return new Promise((resolve, reject) => {
      TaskMapping.find({ "username": user, $or: [ { taskStatus: 'Completed' }, { taskStatus: 'Cancelled'} ] }, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          Task.find({'_id' : {$in: body.tasks}}).sort({ number: 1 }).exec((err, taskData) => {
            if (err) {
            } else {
              TaskMapping.remove({username :user}, (err, respData) => {
                if (err) {}
                else {}
              });
              const updatedtasks = resp.map((data, ind) => { 
                data.sequencenumber = ind + 1;
                return data
              });
              taskData.map((task, ind) => { updatedtasks.push({username: user, task: task._id, sequencenumber: (updatedtasks.length + 1), taskStatus: ind === 0 ? 'Assigned' : 'Upcoming'})})
              resolve(updatedtasks);
            }
          });
        }
      });    
    });
  })
  Promise.all(promises).then((userTasks) => {
   userTasks.map((tasks) => {
    tasks.map((data) => {
      TaskMapping.create({'username': data.username, task: data.task, 'sequencenumber': data.sequencenumber, 'startDate': new Date(), taskStatus: data.taskStatus}, (err, resp) => {
        if (err) {
        } else {
          // res.send(resp)
        }
      });
    })
   })
  });
}

export const bulkAssignment = (req, res, next) => {
  TaskMapping.insertMany(req.body, (err, resp) => {
    if (err) {

    } else {
      showTasksMapped(req, res, next);
    }
  })
}
