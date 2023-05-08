import React from 'react'
import useForgotController from './controller'
import { ForgotForm } from './View'

const Container = () => {

    const { control, formRules, onSubmit } = useForgotController()

    return (
        <ForgotForm
            control={control}
            formRules={formRules}
            onSubmit={onSubmit}
        />
    )
}



export default Container