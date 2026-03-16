
### 1. What is the difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`?
  
  * `getElementById` : Select element by id, it returns single element, eg. `document.getElementById("idName")`

  * `getElementsByClassName` : Select element by class, it returns HTMLCollection, eg.`document.getElementsByClassName("className")`

  * `querySelector` : Select first matching element, it returns single element, eg. `document.querySelector(".name")`

  * `querySelectorAll` : Select all matching element, it returns NodeList, eg. `document.querySelectorAll(".name")`

---

### 2. How do you create and insert a new element into the DOM?

```javascript
  const child = document.createElement("div");
  div.innerText = "New"
  document.body.appendChild("child");
```

---

### 3. What is Event Bubbling? And how does it work?

  * An event starts from the target element & moves up to its parent element.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

  * Adding an event listener to a parent element to handle events for its child element using event bubbling.

---

### 5. What is the difference between `preventDefault()` and `stopPropagation()` methods?

  * `preventDefault()` - stops the default browser action
  * `stopPropagation()` - stops the event from bubbling to parent elements.
