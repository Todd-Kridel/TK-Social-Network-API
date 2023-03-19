

const router = require("express").Router();


const 
  {
  getAllThoughts, 
  getThought, 
  createThoughtAndUpdateUser, 
  createThoughtButNotUpdateUser, 
  updateThought, 
  deleteThoughtAndUpdateUser, 
  deleteThoughtButNotUpdateUser, 
  deleteAllThoughts, 
  sumThoughtCounts,  // aggregate 
  getAllReactions, 
  getReaction, 
  sumReactionCounts,  // aggregate 
  createReaction, 
  deleteReaction
  } = require("../../controllers/thoughtController");


// /api/thoughts
router.route("/").get(getAllThoughts);

// /api/thoughts
router.route("/").post(createThoughtAndUpdateUser);

// /api/thoughts/noUser
router.route("/noUser").post(createThoughtButNotUpdateUser);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").put(updateThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").delete(deleteThoughtAndUpdateUser);

// /api/thoughts/:thoughtId/noUser
router.route("/:thoughtId/noUser").delete(deleteThoughtButNotUpdateUser);

// /api/thoughts/delete/all
router.route("/delete/all").delete(deleteAllThoughts);

// /api/thoughts/aggregate/thoughtsCountTotal
router.route("/aggregate/thoughtsCountTotal").get(sumThoughtCounts);

// /api/thoughts/users/reactions
router.route("/users/reactions").get(getAllReactions);

// /api/thoughts/aggregate/reactionsCountTotal
router.route("/aggregate/reactionsCountTotal").get(sumReactionCounts);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").put(createReaction);

// /api/thoughts/users/reactions/:reaction_id
router.route("/users/reactions/:reaction_id").get(getReaction);

// /api/thoughts/:thoughtId/reactions/:reaction_id
router.route("/:thoughtId/reactions/:reaction_id").delete(deleteReaction);


module.exports = router;


/*

/api/thoughts

GET to get all thoughts
GET to get a single thought by its _id
POST to create a new thought (don't forget to push the created thought _id to the associated user's 
thoughts array field)

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

