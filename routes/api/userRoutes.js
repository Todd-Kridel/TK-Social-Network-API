

const router = require("express").Router();


const 
  {
  getAllUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUserAndFriendsAndThoughts, 
  deleteUserAndFromFriends, 
  deleteUserFromFriends, 
  deleteUserAndThoughts, 
  deleteUserThoughts, 
  deleteUserButNoFriendsOrThoughts, 
  deleteAllUsers, 
  sumUserCounts,  // aggregate 
  addThought, 
  addFriend, 
  addFriendButNoSelfReference, 
  removeThought, 
  removeFriend, 
  removeFriendButNoSelfReference, 
  sumFriendCounts,  // aggregate 
  } = require("../../controllers/userController");


// /api/users
router.route("/").get(getAllUsers);

// /api/users
router.route("/").post(createUser);

// /api/users/:userId
router.route("/:userId").get(getUser);

// /api/users/:userId
router.route("/:userId").put(updateUser);

// /api/users/:userId
router.route("/:userId").delete(deleteUserAndFriendsAndThoughts);

// /api/users/:userId/andFromFriends
router.route("/:userId/andFromFriends").delete(deleteUserAndFromFriends);

// /api/users/:userId/fromFriends
router.route("/:userId/fromFriends").delete(deleteUserFromFriends);

// /api/users/:userId/andThoughts
router.route("/:userId/andThoughts").delete(deleteUserAndThoughts);

// /api/users/:username/Thoughts
router.route("/:username/Thoughts").delete(deleteUserThoughts);

// /api/users/:userId/noFriendsOrThoughts
router.route("/:userId/noFriendsOrThoughts").delete(deleteUserButNoFriendsOrThoughts);

// /api/users/delete/all
router.route("/delete/all").delete(deleteAllUsers);

// /api/thoughts/aggregate/usersCountTotal
router.route("/aggregate/usersCountTotal").get(sumUserCounts);

// /api/users/thoughts/:thoughtId
router.route("/:userId/thoughts/:thoughtId").put(addThought);

// /api/users/thoughts/:thoughtId
router.route("/:userId/thoughts/:thoughtId").delete(removeThought);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").put(addFriend);

// /api/users/:userId/friends/:friendId/noSelf
router.route("/:userId/friends/:friendId/noSelf").put(addFriendButNoSelfReference);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(removeFriend);

// /api/users/:userId/friends/:friendId/noSelf
router.route("/:userId/friends/:friendId/noSelf").delete(removeFriendButNoSelfReference);

// /api/thoughts/aggregate/friendsCountTotal
router.route("/aggregate/friendsCountTotal").get(sumFriendCounts);


module.exports = router;


/*

[ API Routes ]

/api/users

GET all users
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

