const Realm = require('realm-web');
const jwt = require('jsonwebtoken');
const realmApp = new Realm.App({ id: 'realmID' }); // Replace with your Realm App ID
async function login(username, password, email) {
  try {
    const response = await fetch('http://localhost:3001/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });
    const { token } = await response.json();
    const credentials = Realm.Credentials.jwt(token);
    const user = await realmApp.logIn(credentials);
    user.profile.email = email
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

// Example usage of the login function
login('user2', 'password2', "yashhhhh3@gmail.com");