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


export const AuthorValidationSchema = Yup.object({
    name: Yup.string()
        .min('2', 'Too Short!')
        .required(),
    email: Yup.string()
        .required()
        .email(),
    address: Yup.string()
        .required(),
    phone: Yup.string()
        .required()
    // .matches(phoneRegExp,'Phone Number is Not Valid!')

})
