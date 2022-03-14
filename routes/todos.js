const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const moment = require('moment');
const tz = require('moment-timezone');
const Todo = require('../models/todo');
const User = require('../models/user');


const profileIdGetter = async (authKey) => {
  const profile = await User.findOne({'authKey': authKey});
  return profile ? profile._id : null;
};


router.get('/appName', (req, res) => {
  res.send({appName: 'СПИСОК ЗАДАЧ'});
});

router.get('/status', (req, res) => {
  res.send({status: true});
});

router.get('/todos', async (req, res) => {
  if (req?.query?.authKey) {
    const profileId = await profileIdGetter(req.query.authKey);
    if (profileId) {
      try {
        const todos = await Todo.find({'profileId': profileId}).sort({_id: -1});
        res.send({
          status: 'Loaded',
          todos: todos,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      res.send({
        status: 'Auth Fail',
      });
    }
  } else {
    res.send({
      status: 'Empty authKey',
    });
  }
});

router.get('/done-todos', async (req, res) => {
  if (req?.query?.authKey) {
    const profileId = await profileIdGetter(req.query.authKey);
    const offset = Number(req.query.offset);
    const query = req.query.query
    if (profileId) {
      try {
        const todos = await Todo
            .find({'profileId': profileId, 'isDone': true, 'title': new RegExp(`${query}`, 'i')})
            .sort({_id: -1})
            .limit(offset);
        res.send({
          status: 'Loaded',
          doneTodos: todos,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      res.send({
        status: 'Auth Fail',
      });
    }
  } else {
    res.send({
      status: 'Empty authKey',
    });
  }
});

router.post('/todos', async (req, res) => {
  if (req?.body?.title && req?.body?.authKey) {
    const date = moment();
    const currentDate = date.tz('Asia/Yekaterinburg');
    const profileId = await profileIdGetter(req.body.authKey);
    if (profileId) {
      try {
        let newTodo = new Todo({
          title: req.body.title,
          isDone: false,
          created: currentDate,
          profileId: profileId,
        });
        const savedTodo = await newTodo.save();
        res.send({
          status: 'Created',
          savedTodo: savedTodo,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      res.send({
        status: 'Auth Fail',
      });
    }
  } else if (!req?.body?.title) {
    res.send({
      status: 'Empty title',
    });
  } else if (!req?.body?.authKey) {
    res.send({
      status: 'Empty authKey',
    });
  }
});

router.post('/todo-done', async (req, res) => {
  if (req?.body?.id && req?.body?.authKey) {
    const profileId = await profileIdGetter(req.body.authKey);
    if (profileId) {
      try {
        const updateStatus = await Todo.updateOne({
          '_id': req.body.id,
          'profileId': profileId,
        }, {'isDone': req.body.isDone});
        const modifidedTodo = await Todo.findById(req.body.id);
        if (updateStatus.nModified) {
          res.send({
            status: 'Modified',
            modifidedTodo: modifidedTodo,
          });
        } else {
          res.send({
            status: 'Fail',
          });
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      res.send({
        status: 'Auth Fail',
      });
    }
  } else if (!req?.body?.id) {
    res.send({
      status: 'Empty id',
    });
  } else if (!req?.body?.authKey) {
    res.send({
      status: 'Empty authKey',
    });
  }
});

router.post('/todo-edit', async (req, res) => {
  if (req?.body?.id && req?.body?.newTitle && req?.body?.authKey) {
    const profileId = await profileIdGetter(req.body.authKey);
    if (profileId) {
      try {
        const updateStatus = await Todo.updateOne({
          '_id': req.body.id, 'profileId': profileId,
        }, {'title': req.body.newTitle});
        const modifidedTodo = await Todo.findById(req.body.id);
        if (updateStatus.nModified) {
          res.send({
            status: 'Modified',
            modifidedTodo: modifidedTodo,
          });
        } else {
          res.send({
            status: 'Fail',
          });
        }

      } catch (err) {
        console.error(err);
      }
    } else {
      res.send({
        status: 'Auth Fail',
      });
    }
  } else if (!req?.body?.id) {
    res.send({
      status: 'Empty id',
    });
  } else if (!req?.body?.newTitle) {
    res.send({
      status: 'Empty newTitle',
    });
  } else if (!req?.body?.authKey) {
    res.send({
      status: 'Empty authKey',
    });
  }
});

router.delete('/todos', async (req, res) => {
  if (req?.body?.id && req?.body?.authKey) {
    const profileId = await profileIdGetter(req.body.authKey);
    if (profileId) {
      try {
        const removedTodo = await Todo.deleteOne({_id: req.body.id});
        if (removedTodo['deletedCount'] === 1) {
          res.send({
            message: `Todo with id ${req.body.id} was delete successfully`,
            status: 'Deleted',
          });
        } else {
          res.send({
            message: `Todo with id ${req.body.id} was NOT deleted`,
            status: 'Fail',
          });
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      res.send({
        status: 'Auth Fail',
      });
    }
  } else if (!req?.body?.id) {
    res.send({
      status: 'Empty id',
    });
  } else if (!req?.body?.authKey) {
    res.send({
      status: 'Empty authKey',
    });
  }
});

router.post('/register', async (req, res) => {

  if (req?.body?.email && req?.body?.password && req?.body?.name) {
    const checkUserRegistration = await User.findOne({'email': req.body.email});
    if (!checkUserRegistration) {
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      try {
        const savedUser = await newUser.save();
        res.send({
          status: 'Created',
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      res.send({
        status: 'Already exist',
      });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    if (req?.body?.email && req?.body?.password) {
      const foundUser = await User.findOne(
          {
            'email': req.body.email,
            'password': req.body.password,
          },
      );

      if (!foundUser) {
        const checkUserRegistration = await User.findOne({'email': req.body.email});
        if (checkUserRegistration) {
          res.send({
            status: 'Wrong password',
          });
        } else {
          res.send({
            status: 'No user',
          });
        }
      } else if (foundUser && foundUser.authKey) {
        res.send({
          status: 'Authorize success',
          authKey: foundUser?.authKey,
          name: foundUser?.name,
        });
      } else if (foundUser && !foundUser.authKey) {
        const setUserAuthKey = await User.findOneAndUpdate({'email': req.body.email}, {'authKey': uuid.v1()});
        const modifiedUser = await User.findOne({'email': req.body.email});
        res.send({
          status: 'Authorize success1',
          authKey: modifiedUser?.authKey,
          name: modifiedUser?.name,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;