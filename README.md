
 #Nzuzo Shangase – Angular 17 Users & Todos App

 #How I run the project
First thing I do is install the dependencies:
bash
npm install


Then I start the dev server:
npm start


Once that’s running, I open the browser at [http://localhost:4200](http://localhost:4200) to see the app.



 #How I run tests
When I want to check my tests, I just run:
bash
npm test

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
