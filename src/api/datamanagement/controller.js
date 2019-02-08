import DataManagement from './model';

export const createDataManagement = (req, res) => {
    DataManagement.create(req.body, (err, resp) => {
      if (err) {
        res.send({
          error: true,
          message: 'Internal Server Error',
          original: err
        });
      } else {
        res.send({
          error: false,
          message: 'Record Created Successfully',
          dataManagement: resp.view()
        });
      }
    });
  };

  export const getQuizData = (req, res) => {
    DataManagement.find((err, resp) => {
      if (err) {
        res.send({ error: true, original: err });
      } else {
        res.send({ error: false, dataManagement: resp });
      }
    });
  };