# NFC Reserve HMS

NFC devices supported  
Hotel management system

## Run application locally

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.  
The application will automatically reload if you change any of the source files.

## Deployment process

Run `npm run build` and `npm run buildProd` to build the project for TEST and PROD environment.  
The build artifacts will be stored in the `dist/` and `docs/` directory.  
Run `git add .`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Modules

**Login**  
The user first encounters the login interface.  
A new user can be created by a previously registered user with the appropriate role.

**Forgotten password**  
A password reminder email will be sent to the email address provided.

**Dashboard**  
Displays the most important information of the system.
Including:  
-number of conferences  
-number of guests  
-wristbands issued / total number of wristbands  
-revenues  
-age groups  

**HOTEL**  
**Conferences**  
Upcoming conferences, conference organizer and contact details can be maintained in this module.  
Extra conference questions can be added dynamically, so their appearance on the form depends on whether such a question has been added to the conference.  

**Registration form**  
Each conference has a multilingual registration form, which the guest can fill out to register for the conference. This online process greatly relieves the hotel staff, because guests arriving at the same time do not have to be registered on site, because all necessary personal (NTAK) data and ID photo have been recorded in advance. The storage of data complies with the current GDPR regulations. The fields of the form and the relationships between the fields are checked, thus minimizing incorrect filling.  

**Guests**  
Enables the maintenance of guest data. Guests can be added to the system through registration, or imported from an Excel file, or by a user with appropriate permissions. It is possible to import all guests of a conference at once from Excel. The guest table can be searched / sorted by column.  
The table can be opened row by row. All stored guest data is available here.  
The values ​​displayed in the drop-down lists are systemically color-coded.  
This makes it easier to view/manage a larger data set.  
Assigning a wristband (RFID tag) to a guest is possible from a pop-up window.  
By holding the wristband to the card reader, the field will be automatically filled in.  

**Rooms**  
Hotel room maintenance surface  

**RFID Tag**  
Wristbands/RFID Tag Maintenance Interface

**RESTAURANT**  
**Diets**  
Maintenance interface for diets / food sensitivities.
You can enable or disable certain diets, and you can also set the color code used in the system here. The color of the diet is the same as the color of the wristband.

**Food counter**  
A tablet-optimized interface that checks the guest's eligibility during meal service. By swiping the wristband, the tablet displays the guest's name, diet, age group (child/adult portion), conference they are attending, and the number of meals already served, which helps the kitchen. Meals can be served at multiple locations at the same time, and the number of meals served always remains synchronized across all devices. If someone has already eaten or has not paid for the meal, it will appear in red at the bottom of the screen, and if they can eat, it will appear in green.

**SYSTEM**  
**Users**  
The maintenance interface for system users.  
Here you can set the user's role, which affects what menu items the user can see, or what functions within a module they are allowed to use.  

**Profile**  
The user can maintain their own data on the profile page.  

**Logs**  
Allows you to view events/logs that have occurred in the system. You can trace a guest's entire journey from registration to wristband assignment/removal to all meals.  

## Future plans  
NFC Reserve is under continuous development and will be expanded with additional modules in the near future...
