const clientError = (req, res) => {
    res.status(404).send({
        message: 'not a valid route'
    });
};
const serverError = (error, req, res, next) => {
    res.status(500).send({
        message: error.message
    });
};

module.exports = { clientError, serverError };
