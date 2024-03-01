const { User, Thought } = require('../models');

module.exports = {
async getUsers(req, res) {
  try {
    const getAllUsers = await User.find({});
    res.json(getAllUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async getSingleUser(req, res) {
  try {
    const getUser = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends');

    if (!getUser) {
      return res.status(404).json({ message: 'No user with that ID' })
    }

    res.json(getUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

async createUser(req, res) {
  try {
    const createUser = await User.create(req.body);
    res.json(createUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
},

async updateUser(req, res) {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { username: req.body.username, email: req.body.email } },
      { new: true }
      )

    if (!userUpdate) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(userUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteUser(req, res) {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });

    if (!deleteUser) {
      return res.status(404).json({ message: 'No such user exists' })
    }

    res.json({ message: 'user successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

async addFriend(req, res) {
  console.log('You are adding a new friend');
  console.log(req.body);

  try {
    const addAFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true },
    );

    if (!addAFriend) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.json(addAFriend);
  } catch (err) {
    res.status(500).json(err);
  }
},

async removeFriend(req, res) {
  try {
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true },
    );

    if (!deleteFriend) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.json(deleteFriend);
  } catch (err) {
    res.status(500).json(err);
  }
},

};