const RoomHandler = require('./RoomHandler');

module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log(`${socket.id} has made a connection to the server`);

		socket.on('join-room', (room_code, user) => {
			socket.join(room_code);
			let room = RoomHandler.getRoom(room_code);
			room.join(user);

			console.log(`${user.username} has joined room ${room_code}`);
			socket.emit('join-room-response', room);
		});

		socket.on('disconnect', (room_code) => {
			console.log(`${socket.id} has left room ${room_code}`);
			socket.leave(room_code);
		});
	});
}
