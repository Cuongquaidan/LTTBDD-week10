import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/noteReducer'; // Change to noteReducer
import noteSaga from '../sagas/noteSaga'; // Change to noteSaga

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(noteSaga);

export default store;