import initalStates from './initalStates';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware } from 'redux';

const bindMiddleware = (production, development) => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension');
		return composeWithDevTools(applyMiddleware(...development));
	}
	return applyMiddleware(...production);
};

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		return {
			...state,
			...action.payload,
		};
	} else {
		return reducers(state, action);
	}
};

const initStore = () => {
	return createStore(
		reducer,
		initalStates,
		bindMiddleware([ReduxThunk], [ReduxThunk, ReduxLogger]),
	);
};

export const wrapper = createWrapper(initStore);
