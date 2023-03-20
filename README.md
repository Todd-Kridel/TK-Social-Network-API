

# TK Social Media API


## Table of Contents
* [Description](#description)
* [Installation Instructions](#installation-instructions)
* [Usage and Features](#usage-and-features) 
* [Credits](#credits)
* [License](#license) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
* [Questions](#questions)


## Description

This current Module 18 Challenge assignment -- a "Social Media API" -- is the backend functionality of a hypothetical social network frontend application...where users can share their thoughts, react to friends’ thoughts, and create friend lists. The API provides Node/Express system route CRUD functionality for the management of user primary records and thought primary records and thought reaction secondary records. The API functions utilize a MongoDB No-SQL database through the Mongoose interface system and its functions.

The API functions and the API database also use referenced schemas, embedded sub-document schemas, various getter and setter function features, multi-level database queries, some input field validations (email address format) and default values, and output displays that have some virtual fields (sum total calculations) and customized group/category/filter/projection components. The API was tested by using/processing HTTP data routes with the Insomnia request transfer system. Because this application is backend-only and not deployed to a frontend instance...this assignment repository contains several walkthrough demo videos that demonstrate the data-processing functionality of the application.

The objectives -- user story and acceptance criteria items -- of the assignment were as follows:

[ User Story ]

AS A social media startup...

I WANT an API for my social network that uses a NoSQL database...

SO THAT my website can handle large amounts of unstructured data.

[ Acceptance Criteria ]

GIVEN a social network API...

WHEN I enter the command to invoke the application...
THEN my server is started and the Mongoose models are synced to the MongoDB database.

WHEN I open API GET routes in Insomnia for users and thoughts...
THEN the data for each of these routes is displayed in a formatted JSON.

WHEN I test API POST, PUT, and DELETE routes in Insomnia...
THEN I am able to successfully create, update, and delete users and thoughts in my database.

WHEN I test API POST and DELETE routes in Insomnia...
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.

[ Additional Grading Criteria ]

Also good coding practices and good GitHub/Git repository configuration.


## Installation Instructions

0. (PREPARATION PREREQUISITE PROCESS) Install/Verify the Node.js system software. Make sure that you have a GitHub membership and account to be able to view the repository of the assignment webpage system. The published GitHub Pages view of the website should be accessible on the public internet access URL without a need to have a GitHub membership/account. Also clone the repository (i.e., copy the system files to your local computer) if direct interaction/running of the system files is necessary/desired; Refer to the related GitHub online user information about the process of cloning a repository.
1. Install/Verify the required involved sub-module application software that is necessary for the running of the repository application...by entering the command "npm i" at a console command prompt of the repository clone directory (if applicable). One of the module programs that is installed/required is the "MongoDB/Mongoose" database program...which is used to contain the data that the "Social Media API" application uses. After the installation of the database program...there should not be an additional requirement of some manual installation steps because the API program does not involve any user authentication information items for access to the involved database.
2. Install/Verify the Insomnia request transfer system (or a similar application such as Postman).
3. Seed/Define the application database with the necessary tables and data by entering the command "node utility/seeds.js"; Refer to the demo video section at below for a visual presentation of this process.
4. Run the application server by entering the command "node server" (or the "npm start" macro/script). The system console should respond with the message "The Social Network API application server is running on port 3001". When the usage of the application is not needed anymore...then the server can be stopped by type the Ctrl+C key combination command; Refer to the demo video section at below for a visual presentation of this process.


## Usage and Features

The assignment application is a route-response-only backend data-processing system that cannot yet run in a frontend application because an application creation/development was not part of the assignment. The usage of the backend route-processing can be visualized through the Insomnia (or similar) HTTP request transfer application". The following GitHut Pages deployment webpage shows some demo videos that are a non-interactive preview of many of the listed-at-below application system processes that are being activated in the Insomnia system: "https://todd-kridel.github.io/TK-Social-Network-API/".

* Showing the seeding of the database and the starting of the server and the listing of the data routes.
* Showing GET routes to return all users and all thoughts and all reactions.
* Showing GET routes returning a single user and a single thought and a single reaction.
* Showing the POST and PUT and DELETE routes for users.
* Showing the POST and DELETE routes for a user's friend list.
* Showing the POST and PUT and DELETE routes for thoughts.
* Showing the POST and DELETE routes for thought reactions.

To use this application...at after when installing the application and its database (by seeding it) and then using the "node server" command to start the application...explore the system and see its flow of data by using the Insomnia application and a combination of the following demo videos and the data URL routes (user, thought, friend, reaction) that are indicated at below.


### > Record Types and the Corresponding API Routes and their Provided Functionality: <
  
  [ base route URL: http: //localhost:3001 ] 

#### >>> User records: [ base route: /api/users ] <<<

* GET all user records and display a summarized listing.

  [ GET route: /api/users/ ]

  [ route title in Insomnia: "Users -- Get All and Also Get All Associated Thought References and Friend References" ]

* GET a single user record and display a detailed view that includes populated thought data and friend data; by using the record ID in a URL query parameter.

  [ GET route: /api/users/:userId ]

  [ route title in Insomnia: "User -- Get By /ID  and Also Get Associated Thought References and Friend References" ]

* POST-create a new user record; by using an HTTP request form and JSON format to provide the necessary field data: username and email; and during that process a new record ID is automatically created.

  [ POST route: /api/users/ + JSON form ]

  [ route title in Insomnia: "User -- Create By Form" ]

* PUT-update a user record; by using the record ID in a URL query parameter and by using an HTTP request form and JSON format to provide the necessary field data: username and email.

  [ PUT route: /api/users/:userId + JSON form ]

  [ route title in Insomnia: "User -- Update By /ID and Form" ]

* DELETE a user record; by using the record ID in a URL query parameter.

  [ DELETE route: /api/users/:userId/andThoughts ]

  [ route title in Insomnia: "User -- Delete By /ID and Also Delete User Reference From Associated Thoughts and Reactions" ]

> **BONUS (COMPLETED): Additionally DELETE all of the thought records and embedded reaction records that are associated with a user record that is deleted.**

Additional User features/routes:

* DELETE a user record ID reference of an already-deleted-user from all of the user records of all of the friends of the deleted user; by using the record ID of the deleted user in a URL query parameter; supplemental/utility function.

  [ DELETE route: /api/users/:userId/fromFriends ]

  [ route title in Insomnia: "User -- Delete From Friends" ]

* DELETE a user record and PUT-update-remove the friend record ID reference that is in the user records of all of the friends of the deleted user; by using the record ID of the deleted user in a URL query parameter.

  [ DELETE route: /api/users/:userId/andFromFriends ]

  [ route title in Insomnia: "User -- Delete By /ID and Also Delete User Reference From Associated Friends" ]

* DELETE all of the thought records and the associated reaction records of an already-deleted-user; by using the record ID of the deleted user in a URL query parameter; supplemental/utility function.

  [ DELETE route: /api/users/:userId/Thoughts ]

  [ route title in Insomnia: "User -- Delete Thoughts and Reactions" ]

* DELETE a user record and all of the associated thought records and reaction records; and UPDATE-remove all of ID reference records of the deleted user in the friends field arrays of all of the user records of the friends of the deleted user.

  **[ DELETE route: /api/users/ ]  [ * DO NOT USE YET * ]**

  [ route title in Insomnia: "User -- Delete By /ID and Also Delete Associated Friends and Thoughts and Reactions" ]

>> THE DEVELOPMENT OF THIS DESIRED EVENTUAL ALL-INCLUSIVE FUNCTION CONTINUES TO BE IN-PROGRESS (with some re-occurring functional bugs/glitches); and during the in-progress time there are 2 function-pair-usages (at above) that each can achieve the same effect (DELETE user and thought/reaction records + UPDATE-remove friend ID reference records; or DELETE user and friend ID references + DELETE thought/reaction records).

* DELETE a user record but do not also update friend user records or delete thought/reaction records;by using the record ID in a URL query parameter; utility function.

  [ DELETE route: /api/users/:userId/noFriendsOrThoughts ]

  [ route title in Insomnia: "User -- Delete By /ID But Not Also Delete Associated Thoughts and Reactions" ]

* DELETE all user records; utility function.

  [ DELETE route: /api/users/delete/all ]

  [ route title in Insomnia: "User -- Delete All" ]

* PUT-add a thought record reference ID in/to the thoughts field array of a user record; by using the record ID in a URL query parameter; utility function.

  [ PUT route: /api/users/:userId/thoughts/:thoughtId ]

  [ route title in Insomnia: "User -- Add Thought" ]

* DELETE-remove a thought record reference ID from the thoughts field array of an user record; by using the record ID in a URL query parameter; utility function.

  [ DELETE route: /api/users/:userId/thoughts/:thoughtId ]

  [ route title in Insomnia: "User -- Remove Thought" ]

* GET an aggregate total summary of users.

  [ GET route: /api/users/aggregate/usersCountTotal ]

  [ route title in Insomnia: "Users -- Aggregate Count Total" ]

#### >>> Friend User records: [ base route: /api/users ] <<<

(arrays of user record ID references in the user records of the 2 friends)

* PUT-update-add a new friend record by adding a friend user record reference ID to the initiating user's friend list array in their user record (but not actually POST-creating any user record); by using in URL query parameters the ID of the involved initiating user record and the ID of the involved friend user record; and during that process a new record ID is NOT automatically created because the involved friend user records already exist and only the friend reference ID storage/placement is new.

> BONUS EXTRA WORK: Additionally PUT-update-add a corresponding befriending user's user record reference ID to the friend's friend list array their user record. 

  [ PUT route: /api/users/:userId/friends/:friendId ]

  [ route title in Insomnia: "User -- Add Friend and Also Add Self-Reference in Friend" ]

* DELETE-update-remove a friend user record reference ID from the initiating user's friend list array in their user record (but not actually DELETE-ing any user record); by using in URL query parameters the ID of the involved initiating user record and the ID of the involved friend user record.

> BONUS EXTRA WORK: Additionally UPDATE-remove a corresponding current-befriended user's user record reference ID from the involved friend's friend list array in their user record.

  [ DELETE route: /api/users/:userId/friends/:friendId ]

  [ route title in Insomnia: "User -- Remove Friend and Also Remove Self-Reference in Friend" ]

Additional friend features/routes:

* PUT-update-add a friend ID reference record in/to an initiating user record but do not also add the friend ID reference record in/to the associated friend user record; utility function.

  [ PUT route: /api/users/:userId/friends/:friendId/noSelf ]

  [ route title in Insomnia: "User -- Add Friend but Not Also Add Self-Reference in Friend" ]

* DELETE-update-remove a friend ID reference record from an initiating user record but do not also remove the friend ID reference record from the associated friend user record; utility function.

  [ DELETE route: /api/users/:userId/friends/:friendId/noSelf ]

  [ route title in Insomnia: "User -- Remove Friend but Also Not Remove Self-Reference in Friend" ]

* GET an aggregate total summary of friendships (friend amount divided by 2).

  [ GET route: /api/users/aggregate/friendsCountTotal ]

  [ route title in Insomnia: "Friendships -- Aggregate Count Total" ]

#### >>> Thought records: [ base route: /api/thoughts ] <<<

* GET all thought records and display a summarized listing.

  [ GET route: /api/thoughts/ ]

  [ route title in Insomnia: "Thoughts -- Get All and Also Get All Associated Reactions" ]

* GET a single thought record and display a detailed view that includes populated reaction data; by using the record ID in a URL query parameter.

  [ GET route: /api/thoughts/:userId ]

  [ route title in Insomnia: "Thought -- Get By /ID and Also Get Associated Reactions" ]

* POST-create a new thought record and update the thoughts array field of the involved user record; by using the user record ID in a URL query parameter and by using an HTTP request form and JSON format to provide the necessary field data: thoughtText and username; and during that process a new record ID is automatically created for the thought record.

  [ POST route: /api/thoughts/ + JSON form ]

  [ route title in Insomnia: "Thought -- Create By Form and Also Update Associated User" ]

* PUT-update a thought record; by using the record ID in a URL query parameter and by using an HTTP request form and JSON format to provide the necessary field data: thoughtText and username.

  [ PUT route: /api/thoughts/:thoughtID + JSON form ]

  [ route title in Insomnia: "Thought -- Update By /ID and Form" ]

* DELETE a thought record; by using the record ID in a URL query parameter; and during this process all of the embedded associated reaction records are also deleted.

+ BONUS EXTRA WORK: Additionally UPDATE-remove the record reference ID that is in the thoughts field array of the associated user record.

  [ DELETE route: /api/thoughts/:userId ]

  [ route title in Insomnia: "Thought -- Delete By /ID and Also Update Associated User and Delete Associated Reactions" ]

Additional thought features/routes:

* POST-create a new thought record but do not update the associated user record; utility function.

  [ POST route: /api/thoughts/noUser + JSON form ]

  [ route title in Insomnia: "Thought -- Create By Form But Not Also Update Associated User" ]

* DELETE a thought record (and the associated reaction record) but do not update the associated user record; utility function.

  [ DELETE route: /api/thoughts/noUser ]

  [ route title in Insomnia: "Thought -- Delete By /ID and Also Delete Associated Reactions But Not Also Update Associated User" ]

* DELETE all thought (and reaction) records; utility function.

  [ DELETE route: /api/thoughts/delete/all ]

  [ route title in Insomnia: "Thoughts -- Delete All and Also Delete Associated Reactions" ]

* GET Aggregate total summary of thoughts.

  [ GET route: /api/thoughts/aggregate/thoughtsCountTotal ]

  [ route title in Insomnia: "Thought -- Aggregate Count Total" ]

#### >>> Reaction records: [ base route: /api/thoughts ] <<<

(embedded-document records that are within and part of a thought record; and the reaction records have IDs of their own)

* PUT-create-add a reaction record in the reactions array field that is in a corresponding thought record; and during that process a new record ID is automatically created for the reaction record.

  [ PUT route: /api/thoughts/:thoughtId/reactions/ + JSON form ]

  [ route title in Insomnia: "Thought -- Create-Add Reaction" ]

* DELETE-remove-pull a reaction record from the reactions list array that is in the associated thought record; by using in URL query parameters the ID of the involved thought record and the system ID (not the custom object ID) of the involved reaction record.

  [ DELETE route: /api/thoughts/:thoughtId/reactions/:reaction_id (not :reactionId) ]

  [ route title in Insomnia: "Thought -- Delete Reaction by ID" ]

Additional reaction features/routes:

* GET all reaction records and display a summarized listing.

  [ GET route: /api/thoughts/users/reactions/ ]

  [ route title in Insomnia: "Thought -- Get All Reactions" ]

* GET a single reaction record and display a detailed view; by using the record ID in a URL query parameter.

  [ GET route: /api/thoughts/users/reactions/:reactionId ]

  [ route title in Insomnia: "Thought -- Get Reaction By ID" ]

* DELETE all reaction (and thought) records; utility function.

  [ DELETE route: /api/thoughts/delete/all ]

  [ route title in Insomnia: "Thoughts -- Delete All and Also Delete Associated Reactions" ]

* GET an aggregate total summary of reactions.

  [ GET route: /api/thoughts/aggregate/reactionsCountTotal ]

  [ route title in Insomnia: "Thoughts -- Reactions Aggregate Count Total" ]


### Sample Data (Illustration of Schema/Model Content and Query Result Layout)

The Social Media API application system contains and uses structures of user record data and thought record data and reaction record data...similar to what is illustrated at below. 

#### User Data (Summary/All Record View)

[

	{

		"_id": "6417cd256b278ee73c2061ea",

		"username": "testuser1",

		"email": "test.user1@email.com",

		"_userCounter": 1,

		"thoughts": [

			"6417cd37f6d5a906778a7a88",

			"6417cd52f6d5a906778a7a91",

			"6417cdb9f6d5a906778a7aa1"

		],

		"_friendCounter": 2,

		"friends": [

			"6417cd256b278ee73c2061eb",

			"6417cd256b278ee73c2061ed"

		],

		"thoughtCount": 3,

		"friendCount": 2

	},

	{

		"_id": "6417cd256b278ee73c2061eb",

		"username": "testuser2",

		"email": "test.user2@email.com",

		"_userCounter": 1,

		"thoughts": [

			"6417cda6f6d5a906778a7a9b"

		],

		"_friendCounter": 2,

		"friends": [

			"6417cd256b278ee73c2061ea",

			"6417cd256b278ee73c2061ec"

		],

		"thoughtCount": 1,

		"friendCount": 2

	},

	{

		"_id": "6417cd256b278ee73c2061ec",

		"username": "testuser3",

		"email": "test.user3@email.com",

		"_userCounter": 1,

		"thoughts": [],

		"_friendCounter": 1,

		"friends": [

			"6417cd256b278ee73c2061eb"

		],

		"thoughtCount": 0,

		"friendCount": 1

	},

	{

		"_id": "6417cd256b278ee73c2061ed",

		"username": "testuser4",

		"email": "test.user4@email.com",

		"_userCounter": 1,

		"thoughts": [

			"6417cdb0f6d5a906778a7a9e"

		],

		"_friendCounter": 1,

		"friends": [

			"6417cd256b278ee73c2061ea"

		],

		"thoughtCount": 1,

		"friendCount": 1

	},

	{

		"thoughts": [],

		"friends": [],

		"_friendCounter": 0,

		"_id": "6417cd256b278ee73c2061ee",

		"username": "testuser5",

		"email": "test.user5@email.com",

		"_userCounter": 1,

		"thoughtCount": 0,

		"friendCount": 0

	}

]

#### User Data (Single/Individual Detailed Record View)

{

	"_id": "6417cd256b278ee73c2061ea",

	"username": "testuser1",

	"email": "test.user1@email.com",

	"_userCounter": 1,

	"thoughts": [

		{

			"_id": "6417cd37f6d5a906778a7a88",

			"thoughtText": "...a thought by testuser1...",

			"createdAt": "3/19/2023",

			"username": "testuser1",

			"_thoughtCounter": 1,

			"reactions": [

				{

					"reactionId": "6417cd2af6d5a906778a7a85",

					"reactionBody": "TEST REACTION",

					"username": "testuser3",

					"createdAt": "3/19/2023",

					"_reactionCounter": 1,

					"_id": "6417ce45f6d5a906778a7aa4"

				}

			],

			"reactionsCount": 1

		},

		{

			"_id": "6417cd52f6d5a906778a7a91",

			"thoughtText": "...a thought by testuser1...",

			"createdAt": "3/19/2023",

			"username": "testuser1",

			"_thoughtCounter": 1,

			"reactions": [],

			"reactionsCount": 0

		},

		{

			"_id": "6417cdb9f6d5a906778a7aa1",

			"thoughtText": "...a thought by testuser1...",

			"createdAt": "3/19/2023",

			"username": "testuser1",

			"_thoughtCounter": 1,

			"reactions": [],

			"reactionsCount": 0

		}

	],

	"_friendCounter": 2,

	"friends": [

		{

			"_id": "6417cd256b278ee73c2061eb",

			"username": "testuser2",

			"email": "test.user2@email.com",

			"_userCounter": 1,

			"thoughts": [

				"6417cda6f6d5a906778a7a9b"

			],

			"_friendCounter": 2,

			"friends": [

				"6417cd256b278ee73c2061ea",

				"6417cd256b278ee73c2061ec"

			],

			"thoughtCount": 1,

			"friendCount": 2

		},

		{

			"_id": "6417cd256b278ee73c2061ed",

			"username": "testuser4",

			"email": "test.user4@email.com",

			"_userCounter": 1,

			"thoughts": [

				"6417cdb0f6d5a906778a7a9e"

			],

			"_friendCounter": 1,

			"friends": [

				"6417cd256b278ee73c2061ea"

			],

			"thoughtCount": 1,

			"friendCount": 1

		}

	],

	"thoughtCount": 3,

	"friendCount": 2

}

#### User Aggregate Summary

[

	{

		"_id": null,

		"userCountTotal": 5

	}

]

#### Friend Aggregate Summary (total friend amount divided by 2; 2 friends = 1 friendship)

[

	{

		"_id": null,

		"friendshipsCountTotal": 3

	}

]

#### Thought and Reaction Combined Data (Summary/All Record View)

[

	{

		"_id": "6417cd37f6d5a906778a7a88",

		"username": "testuser1",

		"reactionId": [

			"6417ce45f6d5a906778a7aa4"

		],

		"reactionCount": 1

	},

	{

		"_id": "6417cd52f6d5a906778a7a91",

		"username": "testuser1",

		"reactionId": [],

		"reactionCount": 0

	},

	{

		"_id": "6417cda6f6d5a906778a7a9b",

		"username": "testuser2",

		"reactionId": [

			"6417ce66f6d5a906778a7aa8"

		],

		"reactionCount": 1

	},

	{

		"_id": "6417cdb0f6d5a906778a7a9e",

		"username": "testuser4",

		"reactionId": [],

		"reactionCount": 0

	},

	{

		"_id": "6417cdb9f6d5a906778a7aa1",

		"username": "testuser1",

		"reactionId": [],

		"reactionCount": 0

	}

]

#### Thought and Reaction Combined Data (Single/Individual Detailed Record View)

{

	"_id": "6417cd37f6d5a906778a7a88",

	"thoughtText": "...a thought by testuser1...",

	"createdAt": "3/19/2023",

	"username": "testuser1",

	"_thoughtCounter": 1,

	"reactions": [

		{

			"reactionId": "6417cd2af6d5a906778a7a85",

			"reactionBody": "TEST REACTION",

			"username": "testuser3",

			"createdAt": "3/19/2023",

			"_reactionCounter": 1,

			"_id": "6417ce45f6d5a906778a7aa4"

		}

	],

	"reactionsCount": 1

}

#### Reaction Data (Summary/All Record View)

[

	{

		"_id": "6417cd37f6d5a906778a7a88",

		"reactions": [

			{

				"reactionId": "6417cd2af6d5a906778a7a85",

				"reactionBody": "TEST REACTION",

				"username": "testuser3",

				"createdAt": "3/19/2023",

				"_reactionCounter": 1,

				"_id": "6417ce45f6d5a906778a7aa4"

			}

		],

		"reactionsCount": 1

	},

	{

		"_id": "6417cd52f6d5a906778a7a91",

		"reactions": [],

		"reactionsCount": 0

	},

	{

		"_id": "6417cda6f6d5a906778a7a9b",

		"reactions": [

			{

				"reactionId": "6417cd2af6d5a906778a7a85",

				"reactionBody": "TEST REACTION",

				"username": "testuser1",

				"createdAt": "3/19/2023",

				"_reactionCounter": 1,

				"_id": "6417ce66f6d5a906778a7aa8"

			}

		],

		"reactionsCount": 1

	},

	{

		"_id": "6417cdb0f6d5a906778a7a9e",

		"reactions": [],

		"reactionsCount": 0

	},

	{

		"_id": "6417cdb9f6d5a906778a7aa1",

		"reactions": [],

		"reactionsCount": 0

	}

]

#### Reaction (Single/Individual Detailed Record View)

[

	{

		"_id": "6417cd37f6d5a906778a7a88",

		"reactions": [

			{

				"reactionId": "6417cd2af6d5a906778a7a85",

				"reactionBody": "TEST REACTION",

				"username": "testuser3",

				"createdAt": "3/19/2023",

				"_reactionCounter": 1,

				"_id": "6417ce45f6d5a906778a7aa4"

			}

		],

		"reactionsCount": 1

	}

]

#### Thought Aggregate Summary

[

	{

		"_id": "6417cdb9f6d5a906778a7aa1",

		"thoughtCountTotal": 1

	},

	{

		"_id": "6417cda6f6d5a906778a7a9b",

		"thoughtCountTotal": 1

	},

	{

		"_id": "6417cd37f6d5a906778a7a88",

		"thoughtCountTotal": 1

	},

	{

		"_id": "6417cdb0f6d5a906778a7a9e",

		"thoughtCountTotal": 1

	},

	{

		"_id": "6417cd52f6d5a906778a7a91",

		"thoughtCountTotal": 1

	}

]

#### Reaction Aggregate Summary

[

	{

		"_id": "6417cd2af6d5a906778a7a85",

		"count": 2,

		"reactionCounter": 2

	}

]


## Credits 

* Continued informational and cognitive struggle and persistence were required.


## Questions

* If you have any questions you can reach me at GitHub account "Todd-Kridel".


## License

*  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 
* Copyright 2023 Todd Kridel

MIT License

Copyright (c) 2022 DU Full-Stack Web Development Coding Boot Camp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

