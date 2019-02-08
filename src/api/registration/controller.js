import Registration from './model'

export const createRegistration = (req, res) => {
    console.log(req.body)
Registration.create(req.body, (err, resp) => {
    if (err) {
        console.log(err, 'err')
    res.send({
        error: true,
        message: 'Internal Server Error',
        original: err
    });
    } else {
    res.send({
        error: false,
        message: 'Registered successfully',
        registration: resp.view()
    });
    }
});
};

export const getRegisterData = (req, res) => {
Registration.find((err, resp) => {
    if (err) {
    res.send({ error: true, original: err });
    } else {
    res.send({ error: false, registration: resp });
    }
});
};