// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Action = require('./actions-model');

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error retrieving the actions' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Action.get(id)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: 'There is no action with that id' })
            }
            res.status(200).json(action);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error retrieving the action' })
        })
})


// Start fixing here
router.post('/', (req, res) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: 'Action must have a project id, description, and notes' });
    }
    Action.insert(req.body)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: 'There are no projects with that id' })
            }
            res.status(201).json(action);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error creating the action and/or the project_id is not valid' })
        })
})

router.put('/:id', (req, res) => {
    if(!req.body) {
        res.status(400).json({ message: 'Action must be provided' });
    }
    const { id } = req.params;
    Action.update(id, req.body)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: 'There are no actions with that id' })
            }
            res.status(200).json(action);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error updating the action' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Action.remove(id)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: 'There are no actions with that id'})
            }
            res.status(204);
        })
        .catch(() => {
            res.status(500).json({ message: 'Error deleting the action' })
        })
})

module.exports = router;
