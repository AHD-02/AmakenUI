import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { LoginModel } from '../types'
import { router } from 'expo-router'
import { useLoginMutation } from '../data/user'
import { useAppDispatch } from '../state/store'
import { setIsLoading } from '../state/app/slice'
import { setTokens } from '../state/user/slice'
import { SCREENS } from '@/components/screens'
import Toast from 'react-native-toast-message'

const useLogin = () => {
    const dispatch = useAppDispatch()
    const [login, res] = useLoginMutation()
    const  {data, error, isLoading, isSuccess, isError} = res

    const {values, setFieldValue, errors, submitForm} = useFormik({
        validationSchema: yup.object({
            email: yup.string().email('please enter a valid email address').required('required'),
            password: yup.string().required('required'),
        }),
        initialValues: {
            email: '',
            password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values: LoginModel) => {
            await login(values)
        }
    })

    useEffect(() =>{
        dispatch(setIsLoading(isLoading ?? false))
        if(data) {
            dispatch(setTokens({
                accessToken: data.jwt,
                refreshToken: data.refreshToken
            }))
            router.replace(`/${SCREENS.Main}/`)
        }
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'error',
                text2: JSON.stringify((error as any).data ?? '')
            })
            console.log(res)
        }
    },[data, error, isLoading])

  return {values, setFieldValue, errors, submitForm, isSuccess, isError};
}

export default useLogin