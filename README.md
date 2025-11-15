🎬 CineMatch — Smart Movie Discovery App

A React Native app built for the RUMAD Fellowship Final Project

CineMatch is a mobile app that helps users quickly discover popular movies by genre using The Movie Database (TMDb) API. The app features a clean UI, fast navigation, and dynamic movie cards with posters, ratings, and summaries.

🚀 Features
✅ Genre Selection

Users choose from popular genres like Action, Comedy, Romance, Thriller, and more.

🎥 Movie Discovery

Fetches the top trending movies (sorted by popularity) for the selected genre using TMDb’s Discover API.

🎴 Custom Movie Cards

Each movie is displayed in a rich card that includes:

Poster image

Movie title

Description

Genre tag

Star rating

“Add to Watch List” button

🧭 Navigation

Built using React Navigation with a clean two-screen stack:

Home Screen – select genre

Movies Screen – browse fetched results

🎨 Styling

Fully custom UI using:

Dark theme

Responsive card designs

Consistent spacing

Rounded corners and soft shadows

🛠️ Technologies Used

React Native

Expo / CLI

React Navigation

TMDb API

JavaScript (ES6+)

📦 Installation
1️⃣ Clone the repo
git clone https://github.com/your-username/cinematch.git
cd cinematch

2️⃣ Install dependencies
npm install

3️⃣ Add your TMDb API token

Inside App.js, replace the placeholder token:

const TMDB_TOKEN = 'YOUR_TMDB_BEARER_TOKEN_HERE';


You can generate one at https://developer.themoviedb.org/

4️⃣ Run the app
npm start


Open the project in:

Expo Go (mobile)

iOS Simulator

Android Emulator

📁 Project Structure
/CineMatch
  ├── App.js
  ├── package.json
  ├── node_modules/
  ├── assets/
  └── README.md


All core logic (screens, fetching, UI components) lives inside App.js for simplicity.

🔍 How It Works (Technical Overview)
📡 Fetching Movies

CineMatch uses the /discover/movie endpoint filtered by genre ID:

https://api.themoviedb.org/3/discover/movie
  ?with_genres=GENRE_ID
  &sort_by=popularity.desc


The app fetches up to 20 movies, across multiple pages if needed.

🧩 Key Components

ProfileCard → displays movie details

HomeScreen → selects a genre

MovieScreen → fetches and displays results

🎭 State Management

Handled via React hooks:

useState() for genre + movie storing

useEffect() to trigger fetch on screen load

🎓 About This Project — RUMAD Fellowship

This app was created as the final project for the RUMAD Fellowship.
The goal was to design and build a production-ready mobile application demonstrating:

UI/UX design fundamentals

API integration

Component-based architecture

State management

Mobile responsiveness

Clean code practices

CineMatch showcases all of these skills through a polished and functional movie discovery experience.

⭐ Future Improvements

Add real user watchlists with async storage

Add search functionality

Add more filters (year, rating, streaming availability)

Add trailer previews

Add onboarding and settings pages

🙌 Acknowledgments

Special thanks to:

RUMAD Fellowship team for guidance

TMDb for providing movie data

React Native community
