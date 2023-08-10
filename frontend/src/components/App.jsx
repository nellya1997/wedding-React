import { Provider } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import store from '../slices/index.js';
import List from './List.jsx';
import { actions } from '../slices/guestSlice.js';
import ApiContext from './Context.jsx';
import General from './General.jsx';

const App = () => {
  const socket = io();
  const socketConnect = useCallback((param, arg) => socket.emit(param, arg), [socket]);

  const socketApi = useMemo(() => ({
    addGuest: (guest) => socketConnect('addGuest', guest),
    removeGuest: (guest) => socketConnect('removeGuest', guest),
  }), [socketConnect]);

  socket.on('addGuest', (guest) => store.dispatch(actions.addGuest(guest)));
  socket.on('removeGuest', (guest) => store.dispatch(actions.removeGuest(guest)));

  return (
    <Provider store={store}>
      <ApiContext.Provider value={socketApi}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/list" element={<List />} />
            <Route path="*" element={<General />} />
          </Routes>
        </BrowserRouter>
      </ApiContext.Provider>
    </Provider>
  );
};

export default App;
