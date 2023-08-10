/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Card } from 'react-bootstrap';
import { Bucket } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { fetchLoading, selectors } from '../slices/guestSlice.js';
import { ModalDelete } from './Modals.jsx';

const List = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [currentId, setDeleteId] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchLoading());
  }, [dispatch]);

  const { loadingStatus } = useSelector((state) => state.guest);
  const guests = useSelector(selectors.selectAll);

  return loadingStatus !== 'finish'
    ? (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    )
    : (
      <div className="container">
        <ModalDelete show={modalShow} onHide={() => setModalShow(false)} id={currentId} />
        <h2 className="text-center h2">
          {t('list.title')}
          {t('list.people_count', { count: guests.length })}
        </h2>
        <div className="d-flex flex-wrap justify-content-between">
          {guests.sort((a, b) => b.id - a.id).map((guest) => (
            <Card key={guest.id} className="mb-2 col-12 col-lg-5 anim-show">
              <Card.Body>
                <Card.Title className="text-center fw-bold fs-6 mb-3">
                  {t('list.id')}
                  {guest.id}
                </Card.Title>
                <Card.Subtitle className="mb-2 fw-bold">{guest.name}</Card.Subtitle>
                <Card.Text as="div">
                  <hr />
                  <ul>
                    <li>{t('list.people_count', { count: guest.peopleCount })}</li>
                    <hr />
                    <li>{guest.children === 'Да' ? t('list.children') : t('list.not_children')}</li>
                    <hr />
                    <li>
                      {t('list.drinks')}
                      <i className="text-muted">
                        {guest.drinks.join(', ')}
                      </i>
                    </li>
                    {guest.subAllergy && (
                    <>
                      <hr />
                      <li>
                        {t('list.allergy')}
                        <i className="text-muted">
                          {guest.subAllergy}
                        </i>
                      </li>
                    </>
                    )}
                    <hr />
                    <li>
                      {t('list.foods')}
                      <i className="text-muted">
                        {guest.foods}
                      </i>
                    </li>
                    <hr />
                    <li>
                      {t('list.guest')}
                      <i className="text-muted">
                        {guest.guest}
                      </i>
                    </li>
                  </ul>
                  <hr />
                </Card.Text>
                <Bucket
                  role="button"
                  className="fs-3 mt-2"
                  onClick={() => {
                    setDeleteId(guest.id);
                    setModalShow(true);
                  }}
                  title={t('list.delete')}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
};

export default List;
