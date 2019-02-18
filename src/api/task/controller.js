import Task from './model';

export const createTask = (req, res, next) => {
  Task.create(req.body, (err, resp) => {
    if (err) {

    } else {
      showTasks(req, res, next);
    }
  });
}

export const updateTask = (req, res, next) => {
  Task.findOneAndUpdate({ '_id': req.params.id }, req.body, { upsert: false }, (err, resp) => {
    if (err) {

    } else {
      showTasks(req, res, next);
    }
  });
}

export const showTasks = (req, res, next) => {
  Task.find({}).sort({ _id: -1 }).exec((err, resp) => {
    if (err) {

    } else {
      res.send({ error: false, message: 'fetch success', result: resp });
    }
  });
}

export const checkAndInsertBulk = (req, res, next) => {
 const duplicatesFound = [];
 const promises = req.body.map((eachTask) => {
   return new Promise((resolve, reject) => {
      Task.findOne({ number: eachTask.number }, (err, resp) => {
         if (!err) {
           if (!resp) {
             Task.create(eachTask, (err, resp) => {
               if (err) {
                 console.log(err, eachTask);
                 resolve({});
                // resolve({});
               } else {
                 console.log(err, eachTask);
                 resolve({});
               }
             })
           } else {
             Task.findOneAndUpdate({ number: eachTask.number }, eachTask,  (err, resp) => {
                if (err) {

                } else {
                  resolve({});
                }
             });
           }
         } else {
          resolve({});
          // Promise.resolve({});
         }
      });
   });
  })
  Promise.all(promises).then(() => {
    console.log(promises);
    res.send({ error: false, message: 'insertion successful', result: duplicatesFound });
  }).catch(() => {
    console.log(promises);
  })
}