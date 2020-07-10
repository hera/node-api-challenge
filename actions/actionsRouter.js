const express = require("express");
const actionDb = require("../data/helpers/actionModel");

const router = express.Router();


// Get an action by project id

router.get("/:id", (req, res) => {
    actionDb.get(req.params.id)
        .then(action => {
            if (action === null) {
                res.status(404).json({
                    error: `Project with ID ${req.params.id} doesn't exist`
                });
            }

            res.status(200).json(action);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get the action.",
                description: error
            });
        });
});


module.exports = router;