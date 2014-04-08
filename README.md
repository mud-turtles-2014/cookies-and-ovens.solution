# Behavior Drill Cookies And Ovens

##Learning Competencies

##Summary

 You've already built a bakery in Ruby, [remember](http://socrates.devbootcamp.com/challenges/83)?  In this challenge, you'll be exercising your Object-Oriented JavaScript skills in building a web-based bakery application.

To successfully complete this challenge, you should be familiar with the following concepts and library features:

- [Object-Oriented JavaScript](https://developer.mozilla.org/en-US/docs/JavaScript/Introduction_to_Object-Oriented_JavaScript)
- Fundamental jQuery functions for creating elements ([jQuery()](http://api.jquery.com/jQuery/#jQuery2)), inserting them into the view ([append()](http://api.jquery.com/append/)), and binding behavior to events with methods like [on()](http://api.jquery.com/on/)
- The [Model-View-Controller design pattern](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)


## Objectives

### A Bakery in your Browser

Your job is to figure out how to model each of the components of this application and to provide an elegant, object-oriented solution.

When you are finished, your application should behave [like this](http://www.youtube.com/embed/KdOxXcYMPJI?rel=0).

Notice the features in play here:

- Users can enter in a type of cookie and the bake time in the form.
- When the form is submitted, a new batch of cookies is added to the `Prep Table`.
- Users can place a batch of cookies in the oven by clicking the `Add to oven` button.
- Pressing the `Bake for 1 minute` button will bake all of the cookies in the oven, and the **state** of the cookie will change accordingly.

You are free to determine what it means for a cookie to be `raw`, `still_gooey`, `just_right`, or `crispy`.  In the example above, the logic for transitioning between these states is as such:

- When a cookie is *first created*, it is `raw`.
- When a cookie has been baked for *less than* its `Bake time`, it is `still_gooey`.
- When a cookie has been baked for *exactly* its `Bake time`, it is `just_right`.
- When a cookie has been baked for *more than* its `Bake time`, it is `crispy`.

---

Before writing any code, you should develop an understanding of your object model and determine the essential properties and behaviors of each object.

When you do write out your solution, pay attention to how you organize the concerns:

- How tightly coupled are your objects?  Do you follow the Law of Demeter?
- Where does the user input (i.e. clicking of buttons, submitting forms) get processed?
- How are you maintaining consistency between the data and its presentation?

For *extra bonus points*, implement your code using the MVC design pattern.

##Releases
###Release 0

##Optimize Your Learning

##Resources