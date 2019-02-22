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
  const user = req.params.userId ? req.params.userId : req.body.username;
  TaskMapping.findOne({ "username": user, 'taskStatus': 'Assigned'}).exec((err, resp) => {
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
      TaskMapping.find({ "username": user}, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          const valueData = resp.map(val => val.task);
			    const tasks = body.tasks.filter((val) => {
            const flag = valueData.find(obj => obj.toString() === val.toString());
            if(!flag){
              return val
            }
          })
          const updatedtasks = tasks.map((task, ind) => { return {user: user, task: task, sequencenumber: (valueData.length + ind + 1)}})
          resolve(updatedtasks);
        }
      });    
    });
  })
  Promise.all(promises).then((userTasks) => {
   userTasks.map((tasks) => {
    tasks.map((data) => {
      TaskMapping.create({'username': data.user, task: data.task, 'sequencenumber': data.sequencenumber, 'startDate': new Date()}, (err, resp) => {
        if (err) {
        } else {
          // res.send(resp)
        }
      });
    })
   })
  });
}

