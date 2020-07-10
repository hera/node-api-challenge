const express = require("express");
const actionDb = require("../data/helpers/actionModel");
const { validateAction } = require("../actions/actionsMiddleware");

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


// Add an action

router.post("/", validateAction, (req, res) => {
    actionDb.insert({
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed ? true : false
    })
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


// Update an action

router.put("/:id", validateAction, (req, res) => {
    actionDb.update(req.params.id, {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed ? true : false
    })
    .then(action => {
        if (action === null) {
            res.status(404).json({
                error: `Action with ID ${req.params.id} doesn't exist`
            });
        }
        res.status(200).json(action);
    })
    .catch(error => {
        res.status(500).json({
            error: "Server error. Could not update the action.",
            description: error
        });
    });
});


// Remove an action from the db

router.delete("/:id", (req, res) => {
    actionDb.remove(req.params.id)
    .then(count => {
        if (count) {
            res.status(200).json({
                id: req.params.id,
                message: "The action has been removed"
            });
        } else {
            res.status(404).json({
                error: "Not found. Could not remove the action"
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Server error. Could not remove the action.",
            description: error
        });
    });
});


module.exports = router;