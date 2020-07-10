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


module.exports = router;