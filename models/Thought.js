

const {Schema, model} = require("mongoose");
const mongoose = require("mongoose");


// the schema for creating the Reaction sub-document
const reactionSchema = new mongoose.Schema(
{
reactionId: 
  {
  //type: Date, 
  //required: true, 
  //default: new Date(), 
  type: mongoose.Types.ObjectId,  // Use Mongoose's ObjectId data type
  default: new mongoose.Types.ObjectId()
    // function () {return new ObjectId()} //auto: true  // Default value is set to a new ObjectId
  }, 
reactionBody: 
  {
  type: String, 
  required: true, 
  maxLength: 280
  }, 
username: 
  {
  type: String, 
  required: true
  }, 
createdAt: 
  {
  type: Date, 
  default: new Date(), 
  get: formattedDate  // Use a getter method to format the timestamp on query.
  }, 
_reactionCounter:  // a separate non-virtual counter variable that is for a total-of-counts aggregate function
  {
  type: Number, 
  default: 1
  }
}, 
{
// a toJSON schema component
// a virtual process that is to be included with each thought...overriding the default behavior
//
toJSON: 
  {
  virtuals: true, 
  getters: true
  },  
id: false,
}
);


// for initializing the User model.
//const Reaction = model("reaction", reactionSchema);


// the schema for creating the Thought model
const thoughtSchema = new Schema(
{
thoughtText:  // Required, Must be between 1 and 280 characters
  {
  type: String, 
  required: true, 
  minLength: 1, 
  maxLength: 280
  }, 
createdAt:  // 
  {
  type: Date, 
  default: new Date(),  // Use a "get" function to format the date.
  get: formattedDate
  }, 
username:  // 
  {
  type: String, 
  required: true
  }, 
reactions:  // an array of nested documents created with the reactionSchema
  // This will not be a model, but rather will be used as the reaction field sub-document schema in the
  // Thought model.
  [reactionSchema], 
_thoughtCounter:  // a separate non-virtual counter variable that is for a total-of-counts aggregate function
  {
  type: Number, 
  default: 1 
  }
}, 
{
// a toJSON schema component
// a virtual process that is to be included with each thought...overriding the default behavior
//
toJSON: 
  {
  virtuals: true, 
  getters: true
  },  
id: false,
}
);
//
// virtual properties and functions
//
// a virtual called "thoughtsCount" that retrieves the length of the thoughts array at the time of the query
// thoughtSchema
// .virtual("thoughtsCount")
// // get-value function
// .get(function () {
// if (this.thoughts)
//   {
//   return this.thoughts.length;
//   }
// else 
//   {
//   return 0;
//   }
// });
//
// a virtual called "reactionsCount" that retrieves the length of the reactions array at the time of the query
thoughtSchema
.virtual("reactionsCount")
  // get-value function
.get(function () 
  {
  if (this.reactions)
    {
    return this.reactions.length;
    }
  else 
    {
    return 0;
    }
  }
);
//
//thoughtSchema
//.virtual("formattedCreatedAtDate")
// get-value function
//.get(function () {
//console.log(formattedDate);
//return formattedDate(this.createdAt);
//});
// set-value function
//.set(function (value) {
//const setValue = value;
//this.set();
//});


// for initializing the User model.
const Thought = model("thought", thoughtSchema);


////////////////
function formattedDate(createdAt) {
////////////////
//console.log((createdAt));
let dateMonth = ((createdAt).getMonth() + 1);
let dateDay = (createdAt).getDate();
let dateYear = (createdAt).getFullYear();
let formattedDate = dateMonth + "/" + dateDay + "/" + dateYear;
//console.log("formattedDate: " + formattedDate);
return formattedDate;
}


//module.exports = {Reaction, Thought};
module.exports = Thought;


/*

[ Thought ]

thoughtText:
String, Required
Must be between 1 and 280 characters

createdAt:
Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query

username: (The user that created this thought)
String
Required

reactions: (These are like replies)
Array of nested documents created with the reactionSchema

Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

[ Reaction ] (SCHEMA ONLY)

reactionId:
Use Mongoose's ObjectId data type
Default value is set to a new ObjectId

reactionBody
String
Required
280 character maximum

username
String
Required

createdAt
Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query

Schema Settings
This will not be a model, but rather will be used as the reaction field's sub-document schema in the 
Thought model.

*/

