import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { requestAnonymous, test } from "../../apis/client"
import { formValidate } from "../../utils/formValidate"

const useLoginController = () => {
  const { control, handleSubmit } = useForm()
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const { mutate, isLoading, error, data } = useMutation((payload) => {
    return requestAnonymous.post(`/api/account/login/`, payload)
  })

  const { mutate: mutateSSO } = useMutation((payload) => {
    return requestAnonymous.post(`/api/account/login_sso/`, payload)
  })

  const onSubmit = handleSubmit((formValues) => {
    const payload = {
      username: formValues?.username,
      password: formValues?.password,
      is_remember: true,
      is_vekin_login: true,
    }

    return mutate(payload, {
      onSuccess: (success) => {
        return (window.location.href = "/")
      },
      onError: (error) => {
        return setIsError(true)
      },
    })
  })
  const onSubmit_SSO = handleSubmit((formValues) => {
    const payload = {
      username: formValues?.username,
      password: formValues?.password,
      site: "co2",
      profile_url: "https://co2-api-dev.vekin.co.th/backend/api/account/is-authenticated/",
    }

    return mutateSSO(payload, {
      onSuccess: (success) => {
        // setSSOKeys(success?.data.SSO)
        window.location.href = "/"
        // console.log(success.data.SSO)
      },
      onError: (error) => {
        return setIsError(true)
      },
    })
  })

  return {
    formRules: formValidate(),
    control,
    onSubmit,
    onSubmit_SSO,
    isError,
    router,
  }
}

export default useLoginController
