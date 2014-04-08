# Behavior Drill Cookies And Ovens

##Learning Competencies

##Summary

 You've already built a bakery in Ruby, [remember](http://socrates.devbootcamp.com/challenges/83)?  In this challenge, you'll be exercising your Object-Oriented JavaScript skills in building a web-based bakery application.

To successfully complete this challenge, you should be familiar with the following concepts and library features:

- [Object-Oriented JavaScript](https://developer.mozilla.org/en-US/docs/JavaScript/Introduction_to_Object-Oriented_JavaScript)
- [TDD in Javascript using Jasmine](http://jasmine.github.io/2.0/introduction.html)
- Fundamental jQuery functions for creating elements ([jQuery()](http://api.jquery.com/jQuery/#jQuery2)), inserting them into the view ([append()](http://api.jquery.com/append/)), and binding behavior to events with methods like [on()](http://api.jquery.com/on/)

### Step 0: Install Jasmine into the project

1. Grab the most recent [Jasmine stand-alone distribution](https://github.com/pivotal/jasmine/tree/master/dist).
2. unzip the files into your project directory

### Step 1: TDD OOJS

Your first task is to drive out the basic functionality of our `Cookie` and `Oven` classes.

- A `Cookie` is created with a `type` and a `cook_time`
- When a cookie is *first created*, it is `raw`.
- When a cookie has been baked for *less than* its `Bake time`, it is `still_gooey`.
- When a cookie has been baked for *exactly* its `Bake time`, it is `just_right`.
- When a cookie has been baked for *more than* its `Bake time`, it is `crispy`.

- An `oven` starts out with no contents
- An `oven` is created with a maximum size (default to 3)
- We can `addItem`s to an `oven`
- We can `removeItem`s from an `oven`
- We can `bake` an `oven` for a minute
- LOTS LOTS MORE!

### Step 2: A Bakery in your Browser

Your job is to figure out how to wire the html forms and events to interact with our OOJS `Oven` and `Cookie` classes.

When you are finished, your application should behave [like this](http://www.youtube.com/embed/KdOxXcYMPJI?rel=0).

Notice the features in play here:

- Users can enter in a type of cookie and the bake time in the form.
- When the form is submitted, a new batch of cookies is added to the `Prep Table`.
- Users can place a batch of cookies in the oven by clicking the `Add to oven` button.
- Pressing the `Bake for 1 minute` button will bake all of the cookies in the oven, and the **state** of the cookie will change accordingly.

---

Before writing any code, you should develop an understanding of your object model and determine the essential properties and behaviors of each object.

When you do write out your solution, pay attention to how you organize the concerns:

- How tightly coupled are your objects?  Do you follow the Law of Demeter?
- Where does the user input (i.e. clicking of buttons, submitting forms) get processed?
- How are you maintaining consistency between the data and its presentation?

##Releases
###Release 0

##Optimize Your Learning

##Resources