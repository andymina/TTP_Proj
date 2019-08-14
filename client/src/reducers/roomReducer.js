import { UPDATE_ROOM, UPDATE_SONG, UPDATE_MASTER, UPDATE_QUEUE, QUEUE_SONG } from '../actions/types';

const initialState = {
	song: {},
	master: {},
	playlist: {},
	current_users: [],
	queue: [],
	room_code: "",
	is_playing: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_ROOM:
			return {
				...state,
				...action.payload
			};

		case UPDATE_SONG:
			return {
				...state,
				song: action.payload
			};

		case UPDATE_MASTER:
			return {
				...state,
				master: action.payload
			};

		case UPDATE_QUEUE:
			return {
				...state,
				queue: action.payload
			};

		case QUEUE_SONG:
			return {
				...state,
				queue: action.payload
			}

		default:
			return state;
	}
}
