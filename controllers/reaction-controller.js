const { Thought, reactionSchema, User} = require('../models');

module.exports = {
  async addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
      const userReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true },
      );

      if (!userReaction) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(userReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async removeReaction(req, res) {
    try {
      const deleteReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true },
      );

      if (!deleteReaction) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that ID :(' });
      }

      res.json(deleteReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};