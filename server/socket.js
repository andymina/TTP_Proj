module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log(socket.id, " has made a connection to the server");

		socket.on('join-room', (data) => {
			console.log(socket.id, " has joined room " + data);
		});

		socket.on('leave-room', (data) => {
			console.log(socket.id, " has left the room");
		});
	});
}
