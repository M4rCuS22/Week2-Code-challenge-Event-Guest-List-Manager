# Week2-Code-challenge-Event-Guest-List-Manager

A simple web app that lets users manage guests for an event. Built with HTML, CSS, and JavaScript.

## Features

Add a guest with a name and category (Friend, Family, Colleague)
Limit guest list to 10 entries
Toggle RSVP status: “Attending” or “Not Attending”
Remove guests from the list
Clean layout and responsive behavior

---

## Demo

1. Open `index.html` in your browser
2. Fill in a name and category
3. Click **Add Guest**
4. Use **RSVP** or **Remove** buttons to manage your list

---

## Code Overview

### `index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Guest List</title>
  <style>
    ul { padding-left: 0; }
    li { margin: 10px 0; list-style: none; background: #f1f1f1; padding: 10px; border-radius: 5px; }
  </style>
</head>
<body>

  <form id="guest-form">
    <input type="text" id="guest-name" placeholder="Enter name" />
    <select id="guest-category">
      <option value="Friend">Friend</option>
      <option value="Family">Family</option>
      <option value="Colleague">Colleague</option>
    </select>
    <button type="submit">Add Guest</button>
  </form>

  <ul id="guest-list"></ul>

  <script src="index.js"></script>
</body>
</html>

index.js

console.log("JS file loaded!");

const form = document.getElementById('guest-form');
const nameInput = document.getElementById('guest-name');
const categoryInput = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

let guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log("Form submitted");

  const name = nameInput.value.trim();
  const category = categoryInput.value;

  if (!name) return;
  if (guests.length >= 10) {
    alert('Guest list is full (10 max).');
    return;
  }

  guests.push({ id: Date.now(), name, category, attending: true });
  renderGuests();
  form.reset();
});

function renderGuests() {
  guestList.innerHTML = '';

  guests.forEach(guest => {
    const li = document.createElement('li');
    li.textContent = `${guest.name} - ${guest.category}`;

    const rsvpBtn = document.createElement('button');
    rsvpBtn.textContent = guest.attending ? 'Attending' : 'Not Attending';
    rsvpBtn.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    };

    li.appendChild(document.createTextNode(' '));
    li.appendChild(rsvpBtn);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(removeBtn);

    guestList.appendChild(li);
  });
}