

const {Schema, model} = require("mongoose");
const Thought = require("../models/Thought.js");
//const Reaction = require("../models/Reaction.js");
//const Profile = require("../models/Thought.js");
const mongoose = require("mongoose");
require("mongoose-type-email");


// the schema for creating the User model
const userSchema = new Schema(
{
username:  // Unique, Required, Trimmed
  {
  type: String,  
  unique: true, 
  required: true, 
  minLength: 8, 
  lowercase: true, 
  trimmed: true
  }, 
email:  // Required, Unique, Validated (email address format per Mongoose validators)
  {
  type: mongoose.SchemaTypes.Email,  // format validator
  unique: true, 
  required: true, 
  minLength: 11, 
  lowercase: true
  }, 
thoughts: 
  [
  {
  type: Schema.Types.ObjectId,  // "ObjectId",  // mongoose.Types.ObjectId,  // Schema.Types.ObjectId,  // mongoose.ObjectId, 
  ref: "thought", 
  },
  ], 
friends: 
  [
  {
  type: Schema.Types.ObjectId,  // "ObjectId",  // mongoose.Types.ObjectId,  // Schema.Types.ObjectId,  //mongoose.ObjectId,
  ref: "user", 
  }
  ], 
//profile:
//  {
//  type: "ObjectId", 
//  ref: "Profile", 
//  }
_userCounter:  // a separate non-virtual counter variable that is for a total-of-counts aggregate function
  {
  type: Number, 
  default: 1
  }, 
_friendCounter:  // a separate non-virtual counter variable that is for a total-of-counts aggregate function
  {
  type: Number, 
  default: 0
  }
}, 
{
// a toJSON schema option
// a virtual function process that is to be included with each user...overriding the default behavior
//
toJSON:
  {
  virtuals: true, 
  getters: true, 
  setters: true
  }, 
id: false,
}
);
//
// virtual properties and functions
//
// a virtual property/function that is called "thoughtCount" that retrieves the length of the user's 
// friends-list array field at the time of the involved query
userSchema
.virtual("thoughtCount")
  // get-value function
.get(function () 
  {
  if (this.thoughts)
    {
    return this.thoughts.length;
    }
  else 
    {
    return 0;
    }
  }
);
//
// a virtual property/function that is called "friendCount" that retrieves the length of the user's 
// friends-list array field at the time of the involved query
userSchema
.virtual("friendCount")
  // get-value function
.get(function () 
  {
  if (this.friends)
    {
    //console.log("_friendCounter" + this._friendCounter);
    //console.log("freinds.length" + this.friends.length)
    //this._friendCounter = this.friends.length;
    return this.friends.length;
    }
  else 
    {
    return 0;
    }
  }
)
// , 
// userSchema
// .virtual("reactionCount")
// // get-value function
// .get(function () {
// return this.thoughts.reactions.length;
// });
//
// set-value function
//  .set(function (value) {
//  const setValue = value;
//  this.set();
//});
//


// for initializing the User model.
const User = model("user", userSchema);


module.exports = User;


/*

[ User Model ]

username: 
String
Unique
Required
Trimmed

email:
String
Required
Unique
Must match a valid email address (look into Mongoose's matching validation)

thoughts: [ ] sub-document array
Array of _id values referencing the Thought model

friends: [ ] sub-document array
Array of _id values referencing the User model (self-reference)

Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

*/

