

const Thought = require("../models/Thought.js");
const User = require("../models/User.js");


module.exports = {
//
// to get all thoughts plus additional details
////////////////
getAllThoughtsPlusDetails(req, res) {
////////////////
Thought.find()
.select("-__v")
.then((thoughts) => res.json(thoughts))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to get all thoughts as summary information
////////////////
getAllThoughts(req, res) {
////////////////
Thought.aggregate(
[
{
$project: 
  {
  username: 1,  // thoughtThinker: "$username",
  reactionId: "$reactions._id",  // "reactions._id": 1, 
  reactionCount: {$sum: "$reactions._reactionCounter"}
  }
}, 
], 
(err, result) => 
  {
  if (err) 
    {
    console.log(err);
    res.status(500).send(err);
    }
  else
    {
    res.status(200).json(result);
    }
  }
)
}, 
//
// to get a single thought
////////////////
getThought(req, res) {
////////////////
Thought.findOne({"_id": req.params.thoughtId})
.select("-__v")
.then((thought) => 
  !thought
  ? res.status(404).json({"message": "There is not a thought record that has the specified ID."})
  : res.json(thought))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to create a new thought and add the thought record reference to the associated friend record
////////////////
createThoughtAndUpdateUser(req, res) {
////////////////
Thought.create(req.body)
.then((thought) => 
  {
  if (!thought)
    {
    res.status(404).json({"message": "There was a problem with the creation of the thought record."});
    return;
    }
  else
    {
    return User.findOneAndUpdate({"username": thought.username}, {$addToSet: {"thoughts": thought._id}}, 
      {new: true})
    }
  }
)
.then((user) =>
  ((!user) || (user.updatedCount == 0) || (user.length == 0) || (user.length == -1) || 
  (user == null) || (user == undefined))
  ? res.status(404).json({"message": "The associated user record could not be found or could not be updated."})
  : res.json(user))
  //: res.json({"message": "The specified thought record and the associated user record have been created/updated."})
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to create a new thought but not add the thought record reference to the associated friend record
////////////////
createThoughtButNotUpdateUser(req, res) {
////////////////
Thought.create(req.body)
.then((thought) => res.json(thought))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//  
// to update an existing thought
////////////////
updateThought(req, res) {
////////////////
Thought.findOneAndUpdate({"_id": req.params.thoughtId}, {$set: req.body}, {new: true})  // runValidators: true, 
.then((thought) => 
  !thought
  ? res.status(404).json({"message": "There is not a thought record that has the specified ID."})
  : res.json(thought))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err)
  }
);
}, 
//
// to delete a new thought and remove the thought record reference from the associated friend record
////////////////
deleteThoughtAndUpdateUser(req, res) {
////////////////
Thought.findOneAndDelete({"_id": req.params.thoughtId})
.then((thought) => 
  {
  if (!thought)
    {
    res.status(404).json({"message": "There was a problem with the deletion of the thought record."});
    return;
    }
  else
    {
    return User.findOneAndUpdate({"username": thought.username}, {$pull: {"thoughts": thought._id}}, 
      {new: true})
    }
  }
)
.then((user) =>
  ((!user) || (user.updatedCount == 0) || (user.length == 0) || (user.length == -1) || 
  (user == null) || (user == undefined))
  ? res.status(404).json({"message": "The associated user record could not be found or could not be updated."})
  : res.json(user))
  //: res.json({"message": "The specified thought record and the associated user record have been deleted/updated."})
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to delete an existing thought and associated reactions
// * The associated reactions are automatically-deleted because they are embedded/contained in the thought model. *
////////////////
deleteThoughtButNotUpdateUser(req, res) {
////////////////
Thought.findOneAndDelete({"_id": req.params.thoughtId})
.then((thought) => 
  !thought
  ? res.status(404).json({"message": "There is not a thought record that has the specified ID."})
  : res.json({"message": "The specified thought record has been deleted."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err)
  }
);
}, 
//
// to delete all thoughts and all associated reactions
// * The associated reactions are automatically-deleted because they are embedded/contained in the thought model. *
////////////////
deleteAllThoughts(req, res) {
////////////////
Thought.deleteMany({})
.then((thought) => 
  !thought
  ? res.status(404).json({"message": "There are not any thought records."})
  : res.json({"message": "The thought records have been deleted."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err)
  }
);
}, 
//
// to get the total count of all thought records by way of an aggregate function
////////////////
sumThoughtCounts(req, res) {
////////////////
// to call to the built-in aggregate function of the Thought model
Thought.aggregate(
[
// to filter documents if necessary
//{$match: {thoughtText: {$ne: ""}}}, 
{
$group: 
  {
  // group by thoughtCount virtual field
  _id:  "$_id",  // null,
  // sum of all thoughts
  thoughtCountTotal: {$sum: "$_thoughtCounter"}, 
  },
},
],
(err, result) => 
  {
  if (err) 
    {
    console.log(err);
    res.status(500).send(err);
    }
  else
    {
    res.status(200).json(result);
    }
  }
);
}, 
//
// to get all thought reaction records
////////////////
getAllReactions(req, res) {
////////////////
Thought.find()
.select("reactions")
.then((thoughts) => res.json(thoughts))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
////////////////         // I for quite a while non-successfully tried to display only the matching reaction record; 
getReaction(req, res) {  // instead of the entire document reactions array/list (and parent/containing document that 
////////////////         // contains the match; but I eventually found a solution.
//
Thought.find({"reactions._id": req.params.reaction_id}, {_id: 1, reactions: {$elemMatch: {_id: req.params.reaction_id}}})
//Thought.find({}, {reactions: {$elemMatch: {reaction: req.params.reaction_id}}})
//Thought.find({"reactions._id": req.params.reaction_id}, {"reactions._id": 1})
//Thought.find({"reactions": {_id: req.params.reaction_id}})
//Thought.find({"reactions._id": req.params.reaction_id})
.select("-__v")
.then((thought) => 
  !thought
  ? res.status(404).json({"message": "There is not a reaction record that has the specified ID."})
  : res.json(thought))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// ALTERNATE QUERY IDEAS (NOT COMPLETED BECAUSE OF COMPLICATIONS/CONFUSIONS):
//
// Thought.find({"reactions._id": req.params.reaction_id}, 
// {
//   "reactions": {
//     "$filter": {
//       "input": "$reactions",
//       "as": "reaction",
//       "cond": {
//         "$eq": [
//           "$$reaction._id", req.params.reaction_id
//         ]
//       }
//     }
//   }
// });
// }, 
//
// Thought.aggregate([{$match: {"reactions._id": req.params.reaction_id}},
//   {$project: {
//       reactions: {$filter: {
//           input: "$reactions",
//           as: "reaction",
//           cond: {$eq: ["$$reaction._id", req.params.reaction_id]}
//       }},
//       _id: 0
//   }}
// ]);
// }, 
//
// let reaction_id = req.params.reaction_id;
// console.log(reaction_id);
// Thought.aggregate([{$match: {"reactions._id": reaction_id}},
// {
//   $project: {
//     reactions: {
//       $filter: {
//         input: '$reactions',
//         as: "reactions",
//         cond: {$eq: ["$$reactions._id", reaction_id]},
//       },
//     },
//     //_id: 0,
//   },
// },
// ]);
// },
//
// .find({})
// ({"reactions": {$elemMatch: {_id: req.params.reaction_id}}})
// ({"reactions.reactionBody": {"$eq": "TEST"}}))
// {req.params.reaction_id: {$in: reactions}}
//.select("reactions")
//.where(req.params.reaction_id)
//.in("reactions.id")
//.populate
//(
//   {
//   "path": "reactions._id",
//   "match": {"_id": {"$eq": req.params.reaction_id}}
//   }
// )
//
// ALTERNATE QUERY IDEA (NOT COMPLETED BECAUSE OF COMPLICATIONS/CONFUSIONS):
// Thought.aggregate(
//   [
//   {
//   $match: 
//     {
//     "reactions": 
//       {
//       "$elemMatch": 
//         {
//         "reactionBody": "TEST"
//         }
//       }
//     }
//   }, 
//   {
//   $project: 
//     {
//     "_id": 1, 
//     "reactions.reactionBody": 
//       {
//       "$filter": 
//         {
//         "input": "$reactions.body",
//         "as": "reaction",
//         "cond":
//           {"$eq": ["$reactions.reactionBody", "TEST"]},
//         }
//       }, 
//     }
//   }, 
//   ], 
//   (err, result) => 
//     {
//     if (err) 
//       {
//       console.log(err);
//       res.status(500).send(err);
//       }
//     else
//       {
//       res.status(200).json(result);
//       }
//     }
//   );
//}, 
//
// to create-add a reaction sub-document to a specified thought record
////////////////
createReaction(req, res) {
////////////////
Thought.findOneAndUpdate({"_id": req.params.thoughtId}, {$addToSet: {"reactions": req.body}}, {new: true})
.then((thought) => 
  !thought
  ? res.status(404).json({"message": "There is not a thought record that has the specified ID."})
  : res.json({"message": "The specified reaction record was added to the specified thought record."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to delete-remove a reaction sub-document from a specified thought record
////////////////
deleteReaction(req, res) {
////////////////
//console.log(req.params.thoughtId);
//console.log(req.params.reaction_id); 
Thought.findOneAndUpdate({"_id": req.params.thoughtId}, {$pull: {reactions: {_id: req.params.reaction_id}}}, 
//Thought.findOneAndUpdate({"_id": req.params.thoughtId}, {$pull: {"$match": {"reactions._id": req.params.reaction_id}}}, 
//Thought.findOneAndUpdate({"_id": req.params.thoughtId}, {$pull: {"reactions": req.params.reaction_id}}, 
  {new: true})
.select("-__v")
.then((thought) =>
  !thought
  ? res.status(404).json({"message": "There is not a thought record that has the specified ID."})
  : res.json(thought))
  //: res.json({"message": "The specified reaction record was deleted from the specified thought record."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to get the total count of all thought reaction records by way of an aggregate function
////////////////
sumReactionCounts(req, res) {
////////////////
// to call to the built-in aggregate function of the Thought model
Thought.aggregate(
[
// to filter documents if necessary
//{$match: {reactionBody: {$ne: ""}}}, 
// {
// $match:
//   {
//   _thoughtCounter:
//     {
//     $eq: 1
//     }
//   }
// }, 
// {
// $count: "reactionCounter"
// }, 
{
$unwind: "$reactions"
}, 
{  // total of reactions
$project: {_id : "$_id", reactionId: "$reactions.reactionId", reactionCounter: "$reactions._reactionCounter"}
}, 
{
$group: 
  {
  // group by _reactionId field
  _id: "$reactionId", 
  // sum of all reactions
  count: {$sum: 1}, 
  reactionCounter: {$sum: "$reactionCounter"}
  }, 
}, 
], 
(err, result) => 
  {
  if (err) 
    {
    console.log(err);
    res.status(500).send(err);
    }
  else
    {
    res.status(200).json(result);
    }
  }
);
}
//
};


/*

/api/thoughts

GET to get all thoughts
GET to get a single thought by its _id
POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// example data
{
  "thoughtText": "<thought text>>",
  "username": "<user_name>",
  "userId": "<id>"
}

PUT to update a thought by its _id
DELETE to remove a thought by its _id

/api/thoughts/:thoughtId/reactions

POST to create a reaction stored in a single thought's reactions array field
DELETE to pull and remove a reaction by the reaction's reactionId value

*/

