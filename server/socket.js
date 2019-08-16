const roomHandler = require('./server');

// TODO: Error handling
module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log(`${socket.id} has made a connection to the server`);

		socket.on('join-room', async (user, room_code) => {
			let room = roomHandler.getRoom(room_code);

			if (room == false){
				// error handling
				console.log(`Room ${room_code} DNE`);
				socket.emit('join-error');
			} else {
				let result = await room.join(user);

				if (result) {
					// Join the sokcet room
					socket.join(room_code);

					// Assign the socket a user
					// obj and a room code for later
					socket.room_code = room_code;
					socket.user = user;

					console.log(`${socket.user.username} has joined room ${socket.room_code}`);

					// Let the client know it has
					// to update its current user obj
					socket.emit('join-success', user);

					// Emit the new room obj to
					// all sockets in the room
					io.in(room_code).emit('update-room', room);
				} else {
					socket.emit('join-error');
				}
			}
		});

		socket.on('queue-song', async (song) => {
			let room = roomHandler.getRoom(socket.room_code);
			await room.enqueue(socket.user, song);
			io.in(socket.room_code).emit('queue-success', room.queue);
		});

		socket.on('play', async () => {
			let room = roomHandler.getRoom(socket.room_code);
			await room.play();
			io.in(socket.room_code).emit('update-song', room.song);
			io.in(socket.room_code).emit('update-queue', room.queue);
			io.in(socket.room_code).emit('update-status', room.is_playing);
		});

		socket.on('pause', async () => {
			let room = roomHandler.getRoom(socket.room_code);
			await room.pause();
			console.log(room.is_playing);
			io.in(socket.room_code).emit('update-status', room.is_playing);
		});

		socket.on('resume', async () => {
			let room = roomHandler.getRoom(socket.room_code);
			await room.resume();
			io.in(socket.room_code).emit('update-status', room.is_playing);
		})

		socket.on('request-song-update', () => {
			let room = roomHandler.getRoom(socket.room_code);

			if (room.queue.length !== 0){
				room.song = room.dequeue();
			} else {
				room.song = {};
			}

			io.in(socket.room_code).emit('update-song', room.song);
			io.in(socket.room_code).emit('update-queue', room.queue);
		});

		socket.on('disconnect', () => {
			let room = roomHandler.getRoom(socket.room_code);

			if (room !== false){
				room.leave(socket.user);
				socket.leave(socket.room_code);

				console.log(`${socket.user.username} has left room ${socket.room_code}`)
				socket.to(socket.room_code).emit('room-update');

				console.log(`Destroy room ${socket.room_code}`);
				if (room.current_users.length == 0) roomHandler.destroy(socket.room_code);
			}
		});
	});
}
