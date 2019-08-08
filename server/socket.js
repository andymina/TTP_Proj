const roomHandler = require('./server');

// TODO: Error handling
module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log(`${socket.id} has made a connection to the server`);

		socket.on('join-room', (user, room_code) => {
			let room = roomHandler.getRoom(room_code);
			// Check if the room exists
			if (room == false){
				// error handling
				console.log(`Room ${room_code} DNE`);
			} else {
				if (room.join(user)){
					socket.join(room_code);
					socket.room_code = room_code;
					socket.user = user;
					console.log(`${socket.user.username} has joined room ${socket.room_code}`);
					socket.emit('join-success', room);
				} else {
					socket.emit('join-error');
				}
			}
		});

		socket.on('queue-song', (room_code, song) => {
			let room = roomHandler.getRoom(room_code);
			room.enqueue(song);
			socket.emit('queue-success');
		});

		socket.on('disconnect', () => {
			let room = roomHandler.getRoom(socket.room_code);
			room.leave(socket.user);
			socket.leave(socket.room_code);
			console.log(`${socket.user.username} has left room ${socket.room_code}`);

			if (room.current_users.length == 0) roomHandler.destroy(socket.room_code);
		});
	});
}
