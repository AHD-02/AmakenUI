import React from 'react'
import { useFormik } from 'formik'
import { router } from 'expo-router'
import { SignUpInitialValues, SignUpValidationSchema, SignupModel } from '../types/user/signup'

const useSignUp = () => {
    const {values, setFieldValue, errors, submitForm} = useFormik({
        validationSchema: SignUpValidationSchema,
        initialValues: SignUpInitialValues,
        onSubmit: (values: SignupModel) => {
            router.replace('/(tabs)')
        }
    })
  return {values, setFieldValue, errors, submitForm};
}

export default useSignUp