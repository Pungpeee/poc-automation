import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { requestAnonymous } from "../../apis/client"
import { termApi } from "../../apis"
import { formValidate } from "../../utils/formValidate"

const useRegisterController = () => {
  const router = useRouter()
  const [consentModal, setConsentModal] = useState(false)

  const [stampForm, setStampForm] = useState(null)

  const { control, handleSubmit, watch, getValues, setError } = useForm({
    defaultValues: {
      email: router?.query?.email,
    },
  })
  const { mutate, isLoading } = useMutation((payload) => {
    return requestAnonymous.post("/api/account/register/", payload)
  })

  const { data: termData } = useQuery("term-condition", () => {
    return termApi.getTermCondition({ page: 0 })
  })

  const onSubmit = handleSubmit((formValues) => {
    const payload = {
      email: formValues.email,
      password: formValues.password,
      confirm_password: formValues.confirm_password,
      is_accepted_active_consent: true,
    }
    setConsentModal(true)
    setStampForm(payload)
  })

  const handleRegister = () => {
    return mutate(stampForm, {
      onSuccess: (success) => router.push("/verify-email"),
      onError: (error) => {
        switch (error?.response?.data?.detail) {
          case "email_has_been_already_use":
            setError("email", { message: "Email has been already used." })
            break
          default:
            setError("confirm_password", { message: error?.response?.data?.detail })
            break
        }
        setConsentModal(false)
      },
    })
  }

  return {
    statePwdValue: watch("password"),
    control,
    formRules: formValidate(getValues),
    consentModal,
    isLoading,
    termData,
    onSubmit,
    setConsentModal,
    handleRegister,
  }
}

export default useRegisterController
