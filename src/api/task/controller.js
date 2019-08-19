import Task from './model';
import { cloneDeep } from 'lodash';
import fs from 'fs';
import { BASE_URL } from '../../config';

export const createTask = (req, res, next) => {
  if (req.body.taskType === 'Video' || req.body.taskType === 'Document') {
    const clonedData = cloneDeep(req.body);
    clonedData.content = '';
    Task.create(clonedData, (err, resp) => {
      if (err) {
      } else {
        const dir = `${__dirname}/temp`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        console.log(resp, 'resp');
        let base64Image = req.body.content.split(';base64,').pop();
        fs.writeFile(
          `${__dirname}/temp/${resp._id}.${req.body.fileType}`,
          base64Image,
          { encoding: 'base64' },
          (err, result) => {
            if (err) {
            } else {
              Task.findOneAndUpdate(
                { _id: resp._id },
                {
                  $set: {
                    content: `${BASE_URL}${resp._id}.${req.body.fileType}`
                  }
                },
                { new: true },
                (err, result) => {
                  if (err) {
                  } else {
                    showTasks(req, res, next);
                  }
                }
              );
            }
          }
        );
      }
    });
  } else {
    Task.create(req.body, (err, resp) => {
      if (err) {
      } else {
        showTasks(req, res, next);
      }
    });
  }
};

export const updateTask = (req, res, next) => {
  Task.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { upsert: false },
    (err, resp) => {
      if (err) {
      } else {
        showTasks(req, res, next);
      }
    }
  );
};

export const showTasks = (req, res, next) => {
  Task.find({ status: 'Active' })
    .sort({ _id: -1 })
    .exec((err, resp) => {
      if (err) {
      } else {
        // const updatedResult = resp.map(tasks => {
        //   return new Promise(resolve => {
        //     if (tasks.taskType === 'Video' || tasks.taskType === 'Document') {
        //       const base64 = fs.readFileSync(
        //         `${__dirname}/temp/${tasks._id}.${tasks.fileType}`,
        //         {
        //           encoding: 'base64'
        //         }
        //       );
        //       if (tasks.taskType === 'Video') {
        //         tasks.content = `data:video/${tasks.fileType};base64,${base64}`;
        //         resolve(tasks);
        //       }
        //     }
        //     resolve(tasks);
        //   });
        // });
        // Promise.all(updatedResult).then(updatedData => {
        //   console.log(updatedData, 'updatedData');
        //   res.send({
        //     error: false,
        //     message: 'fetch success',
        //     result: updatedData
        //   });
        // });
        res.send({
          error: false,
          message: 'fetch success',
          result: resp
        });
      }
    });
};

export const checkAndInsertBulk = (req, res, next) => {
  const duplicatesFound = [];
  const promises = req.body.map(eachTask => {
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
            });
          } else {
            Task.findOneAndUpdate(
              { number: eachTask.number },
              eachTask,
              (err, resp) => {
                if (err) {
                } else {
                  resolve({});
                }
              }
            );
          }
        } else {
          resolve({});
          // Promise.resolve({});
        }
      });
    });
  });
  Promise.all(promises)
    .then(() => {
      console.log(promises);
      res.send({
        error: false,
        message: 'insertion successful',
        result: duplicatesFound
      });
    })
    .catch(() => {
      console.log(promises);
    });
};

export const inActiveTask = (req, res, next) => {
  console.log(req.params);
  Task.update({ _id: req.params.id }, { status: 'inActive' }, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      showTasks(req, res, next);
    }
  });
};
