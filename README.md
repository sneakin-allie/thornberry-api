# Capstone #2: THORNBERRY

This full stack application was made as my second capstone project for the Bloc/Thinkful Web Development course. It is a wildlife tracker application that nature lovers can use to keep track of animal sightings. Users can upload information about the animal, location, date, notes, and a photo through the Cloudinary Widget. Inspiration for this application came from my parents' need to keep track of bird and bear activity in their backyard. This application was built to meet the specifications laid out by the Bloc/Thinkful course. The project's client-side code can be viewed on its GitHub repository here: https://github.com/sneakin-allie/thornberry-client

## Live Application

This application is hosted on Vercel and can be viewed here:  https://wildlifer-client-sneakin-allie.vercel.app

## Summary

THORNBERRY has four main page branches. The Home/Landing Page, Sightings List Page, Add New Sighting Page, and Edit Sighting Page.

The Home/Landing Page has brief instructions on what the application does and how to get started, as well as Sign Up and Log In forms for new users and existing users respectively. See below:

![Screen Shot 2021-07-12 at 12 09 47 PM](https://user-images.githubusercontent.com/68669789/125321473-b8878780-e30a-11eb-86c4-75c081e614bc.png)

The Sightings List Page lists a user's animal sightings with any previously saved details that the user input. The top of the page has an "Add New Sighting" button for easy access and each sighting listed has an "Edit" button so that users can edit fields as desired. See below:

![Screen Shot 2021-07-12 at 4 17 54 PM](https://user-images.githubusercontent.com/68669789/125350430-bb936f80-e32c-11eb-9545-bc89e6bd7b9f.png)

The Add New Sighting Page displays a form where a user can enter information about a sighting, including the animal, location, date, photos, and notes about activity, behavior, appearance, etc. Only the animal, location, and date are required at first so that a user can quickly save a sighting and return to it later to add notes. The Cloudinary Widget was used to allow users to upload photos from their personal camera roll. See below:

![Screen Shot 2021-07-12 at 4 18 52 PM](https://user-images.githubusercontent.com/68669789/125350538-de258880-e32c-11eb-8a05-75c0d0d71361.png)

The Edit Sighting Page displays a form where a user can update information about a sighting that has been saved. The input fields auto-fill with the previously saved information so the user can make edits where desired while keeping the rest of the input fields in tack. At the bottom of the form, there is a "Delete" button that deletes the sighting from the collection. See below:

![Screen Shot 2021-07-12 at 4 21 31 PM](https://user-images.githubusercontent.com/68669789/125350775-3d839880-e32d-11eb-8d4f-a3ce2b4d31ca.png)

## Process

The design and implementation of this application went through multiple steps, each of which was approved by the grading team in intervals. I wrote a proposal and user stories, set up a Kanban board to manage my project, and created user flows and wireframes. The first version I built was a static version of the client-side application in React, and I presented this to users to do the first round of feedback and iteration. I implemented the full MVP of the application, including the API and database, and did a second round of feedback and iteration. Finally, I styled the application with typography, color, and a responsive layout.

## Technology Used

The back-end of this project was built using Node.js, Express, PostgreSQL, and Knex. RESTful APIs were used along with middleware including Morgan, Express.json, Helmet, and CORS. CORS was implemented to ensure connection between the front-end application and back-end API.

The front-end of this project was built in React, using Router, class components, state, props, vanilla CSS, and the Cloudinary Widget. An API was created that handled all promises necessary to interact with the back-end API database.
