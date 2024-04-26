const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
app.use(bodyParser.json()); // Add this line
const secretKey = 'secret key'; // Replace with your actual secret key
const users = [
  { id: 1, username: 'user1', password: 'password1', email:"yashhhhh@gmail.com" },
  { id: 3, username: 'yash', password: 'yash3211', email:"yashhhhh2@gmail.com" },
  { id: 2, username: 'user2', password: 'password2', email:"yashhhhh3@gmail.com" }
];
const jwk = {
  kty: 'RSA',
  n: '...',
  e: '...',
  alg: 'RS256',
  use: 'sig'
};
app.get('/jwk', (req, res) => {
  res.json(jwk);
});
app.post('/login', async (req, res) => {
    const { username, password, email } = req.body;
    const user = users.find(u => u.username === username && u.password === password && u.email == email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const uid = String(user.id);
    if (uid.length < 1 || uid.length > 128) {
      return res.status(500).json({ message: 'Invalid user ID length' });
    }
    const token = jwt.sign({ sub: String(user.id),aud: 'realmID', username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
