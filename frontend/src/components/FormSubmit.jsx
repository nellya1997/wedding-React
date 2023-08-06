import { useContext, useState } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import cn from 'classnames';
import ApiContext from './Context.jsx';
import { ModalSuccess } from './Modals.jsx';
import formValidation from '../validations/validations.js';
import routes from '../routes.js';

const FormSubmit = ({ isMobile }) => {
  const notify = (text, type) => toast[type](text);
  const { addData } = useContext(ApiContext);
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      foods: [],
      alcohol: [],
      transfer: t('form.transfer.no'),
      children: t('form.children.no'),
      beds: '1',
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

  return (
    <>
      <ModalSuccess show={modalShow} onHide={() => setModalShow(false)} />
      <Form
        onSubmit={formik.handleSubmit}
        className="mx-auto col-12 col-lg-9"
      >
        <h5 className={cn('mb-4 text-center', {
          'fs-5': isMobile,
        })}
        >
          {t('form.title')}
        </h5>
        <Form.Group
          className={cn('form-floating', {
            'mb-3': !formik.errors.name && formik.touched.name,
            'mb-5': formik.errors.name && formik.touched.name,
          })}
          controlId="name"
        >
          <FloatingLabel className={formik.values.name && 'filled'} label={t('form.name')} controlId="name">
            <Form.Control
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoFocus
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
        <Form.Group
          className="form-floating mb-5"
          controlId="phone"
        >
          <FloatingLabel className={formik.values.phone && 'filled'} label={t('form.phone')} controlId="phone">
            <Form.Control
              as={InputMask}
              mask="+7 (999)-999-99-99"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.phone}
              disabled={formik.isSubmitting}
              isInvalid={formik.errors.phone && formik.touched.phone}
              onBlur={formik.handleBlur}
              name="phone"
              placeholder={t('form.phone')}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip placement="right">
              {t(formik.errors.phone)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <h4 className="mb-3">{t('form.foods.title')}</h4>
        <Form.Check
          className="mb-2"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="checkbox"
          id="meat"
          name="foods"
          label={t('form.foods.meat')}
          value={t('form.foods.meat')}
          checked={formik.values.foods.includes(t('form.foods.meat'))}
        />
        <Form.Check
          className="mb-2"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="checkbox"
          id="fish"
          name="foods"
          label={t('form.foods.fish')}
          value={t('form.foods.fish')}
          checked={formik.values.foods.includes(t('form.foods.fish'))}
        />
        <Form.Check
          className="mb-5"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="checkbox"
          id="vegetables"
          name="foods"
          label={t('form.foods.vegetables')}
          value={t('form.foods.vegetables')}
          checked={formik.values.foods.includes(t('form.foods.vegetables'))}
        />
        <h4 className="mb-3">{t('form.alcohol.title')}</h4>
        <Form.Check
          className="mb-2"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="checkbox"
          id="strong"
          name="alcohol"
          label={t('form.alcohol.strong')}
          value={t('form.alcohol.strong')}
          checked={formik.values.alcohol.includes(t('form.alcohol.strong'))}
        />
        <Form.Check
          className="mb-2"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="checkbox"
          id="wine"
          name="alcohol"
          label={t('form.alcohol.wine')}
          value={t('form.alcohol.wine')}
          checked={formik.values.alcohol.includes(t('form.alcohol.wine'))}
        />
        <Form.Check
          className="mb-5"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="checkbox"
          id="beer"
          name="alcohol"
          label={t('form.alcohol.beer')}
          value={t('form.alcohol.beer')}
          checked={formik.values.alcohol.includes(t('form.alcohol.beer'))}
        />
        <h4 className="mb-3">{t('form.transfer.title')}</h4>
        <Form.Check
          className="mb-2"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="radio"
          id="transfer-yes"
          name="transfer"
          label={t('form.transfer.yes')}
          value={t('form.transfer.yes')}
          checked={formik.values.transfer.includes(t('form.transfer.yes'))}
        />
        <Form.Check
          className="mb-5"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="radio"
          id="transfer-no"
          name="transfer"
          label={t('form.transfer.no')}
          value={t('form.transfer.no')}
          checked={formik.values.transfer.includes(t('form.transfer.no'))}
          defaultChecked
        />
        <h4 className="mb-3">{t('form.children.title')}</h4>
        <Form.Check
          className="mb-2"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="radio"
          id="children-yes"
          name="children"
          label={t('form.children.yes')}
          value={t('form.children.yes')}
          checked={formik.values.children.includes(t('form.children.yes'))}
        />
        <Form.Check
          className="mb-5"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="radio"
          id="children-no"
          name="children"
          label={t('form.children.no')}
          value={t('form.children.no')}
          checked={formik.values.children.includes(t('form.children.no'))}
          defaultChecked
        />
        <h4 className="mb-3">{t('form.beds.title')}</h4>
        <Form.Check
          className="mb-2"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="radio"
          id="beds-yes"
          name="beds"
          label={t('form.beds.yes')}
          value="2"
          checked={formik.values.beds.includes('2')}
        />
        <Form.Check
          className="mb-5"
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          onBlur={formik.handleBlur}
          type="radio"
          id="beds-no"
          name="beds"
          label={t('form.beds.no')}
          value="1"
          checked={formik.values.beds.includes('1')}
          defaultChecked
        />
        <Button variant="outline-primary" className="w-100" type="submit">{t('form.submit')}</Button>
      </Form>
    </>
  );
};

export default FormSubmit;
