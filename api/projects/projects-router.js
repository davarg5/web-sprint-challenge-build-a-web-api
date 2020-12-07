// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error retrieving the projects' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Project.get(id)
        .then(project => {
            if(!project) {
                res.status(404).json({ message: 'There are no projects with that id' })
            }
            else {
                res.status(200).json(project);
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Error retrieving the project' })
        })
})

router.post('/', (req, res) => {
    if(!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Project must have a name and description' });
    }
    else {
        Project.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error creating the project' })
        })
    }
})

router.put('/:id', (req, res) => {
    if(!req.body.name && !req.body.description) {
        res.status(400).json({ message: 'Project must be provided'})
    }
    else {
        const { id } = req.params;
        const changes = req.body;
        Project.update(id, changes)
        .then(project => {
            if(!project) {
                res.status(404).json({ message: 'There are no projects with that id'})
            }
            else {
                res.status(200).json(project);
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Error updating the project' })
        })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Project.remove(id)
        .then(project => {
            if(!project) {
                res.status(404).json({ message: 'There are no projects with that id'})
            }
            else {
                res.status(204).json({});
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'Error deleting the project' })
        })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error fetching the actions' })
        })
})

module.exports = router; 