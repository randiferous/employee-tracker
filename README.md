# Employee Tracker Challenge

The purpose of this assignment was to give us experience working with a MySQL database.  Specifically, we were instructed to create a content management system (CMS), an interface that would allow others to view or make changes to the data.  We were required to use Node.js and Inquirer, which provided us with more exposure to these programming tools.

## Description

This is a back-end application that provides information about the employee's of a specific company.  This information includes their name, role, salary, department and manager. It can also display information about specific departments and roles if needed.  The application also allows a user to add a department, role, or employee, and even update an employee's role if necessary.  The information was organized using MySQL, the interactability of the application is through Inquirer, and the display of information is executed by console tables.

## Installation/Usage

Here are the steps one must take to use this application:

1) Clone this repository into a local directory.

2) In the file "connection.js" within the "db" folder, change the value of "user" and "password" to your MySQL user and password (make sure you have already downloaded [MySQL](https://www.mysql.com/)).

3) Open your command-line application (make sure you have one first, such as Git Bash) and navigate to the directory with the cloned repository.

4) In your command-line, type "npm install" to download the node dependencies of this application: console.table, inquirer, and mysql2.

5) Finally, enter "node server.js" in the command-line to begin using the application.


## Reflection

This was definitely one of the more challenging and interesting assignments of the bootcamp so far.

There were a number of technical issues I ran into that were new to me, so troubleshooting those was a worthwhile experience. For example, in the beginning of the challenge, the "require" method was not working for Inquirer. Apparently, this was due to a recent update to the Inquirer package that was creating a bug. Because of this setback, I learned how to use the "import" declaration instead.

The most difficult part of this challenge was figuring out the syntax of MySQL queries. While it is straightforward in nature, MySQL is a new language to me, so I am still in the process of getting acclimated to it. I especially had a tough time trying to reference the employee ID as the foreign key for the manager ID because both values are within the same table. The usage of a "qualifier letter" became the solution for this issue.

What I liked about this challenge was that each acceptance criteria was it's own mini-challenge. While some criteria were similar, every single one of them required a different approach from others.  It almost felt like a game with levels.

Overall, this was an enjoyable assignment that has great educational value.

## Walkthrough Video

Here is a link to the walkthrough video of the application: https://drive.google.com/file/d/1kHBQAvL2LiiOZpg5xifyTTMD035NVKAQ/view?usp=sharing