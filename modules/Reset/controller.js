import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { requestWithCredential } from "../../apis/client"
import { formValidate } from "../../utils/formValidate"

const useResetController = () => {
  const { control, handleSubmit, watch, getValues, setError } = useForm()
  const router = useRouter()
  const { mutate, isLoading, data, error } = useMutation((payload) => {
    return requestWithCredential.post("/api/account/reset-password/", payload)
  })

  const onSubmit = handleSubmit((formValues) => {
    return mutate(
      {
        method: router.query.method ?? 0,
        new_password: formValues?.new_password,
        confirm_password: formValues?.confirm_password,
        token: router?.query?.token
      },
      {
        onSuccess: (success) => router.push("/login"),
        onError: (res) => setError("password", { message: res?.old_password[0] ?? "This field is invalid" }),
      }
    )
  })

  return {
    statePwdValue: watch("new_password"),
    control,
    formRules: formValidate(getValues),
    onSubmit,
  }
}

export default useResetController
