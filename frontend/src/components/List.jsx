/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
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

  const { loadingStatus, error } = useSelector((state) => state.guest);
  const guests = useSelector(selectors.selectAll) ?? null;

  return loadingStatus !== 'finish' && !error
    ? (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    )
    : (
      <div className="container">
        <Helmet>
          <title>{t('list.helmetTitle')}</title>
          <meta name="description" content={t('list.helmetTitle')} />
          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <ModalDelete show={modalShow} onHide={() => setModalShow(false)} id={currentId} />
        <h2 className="text-center h2">
          {t('list.title')}
          {t('list.applications_count', { count: guests.length })}
          {t('list.people_count', {
            count: guests.reduce((acc, guest) => {
              acc += guest.peopleCount;
              return acc;
            }, 0),
          })}
        </h2>
        <div className="d-flex flex-wrap justify-content-between">
          {!error && guests.sort((a, b) => b.id - a.id).map((guest) => (
            <Card key={guest.id} className="mb-2 col-12 col-lg-5 anim-show">
              <Card.Body>
                <Card.Title className="text-center fw-bold fs-6 mb-3">
                  {t('list.id')}
                  {guest.id}
                </Card.Title>
                <Card.Subtitle className="mb-2 fw-bold">
                  {guest.name
                    .replace(/\s+/g, ' ')
                    .trim()
                    .split(' ')
                    .map((name) => name.replace(name[0], name[0].toUpperCase()))
                    .join(' ')}
                </Card.Subtitle>
                <Card.Text as="div">
                  <hr />
                  <ul>
                    <li>{t('list.people_count', { count: guest.peopleCount })}</li>
                    <hr />
                    <li>{guest.children === 'Да' ? t('list.children') : t('list.not_children')}</li>
                    <hr />
                    <li>
                      {guest.drinks.length === 1 && guest.drinks[0] === 'Не пью алкоголь'
                        ? t('list.not_alcohol')
                        : t('list.drinks')}
                      {guest.drinks.length > 0 && guest.drinks.legth !== 1 && guest.drinks[0] !== 'Не пью алкоголь' && (
                      <i className="text-muted">
                        {guest.drinks.join(', ')}
                      </i>
                      )}
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
                    <hr />
                    <li>
                      {t('list.date')}
                      <i className="text-muted">
                        {guest.createdAt}
                      </i>
                    </li>
                    <hr />
                  </ul>
                </Card.Text>
                <Bucket
                  role="button"
                  className="fs-3"
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
