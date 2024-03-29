import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { LoginModel } from '../types'
import { router } from 'expo-router'

const useLogin = () => {
    const {values, setFieldValue, errors, submitForm} = useFormik({
        validationSchema: yup.object({
            username: yup.string().required('required'),
            password: yup.string().required('required'),
        }),
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values: LoginModel) => {
            router.replace('/(tabs)')
        }
    })
  return {values, setFieldValue, errors, submitForm}
}

export default useLogin