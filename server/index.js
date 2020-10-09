const fs = require('fs');

const app = require('express')();
const next = require('next');
var server = require('https');
try {
	let key = fs.readFileSync('./server/certs/key.pem');
	let cert = fs.readFileSync('./server/certs/cert.pem');
	server = server.createServer({ key: key, cert: cert }, app);
} catch (e) {
	server = require('http').Server(app);
}
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const bindListeners = require('./listeners');

io.existingRoomCodes = [];

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	bindListeners(socket, io);
});

//endpoints
nextApp
	.prepare()
	.then(() => {
		//all nextjs pages
		app.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(port, (err) => {
			if (err) throw err;
			console.log(`> Ready on ${port}`);
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
