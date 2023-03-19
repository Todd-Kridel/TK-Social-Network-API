

const mongoose = require("mongoose");
const User = require("../models/User.js");
const Thought = require("../models/Thought.js");
//const Reaction = require("../models/Thought.js");


module.exports = {
//
// to get all users without extra expansion/populate detail information about thoughts and friends
////////////////
getAllUsers(req, res) {
////////////////
User.find()
.select("-__v")
.then((users) => res.json(users))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
},
//
// to get a single user with extra expansion/populate detail information about thoughts and friends
////////////////
getUser(req, res) {
////////////////
User.findOne({"_id": req.params.userId})  // (new mongoose.ObjectId(req.params.userId)
.select("-__v")
//.populate("thoughts")
.populate({path: "thoughts", select: "-id -__v"})
//.populate("friends")
.populate({path: "friends", select: "-id -__v"})
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : res.json(user))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
},
//
// to create a new user
////////////////
createUser(req, res) {
////////////////
User.create(req.body)
.then((user) => res.json(user))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
},
//
// to update an existing user
////////////////
updateUser(req, res) {
////////////////
User.findOneAndUpdate({"_id": req.params.userId}, {$set: req.body}, {new: true})  // runValidators: true, 
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : res.json(user))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
},
//
// to add a thought reference to the user record
////////////////
addThought(req, res) {
////////////////
User.findOneAndUpdate({"_id": req.params.userId}, {$addToSet: {"thoughts": req.params.thoughtId}}, 
  {new: true})
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : res.json({"message": "The specified thought reference was added to the specified user record."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
},
//
// to remove a thought reference from the user record
////////////////
removeThought(req, res) {
////////////////
User.findOneAndUpdate({"_id": req.params.userId}, {$pull: {"thoughts": req.params.thoughtId}}, {new: true})
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : res.json({"message": "The specified thought reference was removed from the specified user record."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
////////////////////////////////
// BEGIN: EXTRA-BONUS ADD-/REMOVE-FRIEND ROUTE ENHANCEMENT CODING
// friend reference addition/removal processing that is reflected in the associated user/friend records
//
// to add a friend reference to a user record and also add a self-reference in the friend's user record, 
// i.e., add a user record ID pair in/between the 2 user/friend records, and also update the friend counter
////////////////
addFriend(req, res) {
////////////////
User.findOneAndUpdate({"_id": req.params.userId}, 
  {$addToSet: {"friends": req.params.friendId}, $inc: {"_friendCounter": 1}}, {new: true})
  //, function(err, obj) {
  //console.log("function-internal _friendCounter reference: " + _friendCounter);}
.then((user) => 
  {
  if (!user)
    {
    res.status(404).json({"message": "There is not a user record that has the specified ID."});
    return;
    }
  else
    {
    return User.findOneAndUpdate({"_id": req.params.friendId}, 
      {$addToSet: {"friends": req.params.userId}, $inc: {"_friendCounter": 1}}, {new: true})
      //, function(err, obj) {
      //console.log("function-internal _friendCounter reference: " + _friendCounter);}
    }
  }
)
.then((user) => 
  {
  if (!user)
    {
    res.status(404).json({"message": "There is not a user record that has the specified ID."});
    }
  else
    {
    res.json({"message": "The specified friend references were added to the specified user records."});
    }
  }
)
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
},
//
// to add a friend reference to a user record and not also add a self-reference in the friend's user record, 
// i.e., do not add a user record ID pair in/between the 2 user/friend records; 
// utility/maintenance route
////////////////
addFriendButNoSelfReference(req, res) {
////////////////
User.findOneAndUpdate({"_id": req.params.userId}, {$addToSet: {"friends": req.params.friendId}, 
  $inc: {"_friendCounter": 1}}, {new: true})
.then((user) =>
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : res.json({"message": "The specified friend reference was added to the specified user record."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to remove a friend reference from a user record and also remove a self-reference in the friend's user record, 
// i.e., remove a user record ID pair in/between the 2 user/friend records, and also update the friend counter
////////////////
removeFriend(req, res) {
////////////////
User.findOneAndUpdate({"_id": req.params.userId}, {$pull: {"friends": req.params.friendId}, 
  $inc: {"_friendCounter": -1}},  // $set: {_friendCounter: this.friends.size}}
  {new: true})
  //, function(err, obj) {
  //console.log("function-internal _friendCounter reference: " + _friendCounter);}
.then((user) => 
  {
  if (!user)
    {
    res.status(404).json({"message": "There is not a user record that has the specified ID."});
    return;
    }
  else
    {
    return User.findOneAndUpdate({"_id": req.params.friendId}, {$pull: {"friends": req.params.userId}, 
      $inc: {"_friendCounter": -1}}, {new: true})
      //, function(err, obj) {
      //console.log("function-internal _friendCounter reference: " + _friendCounter);}
    }
  }
)
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : res.json({"message": "The specified friend references were removed from the specified user records."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to remove a friend reference from a user record but not also remove a self-reference in the friend's user 
// record, i.e., do not remove a user record ID pair in/between the 2 user/friend records; 
// utility/maintenance route
////////////////
removeFriendButNoSelfReference(req, res) {
////////////////
User.findOneAndUpdate({"_id": req.params.userId}, {$pull: {"friends": req.params.friendId}, 
  $inc: {"_friendCounter": -1}}, {new: true})
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : res.json({"message": "The specified friend reference was removed from the specified user record."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// END: BONUS ADD-/REMOVE-FRIEND ROUTE ENHANCEMENT CODING
////////////////////////////////
//
////////////////////////////////
// BEGIN: BONUS DELETE-USER ROUTE CODING
// user record deletion processing that is reflected in all of the associated thought records and friend 
// records; and there are also separate only-remove-thought routes and only-remove-friend routes for 
// utility/maintenance purposes
//
// to delete a user by user ID and also delete by associated user ID any same-user friend reference records in 
// other users' friends lists; and also delete by associated user name any associated thought records and 
// reaction records
//
// ** ASSIGNMENT-INDICATED BONUS ROUTE + FRIEND LIST PROCESSING **
////////////////
deleteUserAndFriendsAndThoughts(req, res) {
////////////////
let aProcessingErrorHasOccurred = false;
//
User.findOneAndDelete({"_id": req.params.userId})
//
.then((user) =>
  {
  console.log("1ST STAGE OF USER DELETE PROCESS -- delete user record");
  console.log("deletion user ID: " + user._id);
  console.log("deletion user name: " + user.username);
  if (!user)
    {
    res.status(404).json({"message": "There is not a user record that has the specified ID."});
    aProcessingErrorHasOccurred = true;
    return;
    }
  else
    {
    console.log("2ND STAGE OF USER DELETE PROCESS -- delete user's friends' user references");
    console.log("deletion user ID: " + user._id);
    console.log("deletion user name: " + user.username);
    //
    // NOTE: THIS UPDATE FUNCTION CURRENTLY IS CAUSING A REPEATED-HEADER ERROR SITUATION.
    // FOR NOW THE "deleteUserAndThoughts" FUNCTION AT BELOW HAS TO BE USED.
    return User.updateMany({"friends": user._id}, {$pull: {"friends": user._id}}, {$inc: {"_friendCounter": -1}}, 
      function(err, obj) {
    //
    console.log("deletion user._id: " + user._id);
    console.log("deletion user.friends.length: " + user.friends.length);
    user._friendCounter = user.friends.length;
    user._friendCounter--;
    console.log("deletion user.friends.length: " + user.friends.length);
    });  
    //return {"_id": "TEST1234", "username": "TEST", "email": "email@email.com"};
    }
  }
)
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  aProcessingErrorHasOccurred = true;
  }
)
.then((user) => 
  {
  if (aProcessingErrorHasOccurred) 
    {
    console.log("ERROR: A processing error has occurred and the specified record[s] cannot be processed.");
    }
  else if (!user)
    {
    res.status(404).json({"message": "There is not a user record that has the specified ID."});
    return;
    }
  else
    {
    console.log("3RD STAGE OF USER DELETE PROCESS -- delete user's thoughts records");
    console.log("deletion user ID: " + user._id);
    console.log("deletion user name: " + user.username);
    //
    return Thought.deleteMany({username: user.username});
    }
  }
)
.then((thoughts) =>
  {
  if (aProcessingErrorHasOccurred) 
    {
    console.log("ERROR: A processing error has occurred and the specified record[s] cannot be processed.");
    }
  else if ((!thoughts) || (thoughts.deletedCount == 0) || (thoughts.length == 0) || (thoughts.length == -1) || 
    (thoughts == null) || (thoughts == undefined))
    {
    // res.json({"message": "The specified user record that did not have same-user references in other-user friends lists has been deleted."})
    res.json({"message": "The specified user record that did not have associated thought records has been deleted."});
    }
  else
    {
    // res.json({"message": "The specified user record and the associated same-user references in other-user friends lists have been deleted."})
    res.json({"message": "The specified user record and the associated thought records and reaction records have been deleted."});
    }
  }
)
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to delete a user by user ID and also delete by associated user name any associated thought records and 
// reaction records
// ** INITIAL ASSIGNMENT-INDICATED BONUS ROUTE **
// THIS FUNCTION DOES SUCCESSFULLY WORK...BUT OF COURSE IT LEAVES ORPHAN FRIEND REFERENCES OF DELETED USERS.
////////////////
deleteUserAndThoughts(req, res) {
////////////////
User.findOneAndDelete({"_id": req.params.userId})
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : Thought.deleteMany({"username": user.username}))
.then((thought) =>
  ((!thought) || (thought.deletedCount == 0) || (thought.length == 0) || (thought.length == -1) || 
    (thought == null) || (thought == undefined))
  ? res.json({"message": "The specified user record that did not have associated thought records has been deleted."})
  //: res.json(thought)
  : res.json({"message": "The specified user record and the associated thought records and reaction records have been deleted."}))
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
}, 
//
// to delete all of the thought records (and associated reaction records) that were created by a user (such
// as for deleting orphan thought records of a user that has been deleted)
// ** EXTRA FEATURE **
////////////////
deleteUserThoughts(req, res) {
////////////////
Thought.deleteMany({"username": req.params.username})
.then((thought) =>
  ((!thought) || (thought.deletedCount == 0) || (thought.length == 0) || (thought.length == -1) || 
    (thought == null) || (thought == undefined))
  ? res.status(404).json({"message": "There is not a thought record that has the specified user name."})
  //: res.json(user)
  : res.json({"message": "The specified user thought records and the associated reaction records have been deleted."}))
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
}, 
//
// to delete a user by user ID and also delete by associated user ID any same-user friend reference records in 
// other users' friends lists; 
// ** EXTRA FEATURE **
// THIS FUNCTION DOES SUCCESSFULLY WORK...BUT OF COURSE IT LEAVES ORPHAN THOUGHT RECORDS OF DELETED USERS.
////////////////
deleteUserAndFromFriends(req, res) {
////////////////
User.findOneAndDelete({"_id": req.params.userId})
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record that has the specified ID."})
  : User.updateMany({"friends": user._id}, {$pull: {"friends": user._id}}, {$inc: {"_friendCounter": -1}}))
.then((user) =>
  ((!user) || (user.modifiedCount == 0) || (user.length == 0) || (user.length == -1) || 
    (user == null) || (user == undefined))
  ? res.json({"message": "The specified user record that did not have associated friend reference records has been deleted."})
  //: res.json(user)
  : res.json({"message": "The specified user record and the associated friend reference records have been deleted."}))
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
}, 
//
// to delete a user ID friend reference of a user from the friend lists/arrays of any user records that 
// contain the deleted-user ID (such as for deleting orphan friend-reference records of a user that has been 
// deleted)
// ** EXTRA FEATURE **
////////////////
deleteUserFromFriends(req, res) {
////////////////
console.log(req.params.userId);
User.updateMany({"friends": req.params.userId}, {$pull: {"friends": req.params.userId}}, {$inc: {"_friendCounter": -1}})
.then((user) =>
  ((!user) || (user.modifiedCount == 0) || (user.length == 0) || (user.length == -1) || 
    (user == null) || (user == undefined))
  ? res.status(404).json({"message": "There is not a user friend list record that has the specified ID."})
  //: res.json(user)
  : res.json({"message": "The friend list ID references of the specified deleted-user ID have been deleted."}))
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
}, 
//
// to delete a user by user ID but not also delete any associated friend records or thought records by 
// associated user name; utility/maintenance route
////////////////
deleteUserButNoFriendsOrThoughts(req, res) {
////////////////
User.findOneAndDelete({"_id": req.params.userId})
.then((user) => 
  !user
  ? res.status(404).json({"message": "There is not a user record hat has the specified ID."})
  : res.json({"message": "The specified user record has been deleted."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err);
  }
);
}, 
//
// to delete all users and all associated thoughts and associated reactions; 
// utility/maintenance route
////////////////
deleteAllUsers(req, res) {
////////////////
User.deleteMany({})
.then((user) => 
  {
  if (!user)
    {
    res.status(404).json({"message": "There are not any user records."});
    return;
    }
  else
    {
    return Thought.deleteMany({});
    }
  }
)
.then((thought) => 
  ((!thought) || (thought.deletedCount == 0) || (thought.length == 0) || (thought.length == -1) || 
  (thought == null) || (thought == undefined))
  ? res.json({"message": "The user records have been deleted and they did not have associated thought records."})
  //: res.json(thought)
  : res.json({"message": "The user records and the associated thought records and reaction records have been deleted."}))
.catch((err) => 
  {
  console.log(err);
  res.status(500).json(err)
  }
);
}, 
//
// END: BONUS DELETE-USER ROUTE CODING
////////////////////////////////
//
// to get the total count of all user records by way of an aggregate function
////////////////
sumUserCounts(req, res) {
////////////////
// to call to the built-in aggregate function of the User model
User.aggregate(
[
// to filter documents if necessary
//{$match: {username: {$ne: ""}}}, 
{
$group: 
  {
  // group by _userCounter utility field
  _id: null,
  // sum of all users
  userCountTotal: {$sum: "$_userCounter"}, 
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
// to get the total count of all friend records/references by way of an aggregate function
////////////////
sumFriendCounts(req, res) {
////////////////
// to call to the built-in aggregate function of the User model
User.aggregate(
[
// to filter documents if necessary
//{$match: {username: {$ne: ""}}}, 
{
$group: 
  {
  // group by _friendCounter utility field
  _id: null,
  // sum of all friendship friends
  friendshipsFriendsTotal: {$sum: "$_friendCounter"},  // $_friendCounter (total of friendships)  // $friendCount
  },
}, 
{  // total of friendships...i.e., friendship friends total divided by 2 (i.e., 1 friends = 2 friends)
$project: {friendshipsCountTotal: {$divide: ["$friendshipsFriendsTotal", 2]}}, 
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

[ API Routes ]

/api/users

* GET all users
GET a single user by its _id and populated thought and friend data

POST a new user:

// example data
{
  "username": "<user_name>",
  "email": "<email_address>"
}
PUT to update a user by its _id
DELETE to remove user by its _id

BONUS: Remove a user's associated thoughts when deleted.

/api/users/:userId/friends/:friendId
POST to add a new friend to a user's friend list
DELETE to remove a friend from a user's friend list

*/

