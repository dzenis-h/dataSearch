const search = document.getElementById('search');
const matchList = document.getElementById('match');
const test = document.getElementById('test');
let users;

// Get users
const getUsers = async () => {
 const res = await fetch('./data/users.json');
 users = await res.json();
};

// FIlter users
const searchUsers = searchText => {
 // Get matches to current text input
let matches = users.filter(user => {
let regex = new RegExp(`^${searchText}`, 'gi');
let lastName = user.name.split(' ').slice(-1).join(' ');
return user.name.match(regex) || user.comapny.match(regex) || lastName.match(regex)
});

 // Clear when input or matches are empty
 if (searchText.length === 0) {
  matches = [];
  matchList.innerHTML = '';
  test.style.display = 'none'

 }
 outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
 if (matches.length > 0) {
  const html = matches.map(
    match => 
    `<div class="card card-body mb-2 border border-warning rounded-pill border-3 text-center">
    <h4 class="text-primary">${match.name}</h4>
    <b class="text-success"><span class="lead">Email: </span>${match.email}</b>
    <b class="text-danger"><span class="lead">Phone: </span>${match.phone}</b>
    <b class="text-info"><span class="lead">Company: </span>${match.comapny}, LLC</b>
   </div>`).join('');
   matchList.innerHTML = html;
  } else {
    matchList.innerHTML = `
    <div class="text-center mt-4" id="test">
       <h5 class="text-primary alert alert-danger border"> Sorry, no user data found. 
       <br> Please try again!</h5>
    </div>`;
  }
 }

window.addEventListener('DOMContentLoaded', getUsers);
search.addEventListener('input', () => searchUsers(search.value));