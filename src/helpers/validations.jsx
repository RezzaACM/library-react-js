import * as Yup from 'yup';

export const BookValidationSchema = Yup.object({
    title: Yup.string()
        .min('1', 'Too Short!')
        .required('Title is required!'),
    author: Yup.string()
        .required('Author is required'),
    description: Yup.string()
        .required('Description is required')
        .max('50', 'Text too long!'),
    stock: Yup.number()
        .required('Stock is required')
})
