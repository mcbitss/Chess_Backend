import TaskMapping from './model';
import Task from '../task/model';
import { remove, maxBy, cloneDeep } from 'lodash';
import { showTasks } from '../task/controller';

export const createTaskMapped = (req, res, next) => {
  TaskMapping.find({
    username: req.body.username,
    taskStatus: { $in: ['Assigned'] }
  })
    .sort({ sequencenumber: -1 })
    .exec()
    .then(resp => {
      console.log(resp, 'resp');
      const clonedObj = cloneDeep(req.body);
      clonedObj.taskStatus = resp.length === 0 ? 'Assigned' : 'Upcoming';
      TaskMapping.create(clonedObj, (err, resp) => {
        if (err) {
          console.log(err, 'err');
        } else {
          showTasksMapped(req, res, next);
        }
      });
    });
};

export const updateTaskMapping = (req, res, next) => {
  TaskMapping.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { upsert: false },
    (err, resp) => {
      if (err) {
      } else {
        showTasksMapped(req, res, next);
      }
    }
  );
};

export const createTaskMappedByUser = (req, res, next) => {
  const user = req.params.userId ? req.params.userId : req.body.username;
  TaskMapping.findOne({ username: user, taskStatus: 'Assigned' })
    .sort({ sequencenumber: 1 })
    .exec((err, resp) => {
      if (err) {
      } else {
        if (resp === null) {
          TaskMapping.find({ username: user })
            .sort({ sequencenumber: -1 })
            .limit(2)
            .populate('task')
            .exec((err, result) => {
              if (err) {
              } else {
                res.send({
                  error: false,
                  message: 'fetch success',
                  result: result
                });
              }
            });
        } else {
          const currentSequence = resp.sequencenumber;
          const lte =
            (currentSequence === 1 && 5) ||
            (currentSequence === 2 && 5) ||
            currentSequence + 2;
          const gte = currentSequence - 2;
          TaskMapping.find({
            username: user,
            sequencenumber: { $lte: lte, $gte: gte }
          })
            .populate('task')
            .exec((err, result) => {
              if (err) {
              } else {
                res.send({
                  error: false,
                  message: 'fetch success',
                  result: result
                });
              }
            });
        }
      }
    });
};

export const showCompletedTasksMapped = (req, res, next) => {
  TaskMapping.find({ username: req.params.userId, taskStatus: 'Completed' })
    .sort({ sequencenumber: -1 })
    .populate('task')
    .exec((err, resp) => {
      if (err) {
      } else {
        res.send({ error: false, message: 'fetch success', result: resp });
      }
    });
};

export const showTasksMappedToUser = (req, res, next) => {
  TaskMapping.find({ username: req.params.userId })
    .sort({ sequencenumber: 1 })
    .populate('task')
    .exec((err, resp) => {
      if (err) {
      } else {
        res.send({ error: false, message: 'fetch success', result: resp });
      }
    });
};

export const showTasksMapped = (req, res, next) => {
  TaskMapping.find({})
    .sort({ _id: -1 })
    .exec((err, resp) => {
      if (err) {
      } else {
        res.send({ error: false, message: 'fetch success', result: resp });
      }
    });
};

export const update = (req, res, next) => {
  const { body } = req;
  TaskMapping.findOneAndUpdate(
    { username: body.username, sequencenumber: body.sequencenumber },
    body,
    { upsert: false, new: true },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        TaskMapping.findOneAndUpdate(
          { username: body.username, sequencenumber: body.sequencenumber + 1 },
          { taskStatus: 'Assigned' },
          { upsert: false, new: true },
          (err, result) => {
            if (err) {
            } else {
              next();
            }
          }
        );
      }
    }
  );
};

export const createTaskByUserMapping = (req, res, next) => {
  const { body } = req;
  const promises = body.users.map(user => {
    return new Promise((resolve, reject) => {
      TaskMapping.find(
        {
          username: user,
          $or: [{ taskStatus: 'Completed' }, { taskStatus: 'Cancelled' }]
        },
        (err, resp) => {
          if (err) {
            reject(err);
          } else {
            Task.find({ _id: { $in: body.tasks } })
              .sort({ number: 1 })
              .exec(async (err, taskData) => {
                if (err) {
                } else {
                  // const updatedtasks = resp.map((data, ind) => {
                  //   data.sequencenumber = ind + 1;
                  //   return data;
                  // });
                  const updatedtasks = [];
                  const allMappings = await TaskMapping.find({});
                  const objectWithUserKeysForSequenceNumber = {};
                  allMappings.map(sequenceNumberObject => {
                    if (
                      objectWithUserKeysForSequenceNumber[
                        sequenceNumberObject.username
                      ] === undefined
                    ) {
                      objectWithUserKeysForSequenceNumber[
                        sequenceNumberObject.username
                      ] = [];
                    }
                    objectWithUserKeysForSequenceNumber[
                      sequenceNumberObject.username
                    ].push(sequenceNumberObject);
                    return null;
                  });
                  let counter = 1;
                  let obj = {};
                  taskData.map((task, ind) => {
                    let maxSequencceNumber = 0;
                    if (objectWithUserKeysForSequenceNumber[user]) {
                      const maxSequencceNumberObj = maxBy(
                        objectWithUserKeysForSequenceNumber[user],
                        'sequencenumber'
                      );
                      maxSequencceNumber = maxSequencceNumberObj.sequencenumber;
                      obj = objectWithUserKeysForSequenceNumber[user].find(
                        o => o.taskStatus === 'Assigned'
                      );
                    }
                    console.log(obj, 'obj');
                    updatedtasks.push({
                      username: user,
                      task: task._id,
                      sequencenumber: maxSequencceNumber + counter,
                      taskStatus:
                        (!obj || Object.keys(obj).length === 0) && ind === 0
                          ? 'Assigned'
                          : 'Upcoming'
                    });
                    counter += 1;
                  });

                  console.log(updatedtasks, 'updatedtasks');
                  resolve(updatedtasks);
                }
              });
          }
        }
      );
    });
  });
  Promise.all(promises).then(userTasks => {
    userTasks.map(tasks => {
      tasks.map((data, index) => {
        TaskMapping.create(
          {
            username: data.username,
            task: data.task,
            sequencenumber: data.sequencenumber,
            startDate: new Date(),
            taskStatus: data.taskStatus
          },
          (err, resp) => {
            if (err) {
            } else {
              // res.send(resp)
            }
          }
        );
      });
    });
    showTasksMapped(req, res, next);
  });
};

export const fetchUsersAssignment = (req, res, next) => {
  TaskMapping.find({
    username: { $in: req.body },
    taskStatus: { $in: ['Assigned', 'Upcoming'] }
  })
    .populate('task')
    .exec((err, result) => {
      if (err) {
        res.send({ error: true, messgage: '', result: [] });
      } else {
        res.send({ error: false, messgage: 'fetch successful', result });
      }
    });
};

export const bulkAssignment = (req, res, next) => {
  const updatedArray = remove(req.body, function(n) {
    return n._id === undefined || n._id === null;
  });
  TaskMapping.insertMany(updatedArray, (err, resp) => {
    if (err) {
    } else {
      showTasksMapped(req, res, next);

      req.body.map(mappingData => {
        if (mappingData.taskStatus === 'Assigned') {
          TaskMapping.findOneAndUpdate(
            {
              _id: mappingData._id
            },
            { $set: { taskStatus: 'Assigned' } },
            { new: true, upsert: false },
            (err, resp) => {
              if (err) {
              } else {
              }
            }
          );
        }
      });
    }
  });
};
