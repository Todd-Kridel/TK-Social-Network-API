

// THIS FILE IS NOT NECESSARY BECAUSE THE SCHEMA IS EMBEDDED/CONTAINED AS A SUB-DOCUMENT IN THE THOUGHT MODEL. //


/*
const Reaction = require("../models/Reaction.js");


module.exports = {
//
// to create a new thought reaction
createReaction(req, res) {
Reaction.create(req.body)
.then((reaction) => res.json(reaction))
.catch((err) => res.status(500).json(err));
}, 
// to update an existing thought reaction
updateReaction(req, res) {
Reaction.findOneAndUpdate(
{_id: req.params.reactionId},
{$set: req.body},
//{new: true}  // runValidators: true, 
)},
// to delete a thought reaction
deleteReaction(req, res) {
Reaction.findOneAndDelete({_id: req.params.reactionId})
.then((reaction) =>
!reaction
? res.status(404).json({"message": "There is not a reaction that has the specified ID."})
: res.json({"message": "The specified reaction record has been deleted."}))
.catch((err) => res.status(500).json(err));
}
};
*/

