# MEAN stack Resume Activity Tracker app
A MEAN stack app which keeps the analytics of the different sections of your Resume.(i.e. Introduction , Education , Projects , Achievements , Technical-Skills).

## How to run the app?
- Run `npm install` to install required angular dependencies.
- Run `ng serve` to run the angular app
- Start the MEAN Stack backend
  - `cd backend` to enter into the backend folder
  - Run `npm install` to install required backend dependencies.
  - `mongod` to start the mongoDB shell (or open mongod.exe manually)

## Using the app
- The front end runs at http://localhost:4200 
    - Open http://localhost:4200/dashboard to view the dashboard 

## Description
The Resume contains various sections (i.e. Introduction , Education , Projects , Achievements , Technical-Skills).
Each Section can be viewed separatly by clicking at buttons provided on the header.
 
The dashboard contains the number of visits and the average number of visits per min of all the sections.
The total number of visits and average visit per min for the website.
The Most highlighted section of the resume and the Least highlighted section of the resume.

![Dashboard](/dashboard.png)
