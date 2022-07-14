## Build a react native application (without using expo) that will: 
1. fetch 200 users from https://randomuser.me/ 
2. create 3 screens: 
* index 
* users 
* user 

## Index screen should contain: 

1. Button “Users list” 
* on press navigate to “users” 

2. Button “Randomize user” 
* on press select random user from the list and navigate to “user” 

## Users screen should contain: 
1. Users list displaying: 
* user image 
* first name 
* last name 
* city 
* email

2. Search input 
* should search users by first name and city

3. Button to change background color of every other item on the list to “orange”
 
4. Go “back” button to navigate to “index” screen

6. Pressing on any user should navigate to “user”

## User screen should display: 

Go “back” button to navigate to the previous screen 

Error message if user does not exist 

or

User data: 
* User image
* first name 
* last name 
* username 
* Full address: street, city, postcode
