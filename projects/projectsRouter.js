const express = require("express");
const projectDb = require("../data/helpers/projectModel");
const { validateProject } = require("./projectsMiddleware");

const router = express.Router();


// Get a project by id

router.get("/:id", (req, res) => {
    projectDb.get(req.params.id)
        .then(project => {
            if (project === null) {
                res.status(404).json({
                    error: `Project with ID ${req.params.id} doesn't exist`
                });
            }

            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get the project.",
                description: error
            });
        });
});


// Add a project

router.post("/", validateProject, (req, res) => {
    projectDb.insert({
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed ? true : false
    })
    .then(project => {
        res.status(201).json(project);
    })
    .catch(error => {
        res.status(500).json({
            error: "Server error. Could not add the project.",
            description: error
        });
    });
});


// Update a project

router.put("/:id", validateProject, (req, res) => {
    projectDb.update(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed ? true : false
    })
    .then(project => {
        if (project === null) {
            res.status(404).json({
                error: `Project with ID ${req.params.id} doesn't exist`
            });
        }
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json({
            error: "Server error. Could not update the project.",
            description: error
        });
    });
});


// Remove a project from the db

router.delete("/:id", (req, res) => {
    projectDb.remove(req.params.id)
        .then(count => {
            if (count) {
                res.status(200).json({
                    id: req.params.id,
                    message: "The project has been removed"
                });
            } else {
                res.status(404).json({
                    error: "Could not remove the project"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not remove the project.",
                description: error
            });
        });
});


// Get all actions by project_id

router.get("/:id/actions", (req, res) => {
    projectDb.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({
                error: "Server error. Could not get actions.",
                description: error
            });
        });
});


module.exports = router;