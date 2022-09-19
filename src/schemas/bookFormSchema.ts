import * as Yup from 'yup'

export const BookSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  author_id: Yup.string().required('Required'),
  genre_id: Yup.string().required('Required'),
  available: Yup.boolean().required('Required'),
  in_stock: Yup.number().required('Required').min(0, 'Must be greater than 0'),
  published_date: Yup.date().required('Required'),
})
