<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Task Management Website</h3>

  <p align="center">
    Our project is a simple task management website that allows student groups to organize and create tasks for their members to view and interact with.
    <br/>
  </p>
</div>

<br>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- React
- Vite
- Typescript
- BootStrap
- react-router-dom
- Firebase:

<br/>

### Dependencies and Versions

- @types/prop-types: 15.7.13
- @types/react: 18.3.12
- @types/react-dom: 18.3.1
- @types/react-transition-group: 4.4.11
- @vitejs/plugin-react: 4.3.3
- react-refresh: 0.14.2
- typescript: 5.7.2
- vite: 5.4.11

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Open VsCode and select 'clone repository'

2. Paste this link into your repo search bar and clone the repo
   ```sh
    https://github.com/CSC-3380-Fall-2024/Team-5.git
   ```
3. Use the "firebase.ts" file and place it in the "firebase" folder (3380 Project/src/firebase) should look like:

   <img src="3380 Project/src/assets/firebaseImage.png" alt="Firebase Setup" width="200" />

   <br>

4. Open up a new terminal inside your project and navigate to the '3380 project' folder
   ```sh
   cd "3380 Project"
   ```
5. Install Firebase
   ```
   npm install firebase
   ```
6. Create a local server to view the website
   ```
   npm run dev
   ```
7. If there is any problems with "node_modules", you may have to install packages
   ```
   npm install
   ```
8. Otherwise, proceed on the website and sign in

<br>
  <img src="3380 Project/src/assets/Sign in image.png" alt= "sign in image">
<br>

## Usage

### Category Creation

The first tab allows you to create new tasks and categories. You can also edit each task by clicking on it and it will update on the backend once you click off of it.

<br>
  <img src="3380 Project/src/assets/categoryPic.png" alt= "sign in image">
<br>


### Remote Selection

The second tab allows you to view all tasks that are available to be picked up. By selecting one, your name will display. We intended for this to be displayed for everyone on the same project but couldn't get it done in time.

<br>
  <img src="3380 Project/src/assets/remotePic.png" alt= "sign in image">
<br>


### Update Notes

The third tab allows you to view everyone's current task and progress. The table renders everyone in a project and only the current user can add an update note.

<br>
  <img src="3380 Project/src/assets/updatePic.png" alt= "sign in image">
<br>

### Task Map

The last tab allows you to create task shapes and organize them in a way where you can view which tasks need to be completed before another.

<br>
  <img src="3380 Project/src/assets/taskPic.png" alt= "sign in image">
<br>

### Subject Tabs

This feature allows users to make new tabs where you can view various projects once clicked. Right now there is a module for you to connect to a new project but we couldn't finish the functionality in time so for now the website can only be viewed as a single project.

<br>
  <img src="3380 Project/src/assets/subjectPic.png" alt= "Subject Tab image">
<br>

##