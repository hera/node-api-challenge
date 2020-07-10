
function validateAction (req, res, next) {
    if (
        req.body.project_id &&
        req.body.description &&
        req.body.description.length <= 128 &&
        req.body.notes
    ) {
        next();
    } else {
        res.status(400).json({
            error: "Please provide valid project_id, notes and description."
        });
    }
}

module.exports = {
    validateAction
}