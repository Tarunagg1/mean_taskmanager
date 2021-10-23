const router = require('express').Router();
const { list, task } = require('../models');


router.get('/list', (req, res) => {
    list.find({})
        .then((list) => {
            return res.status(200).json(list);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.get('/list/:id', (req, res) => {
    list.findById(req.params.id)
        .then((list) => {
            return res.status(200).json(list);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.post('/list', (req, res) => {
    const { title } = req.body;

    const newList = new list({ title });
    newList.save()
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })

})

router.patch('/list/:id', (req, res) => {
    const { id } = req.params;
    list.findByIdAndUpdate(id, {
        $set: req.body
    }, { new: true })
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.delete('/list/:id', (req, res) => {
    list.findByIdAndRemove(id)
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})


// task

router.get('/list/:listid/task', (req, res) => {
    task.find({ listid: req.params.listid })
        .then((list) => {
            return res.status(200).json(list);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.post('/list/:listid/task', (req, res) => {
    const { title } = req.body;
    const { listid } = req.params;
    const newTask = new task({ title, listid });
    newTask.save()
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })

})

router.patch('/list/:listid/task/:taskid', async (req, res) => {
    const { listid, taskid } = req.params;    
    task.findByIdAndUpdate({ listid, _id: taskid }, {...req.body},{ new: true })
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.delete('/list/:listid/task/:taskid',(req, res) => {
    const { listid, taskid } = req.params;
    
    task.findOneAndRemove({ listid, _id: taskid })
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.get('/list/:listid/task/taskid', (req, res) => {
    task.findOne({ listid: req.params.listid, _id: req.params.taskid })
        .then((list) => {
            return res.status(200).json(list);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})


// authorize
router.post('/login', (req, res) => {

})

router.post('/register', (req, res) => {

})




module.exports = router;