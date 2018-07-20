## Flote
Flote is a shared note-taking app inspired by Trello and Google Docs, available in the browser and as a native smartphone app.
Flote brings remote workplaces closer together via live collaboration. Writing task lists is made easy. 
New tasks, deletes, and updates all show up in realtime in a lightweight UI. 

## Motivation 
Lists are an important part of daily flow in work environments and at home.
Flote is designed to make task listing and note taking that much easier. 
We want to bring people even closer with live communication between a group of coworkers. 

## Screenshot Gif 
<img src='https://github.com/jeremygottfried/flote-frontend/blob/master/Flote.mp4.gif' alt='gif' width=700>

## Tech/Frameworks Used 
-React and React Native frontends
-Ruby on Rails API backend 
-Redis and Sidekiq for job queuing and API request caching
-Action Cable websockets for real time updates across clients
-JWT authentication and authorization 
-Bcrypt password encryption 
-Semantic styling 

## Features 
-Real time updating of notes across clients 
-PRPL pattern for high-level optimization 
-Websocket keydown tracking in real time 
-Fully secure authentication and authorization 
-Smartphone native app for Android and Iphone

## Installation and Start Up
1. git clone this repo, the react native repo at https://github.com/jeremygottfried/Flote-react-native,
and the backend repo at https://github.com/jeremygottfried/flote-backend-
2. `yarn install` or `npm install` on the frontend repo
3. `yarn start` or `npm start` on the frontend repo
4. In the React Native repo, run `react-native run-ios --simulator="iPhone 5s"`
5. In the backend repo, edit the seed.rb file with your own information, then run rails db:reset. 
6. In the backend repo, run `redis-server` in one tab, then `foreman start` in another tab, 
then `rails s -p 4000` in another tab in your terminal. 
7. navigate to localhost:3000 and log in to begin using the app. 

## API Reference
https://github.com/jeremygottfried/flote-backend-

## How to use
1. Navigate to localhost:3000
2. create a new account or log in
3. click on 'add a new note' and begin typing
4. click outside the text box to save the note 
5. Click the 'x' above the note to delete it. 
