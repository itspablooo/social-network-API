const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const getAllThoughts = await Thought.find({});
      res.json(getAllThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const getThought = await Thought.findOne({ _id: req.params.thoughtId })
      
      if (!getThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(getThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const ThoughtUpdate = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      )

      if (!ThoughtUpdate) {
        console.log(err);
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(ThoughtUpdate);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deleteThought) {
        console.log(err);
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  },
};