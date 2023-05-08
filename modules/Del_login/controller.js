import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { requestAnonymous } from "../../apis/client"
import { formValidate } from "../../utils/formValidate"

const useDelLoginController = () => {
  const { control, handleSubmit, setError } = useForm()
  const router = useRouter()
  const { mutate, isLoading, error, data } = useMutation((payload) => {
    return requestAnonymous.post(`/api/account/login/`, payload)
  })

  const onSubmit = handleSubmit((formValues) => {

    const payload = {
      username: formValues?.username,
      password: formValues?.password,
      is_remember: true,
      is_vekin_login: true
    }

    return mutate(payload,
      {
        onSuccess: (success) => {
          return history.back()
          // console.log(success.status)
        },
        onError: (error) => {
          return setError('password', { message: 'Your email or password is incorrect' })
        },
      }
    )
  })

  return {
    formRules: formValidate(),
    control,
    onSubmit,
  }
}

export default useDelLoginController
