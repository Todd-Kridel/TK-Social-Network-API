

// THIS FILE IS NOT NECESSARY BECAUSE THE SCHEMA IS EMBEDDED/CONTAINED AS A SUB-DOCUMENT IN THE THOUGHT MODEL. //


/*
const {Schema, model} = require("mongoose");


// the schema for creating the Reaction model
const reactionSchema = new Schema(
{
reactionId: 
  {
  type: mongoose.Types.ObjectId,  // Use Mongoose's ObjectId data type
  default: new mongoose.Types.ObjectId() // function () {return new ObjectId()} //auto: true  // Default value is set to a new ObjectId
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
// virtual properties and functions
// a virtual called reactionCount that retrieves the length of the thought's reactions array field
// on query.
//
//reactionSchema
//.virtual("")
// get-value function
//.get(function () {
//return this.;
//});
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
//const Reaction = model("reaction", reactionSchema);


function formattedDate(createdAt) {
//console.log((createdAt));
let dateMonth = ((createdAt).getMonth() + 1);
let dateDay = (createdAt).getDate();
let dateYear = (createdAt).getFullYear();
let formattedDate = dateMonth + "/" + dateDay + "/" + dateYear;
//console.log("formattedDate: " + formattedDate);
return formattedDate;
}


module.exports = Reaction;
*/

