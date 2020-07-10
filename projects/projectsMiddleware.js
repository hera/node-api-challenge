
function validateProject (req, res, next) {

    if (req.body.name && req.body.description) {
        next();
    } else {
        res.status(400).json({
            error: "Please provide valid name and description."
        });
    }

}

module.exports = {
    validateProject
}