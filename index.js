const mainDiv = document.querySelector('div.main-display');
const userInfo = document.querySelector('div.user-info');
let navUl = document.querySelector('ul.nav-ul');
let allUsers;
let allGames;
let currentUser;

navUlEvent();
fetchAllGames();

function fetchAllGames(){
    fetch('http://localhost:3000/games')
    .then(res => res.json())
    .then(gamesArr => {
        allGames = gamesArr;
        allGames.forEach(game => {
            let imgDiv = document.createElement('div');
            imgDiv.className = 'image-div';
            let img = document.createElement('img');
            img.src = game.image;
            imgDiv.append(img);
            mainDiv.append(imgDiv);
        })
    })
}
function navUlEvent(){
    navUl.addEventListener('click', function(e){
        if (e.target.matches('li#signup')){
            userInfo.innerHTML = `
            <div class="signup-form">
                <form id="new-user">
                    <h2>Sign Up</h2>
                    <label for="name">Name: </label>
                    <input type="text" name="name" id="new-name" /><br>
                    <label for="email">Email: </label>
                    <input type="email" name="email" id="new-email" /><br>
                    <label for="username">Username: </label>
                    <input type="text" name="username" id="new-username" /><br>
                    <label for="age">Age: </label>
                    <input type="number" name="age" id="new-age" /><br>
                    <label for="location">Location: </label>
                    <select name="location" id="new-location">
                    <option value="" selected="selected">Select a State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    </select><br>
                    <label for="image">Image: </label>
                    <input type="text" name="image" id="new-image" /><br>
                    <input type="submit" value="Create Account" />
                </form>
            </div>
            `;
            createAccEvent();

        } else if (e.target.matches('li#login')){
            userInfo.innerHTML = `
            <form id="login-form">
                <label for="email">Email: </label>
                <input type="email" name="email" id="login-email" placeholder="Insert Email Here" /><br>
                <label for="username">Username: </label>
                <input type="text" name="username" id="login-username" placeholder="Insert Username Here"/><br>
                <input type="submit" value="Login" />
            </form>
            `;
            loginEvent();
        }
    })
}
function createAccEvent(){
    const signUpForm = document.querySelector('form#new-user');
    signUpForm.addEventListener('submit', function(e){
        e.preventDefault();
        let name = e.target.name.value;
        let email = e.target.email.value;
        let username = e.target.username.value;
        let age = e.target.age.value;
        let location = e.target.location.value;
        let image = e.target.image.value;
        let newUser = {
            name: name,
            email: email,
            username: username,
            age: age,
            location: location,
            image: image
        }
        addNewUserToDB(newUser);
    })
}
function addNewUserToDB(newUser){
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(res => res.json())
    .then(user => {
        console.log(user)
        userInfo.innerHTML = `
            <img src='${user.image}' alt='${user.name}'s picture' id='image' width=100 height=200>
            <h1 id='name'>Welcome: ${user.name}</h1><br>
            <h2 id='email'>Email: ${user.email}</h2><br>
            <h2 id='username'>Username: ${user.username}</h2><br>
            <h3 id='age'>Age: ${user.age}</h3><br>
            <h3 id='location'>Location: ${user.location}</h3><br>
            <h6 id='status'>Status: ${userStatus(user.status)}</h6>
        `;
        navUl.innerHTML = `
                <li class='nav-selection' id='users'>Users</li>
                <li class='nav-selection' id='games'>Games</li>
                <li class='nav-selection' id='badges'>Badges</li>
                <li class='nav-selection' id='welcome'>Welcome: ${user.name}</li>
            `;
        //load the user's info on the user-info div
    })
}
function userStatus(status){
    if (status) {
        return "Online";
    } else {
        return "Offline";
    }
}
function loginEvent(){
    const loginForm = document.querySelector('form#login-form');
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        let loginEmail = e.target.email.value;
        let loginUsername = e.target.username.value;
        let loginObj = {
            email: loginEmail,
            username: loginUsername
        }
        fetchLoggedInUser(loginObj);
    })
}
function fetchLoggedInUser(loginObj){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(usersArr => {
        allUsers = usersArr;
        if (allUsers.find(user => user.email === loginObj.email && user.username === loginObj.username)){
            currentUser = allUsers.find(user => user.email === loginObj.email && user.username === loginObj.username);
            userInfo.innerHTML = `
            <img src='${currentUser.image}' alt='${currentUser.name}'s picture' id='image' width=100 height=200>
            <h1 id='name'>Welcome: ${currentUser.name}</h1><br>
            <h2 id='email'>Email: ${currentUser.email}</h2><br>
            <h2 id='username'>Username: ${currentUser.username}</h2><br>
            <h3 id='age'>Age: ${currentUser.age}</h3><br>
            <h3 id='location'>Location: ${currentUser.location}</h3><br>
            <h6 id='status'>Status: ${userStatus(currentUser.status)}</h6>
            `;
            navUl.innerHTML = `
                <li class='nav-selection' id='users'>Users</li>
                <li class='nav-selection' id='games'>Games</li>
                <li class='nav-selection' id='badges'>Badges</li>
                <li class='nav-selection' id='welcome'>Welcome: ${currentUser.name}</li>
            `;
        } else {
            alert("Your email/username has not been found!");
        }
    })
}