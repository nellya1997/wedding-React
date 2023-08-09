import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: () => ('validation.required'),
  },
  string: {
    min: () => ('validation.requirements'),
    max: () => ('validation.requirements'),
  },
});

export default () => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(20),
  children: yup
    .string()
    .nonNullable('Выберете один вариант'),
  drinks: yup
    .array()
    .min(1, 'Необходимо выбрать минимум один вариант'),
  allergy: yup
    .string()
    .nonNullable('Выберете один вариант'),
  subAllergy: yup
    .string()
    .trim()
    .required()
    .min(3)
    .max(30),
});
