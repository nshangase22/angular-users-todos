
 #Nzuzo Shangase – Angular 17 Users & Todos App

 #How I run the project


#  How To Run This Project 

#Ensure Required Versions Are Installed

The project was tested with:

* Node.js **v20.20.0*
* npm **v10.8.2**
* Angular CLI **v21.1.0*

Check your versions:

* `node -v
* `npm -v`
* ng version`

If Angular CLI is missing:

* npm install -g @angular/cli


##  Clone the Repository

* Open terminal
* Run:

git clone https://github.com/your-username/users-todo-angular.git


* Navigate into the project:

cd users-todo-angular


Install Dependencies

Inside the project folder run:
npm install


This installs all dependencies defined in `package.json`.



##Start the Development Server

* Run:
ng serve


* Open browser and go to:


http://localhost:4200


The application should now be running locally.


Run Unit Tests

* Execute:
ng test



Important 

* Ensure Node version is 20+
* If `ng serve` fails, try deleting `node_modules` and re-running:


rm -rf node_modules
npm install



 #Decisions I made
 I went with signals because they give me predictable state management.  
 I built everything as standalone components since Angular 17 makes that the default way forward.  
 I used the new `@if` and `@for` control flow syntax instead of the old `ngIf` and `ngFor`.  
 For todos, I added a simple selector so I can filter them easily.  
 I paid attention to basic accessibility things like labels, aria attributes, and semantic HTML.  
 I kept the layout simple and responsive, using modern CSS.



 #Improvements I’d make with more time
 Add better error boundaries so the app fails more gracefully.  
 Implement pagination for todos so the list doesn’t get too long.    
 Improve the UX with  UI updates and stronger error recovery.
