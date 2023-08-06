import { Provider } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArrowThroughHeart } from 'react-bootstrap-icons';
import cn from 'classnames';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import store from '../slices/index.js';
import FormSubmit from './FormSubmit.jsx';
import List from './List.jsx';
import { actions } from '../slices/dataSlice.js';
import ApiContext from './Context.jsx';

const App = () => {
  const isMobile = window.screen.width <= 768;
  const { t } = useTranslation();

  const socket = io();
  const socketConnect = useCallback((param, arg) => {
    socket.emit(param, arg);
  }, [socket]);
  const socketApi = useMemo(() => ({
    addLike: (like) => socketConnect('addLike', like),
    removeLike: (like) => socketConnect('removeLike', like),
    addData: (data) => socketConnect('addData', data),
    removeData: (data) => socketConnect('removeData', data),
  }), [socketConnect]);

  socket.on('addLike', (data) => store.dispatch(actions.addLike(data)));
  socket.on('removeLike', (data) => store.dispatch(actions.removeLike(data)));
  socket.on('addData', (data) => store.dispatch(actions.addData(data)));
  socket.on('removeData', (data) => store.dispatch(actions.removeData(data)));

  return (
    <Provider store={store}>
      <ApiContext.Provider value={socketApi}>
        <div className="mb-2 text-center text-danger">
          {/* <h1 className={cn({
            'fs-3': !isMobile,
            'fs-5': isMobile,
          })}
          >
            <ArrowThroughHeart className="me-2" />
            {t('title')}
            <ArrowThroughHeart className="ms-2" />
          </h1> */}
        </div>
        <hr className="mt-4 mb-4" />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <BrowserRouter>
                <ToastContainer />
                <Routes>
                  <Route path="/" element={<FormSubmit isMobile={isMobile} />} />
                  <Route path="/list" element={<List isMobile={isMobile} />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </div>
        <hr className="mt-4 mb-4" />
      </ApiContext.Provider>
    </Provider>
  );
};

export default App;
