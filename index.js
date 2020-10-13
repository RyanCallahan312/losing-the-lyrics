const fs = require('fs');

const app = require('express')();
const server = require('http').Server(app);

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

app.get('/.well-known/acme-challenge/PHZBpY7iF01e21qaAtWWm95fs-rHC5gZZwXgmabdXNQ', (req, res) => {
    res.sendFile('F:/Personal Docs/Repos/losing-the-lyrics/PHZBpY7iF01e21qaAtWWm95fs-rHC5gZZwXgmabdXNQ.HU1-jb_UpUGyy13Fpr6LUtkl0nCYWYokLdbgqB0H1uQ.txt');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})