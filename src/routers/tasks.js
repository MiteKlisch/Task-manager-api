const express = require('express');
const Tasks = require('../models/tasks');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    // const tasks = new Tasks(req.body);
    const tasks = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try {
        await tasks.save();
        res.status(201).send(tasks)
    } catch (error) {
        res.status(400).send(error);
    }

});

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    
    try {
        //const tasks = await Tasks.find({owner: req.user._id});
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(404).send(error)
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
   
    try {
        // const task = await Tasks.findById(_id);
        const task = await Tasks.findOne({ _id, owner: req.user._id })

        if (!task) {
          return res.status(404).send('Not found');
        }
        res.send(task);
    } catch (error) {
        res.status(404).send(error)
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid update!'})
    }

    try {
        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id });
        
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        //const task = await Tasks.findByIdAndUpdate( req.params.id, req.body, {new: true, runValidators: true} );
        if (!task) {
            res.status(404).send()
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Tasks.findByIdAndDelete(req.params.id);
        const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send('Not found');
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;