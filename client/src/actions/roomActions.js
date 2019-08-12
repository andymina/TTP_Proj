import { UPDATE_ROOM, UPDATE_SONG, UPDATE_MASTER, UPDATE_QUEUE } from './types';

export const updateRoom = (room) => (dispatch) => {
	dispatch({
		type: UPDATE_ROOM,
		payload: room
	});
}

export const updateSong = (song) => (dispatch) => {
	dispatch({
		type: UPDATE_SONG,
		payload: song
	});
}

export const updateMaster = (user) => (dispatch) => {
	dispatch({
		type: UPDATE_MASTER,
		payload: user
	});
}

export const updateQueue = (queue) => (dispatch) => {
	dispatch({
		type: UPDATE_QUEUE,
		payload: queue
	});
}
