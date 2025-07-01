# freeCodeCamp - Back End Development and APIs - Projects - IV - Exercise Tracker


## 4. Projects - Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

Build a full stack JavaScript app that is functionally similar to this: [https://exercise-tracker.freecodecamp.rocks](https://exercise-tracker.freecodecamp.rocks). Working on this project will involve you writing your code using one of the following methods:

  *  Clone [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-exercisetracker/) and complete your project locally.
  *  Use [our Replit starter project](https://replit.com/github/freeCodeCamp/boilerplate-project-exercisetracker) to complete your project.
  *  Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

If you use Replit, follow these steps to set up the project:

  *  Start by importing the project on Replit.
  *  Next, you will see a `.replit` window.
  *  Select `Use run command` and click the `Done` button.

When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the Solution Link field. Optionally, also submit a link to your project's source code in the GitHub Link field.

Your responses should have the following structures.

Exercise:

```
    {
      username: "fcc_test",
      description: "test",
      duration: 60,
      date: "Mon Jan 01 1990",
      _id: "5fb5853f734231456ccb3b05"
    }
```

User:

```
    {
      username: "fcc_test",
      _id: "5fb5853f734231456ccb3b05"
    }
```

Log:

```
    {
      username: "fcc_test",
      count: 1,
      _id: "5fb5853f734231456ccb3b05",
      log: [{
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      }]
    }
```

**Hint:** For the `date` property, the `toDateString` method of the `Date` API can be used to achieve the expected output.

