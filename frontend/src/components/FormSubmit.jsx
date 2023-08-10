import { useContext, useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import ApiContext from './Context.jsx';
import { ModalSuccess } from './Modals.jsx';
import formValidation from '../validations/validations.js';
import routes from '../routes.js';

const FormSubmit = () => {
  const notify = (text, type) => toast[type](text);
  const { addGuest } = useContext(ApiContext);
  const [modalShow, setModalShow] = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  const peopleIncrement = () => setPeopleCount(peopleCount + 1);
  const peopleDecrement = () => {
    if (peopleCount > 0) {
      setPeopleCount(peopleCount - 1);
    }
  };
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      peopleCount,
      drinks: [],
      allergy: null,
      subAllergy: '',
      foods: '',
      guest: '',
      children: null,
    },
    validationSchema: formValidation,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (peopleCount === 0) {
          setSubmitting(false);
        }
        if (values.subAllergy === 'plug') {
          values.subAllergy = '';
        }
        if (!t(formik.errors.peopleCount)) {
          const res = await axios.post(routes.add, values);
          if (res.status === 200) {
            notify(t('toast.guest_add'), 'success');
            addGuest(res.data);
            resetForm();
            setModalShow(true);
            setPeopleCount(0);
          } else {
            notify(t('toast.error'), 'error');
          }
        }
      } catch (e) {
        console.log(e);
        notify(t('toast.error'), 'error');
      }
    },
  });

  useEffect(() => {
    formik.values.peopleCount = peopleCount;
    if (peopleCount === 0) {
      formik.setFieldError('peopleCount', 'Укажите количество');
    } else {
      formik.setFieldError('peopleCount', undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, peopleCount]);

  const formClass = (field, classes = '') => cn(classes, {
    'mb-2': true,
    'mb-3-5': formik.errors[field] && formik.touched[field],
  });

  return (
    <>
      <ModalSuccess show={modalShow} onHide={() => setModalShow(false)} />
      <Form
        onSubmit={formik.handleSubmit}
        className="form-submit mx-auto mb-5 col-12 col-lg-9"
      >
        <h2 className="text-center h2">
          {t('form.title')}
        </h2>
        <p className="text-center mb-4 fs-6">{t('form.sub_title')}</p>
        <FloatingLabel label={t('form.name')} controlId="name">
          <Form.Control
            className="mb-4"
            onChange={formik.handleChange}
            value={formik.values.name}
            disabled={formik.isSubmitting}
            isInvalid={formik.errors.name && formik.touched.name}
            isValid={!formik.errors.name && formik.touched.name}
            onBlur={formik.handleBlur}
            name="name"
            placeholder={t('form.name')}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {t(formik.errors.name)}
          </Form.Control.Feedback>
        </FloatingLabel>
        <p className="mb-3 title text-muted">{t('form.people_count')}</p>
        <div className={cn('d-flex col-lg-4 justify-content-between align-items-center gap-4 col-6 position-relative', {
          'mb-3': true,
          'mb-3-5': formik.errors.peopleCount && formik.touched.peopleCount,
        })}
        >
          <PlusLg
            className={cn('col-2 fs-4', {
              'is-invalid': formik.errors.peopleCount && formik.touched.peopleCount,
            })}
            aria-label="plus"
            role="button"
            tabIndex={0}
            onClick={peopleIncrement}
            onKeyDown={peopleIncrement}
          />
          <span className="count-people text-muted fw-bold col-2 d-flex justify-content-center align-items-center">{peopleCount}</span>
          <DashLg className="col-2 fs-4" aria-label="minus" role="button" tabIndex={0} onClick={peopleDecrement} onKeyDown={peopleDecrement} />
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {t(formik.errors.peopleCount)}
          </Form.Control.Feedback>
        </div>
        <p className="mb-3 title text-muted">{t('form.guest.title')}</p>
        <FloatingLabel className="mb-3" label={t('form.guest.example')} controlId="guest">
          <Form.Control
            className={formClass('guest')}
            onChange={formik.handleChange}
            value={formik.values.guest}
            disabled={formik.isSubmitting}
            isInvalid={formik.errors.guest && formik.touched.guest}
            isValid={!formik.errors.guest && formik.touched.guest}
            onBlur={formik.handleBlur}
            name="guest"
            placeholder={t('form.guest.example')}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {t(formik.errors.guest)}
          </Form.Control.Feedback>
        </FloatingLabel>
        <p className="title text-muted">{t('form.children.title')}</p>
        <Form.Group className={formClass('children')}>
          <Form.Check
            isInvalid={formik.errors.children && formik.touched.children}
            isValid={formik.values.children === t('form.children.yes')}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            onBlur={formik.handleBlur}
            type="radio"
            id="children-yes"
            name="children"
            label={t('form.children.yes')}
            value={t('form.children.yes')}
            checked={formik.values.children === t('form.children.yes')}
          />
          <Form.Check
            className="position-relative"
            isInvalid={formik.errors.children && formik.touched.children}
            isValid={formik.values.children === t('form.children.no')}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            onBlur={formik.handleBlur}
            type="radio"
            id="children-no"
            name="children"
            label={t('form.children.no')}
            value={t('form.children.no')}
            checked={formik.values.children === t('form.children.no')}
            feedbackTooltip
            feedbackType="invalid"
            feedback={t(formik.errors.children)}
          />
        </Form.Group>
        <p className="title text-muted">{t('form.drinks.title')}</p>
        <Form.Group className={formClass('drinks', 'col-lg-6')}>
          <Form.Check
            className="d-flex custom-checkbox justify-content-center"
            isInvalid={formik.errors.drinks && formik.touched.drinks}
            isValid={formik.values.drinks.includes(t('form.drinks.non_alcohol'))}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            onBlur={formik.handleBlur}
            type="checkbox"
            id="non_alcohol"
            name="drinks"
            label={t('form.drinks.non_alcohol')}
            value={t('form.drinks.non_alcohol')}
            checked={formik.values.drinks.includes(t('form.drinks.non_alcohol'))}
          />
          <div className="d-flex">
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
              isValid={formik.values.drinks.includes(t('form.drinks.champagne'))}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              type="checkbox"
              id="champagne"
              name="drinks"
              label={t('form.drinks.champagne')}
              value={t('form.drinks.champagne')}
              checked={formik.values.drinks.includes(t('form.drinks.champagne'))}
            />
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
              isValid={formik.values.drinks.includes(t('form.drinks.vodka'))}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              type="checkbox"
              id="vodka"
              name="drinks"
              label={t('form.drinks.vodka')}
              value={t('form.drinks.vodka')}
              checked={formik.values.drinks.includes(t('form.drinks.vodka'))}
            />
          </div>
          <div className="d-flex">
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
              isValid={formik.values.drinks.includes(t('form.drinks.white_wine'))}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              type="checkbox"
              id="white_wine"
              name="drinks"
              label={t('form.drinks.white_wine')}
              value={t('form.drinks.white_wine')}
              checked={formik.values.drinks.includes(t('form.drinks.white_wine'))}
            />
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
              isValid={formik.values.drinks.includes(t('form.drinks.whiskey'))}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              type="checkbox"
              id="whiskey"
              name="drinks"
              label={t('form.drinks.whiskey')}
              value={t('form.drinks.whiskey')}
              checked={formik.values.drinks.includes(t('form.drinks.whiskey'))}
            />
          </div>
          <div className="d-flex position-relative">
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
              isValid={formik.values.drinks.includes(t('form.drinks.red_wine'))}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              type="checkbox"
              id="red_wine"
              name="drinks"
              label={t('form.drinks.red_wine')}
              value={t('form.drinks.red_wine')}
              checked={formik.values.drinks.includes(t('form.drinks.red_wine'))}
              feedbackTooltip
              feedbackType="invalid"
              feedback={t(formik.errors.drinks)}
            />
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
              isValid={formik.values.drinks.includes(t('form.drinks.cognac'))}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              type="checkbox"
              id="cognac"
              name="drinks"
              label={t('form.drinks.cognac')}
              value={t('form.drinks.cognac')}
              checked={formik.values.drinks.includes(t('form.drinks.cognac'))}
            />
          </div>
        </Form.Group>
        <p className="title text-muted">{t('form.allergy.title')}</p>
        <Form.Group className={formClass('allergy', 'd-flex col-lg-6')}>
          <Form.Check
            inline
            className="position-relative col-6"
            isInvalid={formik.errors.allergy && formik.touched.allergy}
            isValid={formik.values.allergy === t('form.allergy.yes')}
            onChange={(e) => {
              formik.setFieldValue('subAllergy', '');
              formik.handleChange(e);
            }}
            disabled={formik.isSubmitting}
            onBlur={formik.handleBlur}
            type="radio"
            id="allergy-yes"
            name="allergy"
            label={t('form.allergy.yes')}
            value={t('form.allergy.yes')}
            checked={formik.values.allergy === t('form.allergy.yes')}
            feedbackTooltip
            feedbackType="invalid"
            feedback={t(formik.errors.allergy)}
          />
          <Form.Check
            inline
            className="col-6"
            isInvalid={formik.errors.allergy && formik.touched.allergy}
            isValid={formik.values.allergy === t('form.allergy.no')}
            onChange={(e) => {
              formik.setFieldValue('subAllergy', 'plug');
              formik.handleChange(e);
            }}
            disabled={formik.isSubmitting}
            onBlur={formik.handleBlur}
            type="radio"
            id="allergy-no"
            name="allergy"
            label={t('form.allergy.no')}
            value={t('form.allergy.no')}
            checked={formik.values.allergy === t('form.allergy.no')}
          />
        </Form.Group>
        <Form.Group
          className={cn({
            'mb-2': !formik.errors.subAllergy && formik.touched.subAllergy,
            'mb-3-5': formik.errors.subAllergy && formik.touched.subAllergy,
            'd-none': formik.values.allergy !== t('form.allergy.yes'),
          })}
          controlId="sub-allergy"
        >
          <FloatingLabel label={t('form.allergy.sub_title')} controlId="sub-allergy">
            <Form.Control
              className={formClass('subAllergy')}
              onChange={formik.handleChange}
              value={formik.values.subAllergy}
              isInvalid={formik.errors.subAllergy && formik.touched.subAllergy}
              onBlur={formik.handleBlur}
              name="subAllergy"
              placeholder={t('form.allergy.sub_title')}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid" tooltip placement="right">
              {t(formik.errors.subAllergy)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <p className="mb-3 title text-muted">{t('form.foods.title')}</p>
        <FloatingLabel className="mb-3" label={t('form.foods.example')} controlId="foods">
          <Form.Control
            className={formClass('foods')}
            onChange={formik.handleChange}
            value={formik.values.foods}
            disabled={formik.isSubmitting}
            isInvalid={formik.errors.foods && formik.touched.foods}
            isValid={!formik.errors.foods && formik.touched.foods}
            onBlur={formik.handleBlur}
            name="foods"
            placeholder={t('form.foods.example')}
            required
          />
          <Form.Control.Feedback type="invalid" tooltip placement="right">
            {t(formik.errors.foods)}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button variant="danger" size="sm" className="d-block mx-auto w-50" type="submit">{t('form.submit')}</Button>
      </Form>
    </>
  );
};

export default FormSubmit;
