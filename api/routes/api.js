const router = require('express').Router();
const { verifyRefreshToken, authentcateTOken } = require('../middleware/validateToken');
const { list, task, user } = require('../models');


router.get('/list', authentcateTOken, (req, res) => {
    list.find({ userid: req.user._id })
        .then((list) => {
            return res.status(200).json(list);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.get('/list/:id', authentcateTOken, (req, res) => {
    list.findById(req.params.id)
        .then((list) => {
            return res.status(200).json(list);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.post('/list', authentcateTOken, (req, res) => {
    const { title } = req.body;
    const userid = req.user._id;
    const newList = new list({ userid, title });
    newList.save()
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })

})

router.patch('/list/:id', authentcateTOken, (req, res) => {
    const { id } = req.params;
    list.findOneAndUpdate({ _id: id, userid: req.user._id }, {
        $set: req.body
    }, { new: true })
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})

router.delete('/list/:id', authentcateTOken, (req, res) => {
    const { id } = req.params;
    list.findOneAndRemove({ _id: id, userid: req.user._id })
        .then((resp) => {
            task.deleteMany({ id })
                .then(() => {
                    console.log('task deleted');
                    return res.status(200).json(resp);
                })
        })
        .catch((err) => {
            return res.status(200).json(err);
        })
})


// task

router.get('/list/:listid/task', authentcateTOken, (req, res) => {
    list.findOne({ _id: req.params.listid, userid: req.user._id })
        .then((list) => {
            if (list) {
                return true;
            }
            return false;
        }).then((iscreateTask) => {
            if (iscreateTask) {
                task.find({ listid: req.params.listid })
                    .then((list) => {
                        return res.status(200).json(list);
                    })
                    .catch((err) => {
                        return res.status(200).json(err);
                    })
            } else {
                return res.status(404).json({ message: "Not found" });
            }
        })

})

router.post('/list/:listid/task', authentcateTOken, (req, res) => {
    const { title } = req.body;
    const { listid } = req.params;

    list.findOne({ _id: listid, userid: req.user._id })
        .then((list) => {
            if (list) {
                return true;
            }
            return false;
        }).then((iscreateTask) => {
            if (iscreateTask) {
                const newTask = new task({ title, listid });
                newTask.save()
                    .then((resp) => {
                        return res.status(200).json(resp);
                    })
                    .catch((err) => {
                        return res.status(200).json(err);
                    })
            } else {
                return res.status(404).json({ message: "Not found" });
            }
        })
})

router.patch('/list/:listid/task/:taskid', authentcateTOken, async (req, res) => {
    const { listid, taskid } = req.params;
    list.findOne({ _id: listid, userid: req.user._id })
        .then((list) => {
            if (list) {
                return true;
            }
            return false;
        }).then((iscreateTask) => {
            if (iscreateTask) {
                task.findByIdAndUpdate({ listid, _id: taskid }, { ...req.body }, { new: true })
                    .then((resp) => {
                        return res.status(200).json(resp);
                    })
                    .catch((err) => {
                        return res.status(200).json(err);
                    })
            } else {
                return res.status(404).json({ message: "Not found" });
            }
        })

})

router.delete('/list/:listid/task/:taskid', authentcateTOken, (req, res) => {
    const { listid, taskid } = req.params;
    list.findOne({ _id: listid, userid: req.user._id })
        .then((list) => {
            if (list) {
                return true;
            }
            return false;
        }).then((iscreateTask) => {
            if (iscreateTask) {
                task.findOneAndRemove({ listid, _id: taskid })
                    .then((resp) => {
                        return res.status(200).json(resp);
                    })
                    .catch((err) => {
                        return res.status(200).json(err);
                    })
            } else {
                return res.status(404).json({ message: "Not found" });
            }
        })
})

router.get('/list/:listid/task/taskid', authentcateTOken, (req, res) => {
    list.findOne({ _id: listid, userid: req.user._id })
        .then((list) => {
            if (list) {
                return true;
            }
            return false;
        }).then((iscreateTask) => {
            if (iscreateTask) {
                task.findOne({ listid: req.params.listid, _id: req.params.taskid })
                    .then((list) => {
                        return res.status(200).json(list);
                    })
                    .catch((err) => {
                        return res.status(200).json(err);
                    })
            } else {
                return res.status(404).json({ message: "Not found" });
            }
        })
})


// authorization api's

router.post('/register', (req, res) => {
    let body = req.body;
    const newUser = new user(body);
    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken()
            .then((accessToken) => {
                return { accessToken, refreshToken }
            });
    }).then((authToken) => {
        res
            .header('x-refresh-token', authToken.refreshToken)
            .header('x-access-token', authToken.accessToken)
            .send(newUser)
    })
        .catch((err) => {
            return res.status(400).send(err);
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    user.findByCredentials(email, password)
        .then((userData) => {
            return userData.createSession().then((refreshToken) => {
                return userData.generateAccessAuthToken().then((accessToken) => {
                    return { accessToken, refreshToken }
                });
            }).then((authToken) => {
                res
                    .header('x-refresh-token', authToken.refreshToken)
                    .header('x-access-token', authToken.accessToken)
                    .send(userData)
            })
        }).catch((err) => {
            return res.status(400).send(err);
        })
})

router.get('/user/me/access-token', verifyRefreshToken, (req, res) => {
    req.userObject.generateAccessAuthToken()
        .then((authToken) => {
            return res.header('x-access-token', authToken.accessToken)
                .send(req.userObject);
        })
        .catch((err) => {
            return res.status(400).send(err);
        })
})



module.exports = router;