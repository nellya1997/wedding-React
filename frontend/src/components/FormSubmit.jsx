import { useContext, useState } from 'react';
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
  const { addData } = useContext(ApiContext);
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
      foods: [],
      children: null,
    },
    validationSchema: formValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(routes.add, values);
        if (res.status === 200) {
          addData(res.data);
          resetForm();
          setModalShow(true);
          notify(t('toast.guest_add'), 'success');
        } else {
          notify(t('toast.error'), 'error');
        }
      } catch (e) {
        notify(t('toast.error'), 'error');
      }
    },
  });

  const formClass = (field) => cn('form-floating', {
    'mb-2': !formik.errors[field],
    'mb-3-5': formik.errors[field] && formik.touched[field],
  });

  return (
    <>
      <ModalSuccess show={modalShow} onHide={() => setModalShow(false)} />
      <Form
        onSubmit={formik.handleSubmit}
        className="form-submit mx-auto col-12 col-lg-9"
      >
        <h2 className="text-center h2">
          {t('form.title')}
        </h2>
        <p className="text-center mb-4 fs-6">{t('form.sub_title')}</p>
        <Form.Group className={formClass('name')} controlId="name">
          <FloatingLabel label={t('form.name')} controlId="name">
            <Form.Control
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.name && formik.touched.name}
              onBlur={formik.handleBlur}
              name="name"
              placeholder={t('form.name')}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip placement="right">
              {t(formik.errors.name)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <p className="mb-3 title text-muted">{t('form.people_count')}</p>
        <div className="mb-3 d-flex justify-content-between align-items-center gap-4 col-6">
          <PlusLg className="col-2 fs-4" aria-label="plus" role="button" tabIndex={0} onClick={peopleIncrement} onKeyDown={peopleIncrement} />
          <span className="count-people text-muted fw-bold col-2 d-flex justify-content-center align-items-center">{peopleCount}</span>
          <DashLg className="col-2 fs-4" aria-label="minus" role="button" tabIndex={0} onClick={peopleDecrement} onKeyDown={peopleDecrement} />
        </div>
        <p className="title text-muted">{t('form.children.title')}</p>
        <Form.Group className={cn({
          'mb-2': !formik.errors.children,
          'mb-3-5': formik.errors.children && formik.touched.children,
        })}
        >
          <Form.Check
            isInvalid={formik.errors.children && formik.touched.children}
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
        <Form.Group className={cn({
          'mb-2': !formik.errors.drinks,
          'mb-3-5': formik.errors.drinks && formik.touched.drinks,
        })}
        >
          <div className="d-flex">
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
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
          <div className="d-flex  position-relative">
            <Form.Check
              className="col-6"
              inline
              isInvalid={formik.errors.drinks && formik.touched.drinks}
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
        <Form.Group className={cn('d-flex', {
          'mb-2': !formik.errors.allergy,
          'mb-3-5': formik.errors.allergy && formik.touched.allergy,
        })}
        >
          <Form.Check
            inline
            className="position-relative col-6"
            isInvalid={formik.errors.allergy && formik.touched.allergy}
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
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
          className={cn('form-floating', {
            'mb-2': !formik.errors.subAllergy && formik.touched.subAllergy,
            'mb-3-5': formik.errors.subAllergy && formik.touched.subAllergy,
            'd-none': formik.values.allergy !== t('form.allergy.yes'),
          })}
          controlId="sub-allergy"
        >
          <FloatingLabel label={t('form.allergy.sub_title')} controlId="sub-allergy">
            <Form.Control
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.subAllergy}
              isInvalid={!formik.errors.subAllergy && formik.values.allergy === t('form.allergy.yes')}
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
        <Button variant="outline-primary" className="d-block mx-auto w-50" type="submit">{t('form.submit')}</Button>
      </Form>
    </>
  );
};

export default FormSubmit;
