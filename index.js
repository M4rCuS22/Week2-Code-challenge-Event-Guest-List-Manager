console.log("JS file loaded!");

const form = document.getElementById('guest-form');
const nameInput = document.getElementById('guest-name');
const categoryInput = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

let guest = [];

form.addEventListener('submit', function (e) {
    console.log('Form submitted')
    e.preventDefault();
    const name = nameInput.value.trim();
    const category = categoryInput.value;

    if(!name) return;
    if(guest.length >= 10) {
        alert('Guest list is full (Limit is 10 people).');
        return;
    }

    const newGuest = {
        Id: Date.now(),
        name,
        category,
        attending: true,
        timestamp: new Date().toLocaleTimeString()
    };

    guest.push(newGuest);
    renderGuest();
    form.reset();
});

function renderGuest() {
    guestList.innerHTML = ``;
ariaValueMax
    guestList.forEach(guest => {
        const li = document.createElement('li');
        li.className = 'guest-item';

        const header = document.createElement('div');
        header.className = guest.name;

        const tag = document.createElement('span');
        tag.className = `tag ${guest.category}`;
        tag.textContent = guest.name;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = guest.name;
        nameSpan.appendChild(tag);
        header.appendChild(nameSpan);

        const time = document.createElement('small');
        time.textContent = `Add at: ${guest.timestamp}`;
        header.appendChild(time);

        li.appendChild(header);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const rsvBtn = document.createElement('button');
        rsvBtn.textContent = guest.attending ? 'Attending' : 'Not Attending'
        rsvBtn.style.background = guest.attending ? '#c8e6c9' : '#ffcdd2';
        rsvBtn.onclick = () => {
            guest.attending = !guest.attending;
            renderGuests();
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.onclick = () => {
            const newName = prompt('Enter new name', guest.name);
            if(newName) {
                guest.name = newName.trim();
                renderGuests();
            }
        };

        actions.appendChild(rsvBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(actions);
        guestList.appendChild(li);
    });
}