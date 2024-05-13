# 🎶 TuneIn ✨

## What is TuneIn?

TuneIn is an app that was created for the purpose of finding music & events for your favorite artists!

## Table of Contents

- [Description](#what-is-tunein)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Deployed Application Links](#links)
- [Technologies Used](#technologies-used)
- [Installation Instructions](#installation-instructions)
- [Initializing Application](#initialize-application)
- [Future Development](#future-development)
- [Resources](#resources)
- [Challenges](#challenges)
- [Lessons Learned](#lessons-learned)
- [Collaborators](#collaborators)

## User Story

- AS a user who listens to music
- I WANT to be able to search for songs using just their lyrics and save the songs to my profile
- SO THAT I can recall the song at a later time

## Acceptance Criteria

- GIVEN I know the lyrics to a song
- WHEN I type the lyrics into the seach bar
- THEN I am presented with a list of songs by different artists
- GIVEN I have signed up and logged in
- THEN I have the option to "like" the song
- WHEN I click on the heart icon
- THEN the song is saved to my profile
- WHEN I click on the name of the song I am looking for
- THEN I am taken to the GENIUS website and I see the full lryics and can listen to the song
- GIVEN I know the artist
- WHEN I type the artist's name into the Live Event Search
- THEN I am presented with a list of upcoming shows for that artist
- GIVEN I am logged in
- THEN I can click on the heart to save the event to my profile
- WHEN I click on the the show I am interested in
- THEN I am taken to the TicketMaster website where I can shop and purchase tickets

## Links

- Deployed Application in Render:

- Project Repo: https://github.com/RRHunterH/TuneIn

## Technologies Used

- Render
- GraphQL
- Express.js
- MongoDB
- Mongoose
- Node.js
- MERN Stack
- Apollo Server & Client
- JWT
- Axios
- Vite

## Installation Instructions

To install the application, follow the steps below:

1.  first clone the repo to your local machine
2.  Then, open the terminal of the application.
3.  Run the following command:

        npm install

4.  All the necessary packages will be installed. You can check the package.json file to verify the necessary tech and packages were correctly installed.

## Initialize Application

To initialize the application in your localhost, be sure all necessary packages have been installed in your package.json file. Then, open the application's integrated terminal and run:

        npm run dev

Vite will automatically open the application on your Live Server in your localhost.

## Future Development

1. Allow users to save songs to their profile
2. Allow users to search and save events of their favorite artists to their profile
3. Include features for users to receive email reminders of upcoming events they liked
4. Include features for users to receive email updates on new albums released by artists they have saved to their profile

## Resources

- Previous class content & assignments (State module 22 activity 17, [Music Finder](https://github.com/FisherK19/music-explorer) etc.)
- Google
- WebDocs
- ChatGPT
- Xpert Learning

## Challenges

1. The songId wasn't being properly read from our API to the application
2. Ensuring naming conventions of the variables throughout the application were the same became very confusing very quickly.
3. Successfully running authorization and the favorited songs on the front-end and saving both data on the back-end became a very sensitive challenge as they both intermingled in naming conventions and overall functionality
4. Deploying application to Render

## Lessons Learned

1. Remaining patient and keeping a detailed eye goes a long way
2. Using GraphQL and MongoDB to address errors
3. Creating a MERN Stack application from scratch
4. Using MongoDB to debug server-side errors
5. Learned how to deploy to Render
6. Group-think to address errors is very powerful as every team member has different strengths

## Collaborators

- [Kristie Fisher](https://github.com/FisherK19)
- [Hunter Hurst](https://github.com/RRHunterH)
- [Emily Ciarabellini](https://github.com/ECiarabellini)
- [Toshie Araki](https://github.com/tmaraki)
- [Emily Coleman](https://github.com/ebcoleman)
- [Katelynn McManus](https://github.com/KatelynnMM)
- [Austin Lewandowski](https://github.com/austin109lew)

Thank you for visiting our application!

2024 TuneIn
