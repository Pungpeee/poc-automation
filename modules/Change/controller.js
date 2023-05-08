import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { requestWithCredential } from "../../apis/client"
import { formValidate } from "../../utils/formValidate"

const useChangeController = () => {
  const { control, handleSubmit, watch, getValues, setError } = useForm()
  const router = useRouter()
  const { mutate, isLoading, data, error } = useMutation((payload) => {
    return requestWithCredential.post("/api/account/change/password/", payload)
  })

  const onSubmit = handleSubmit((formValues) => {
    return mutate(
      {
        old_password: formValues?.old_password,
        new_password: formValues?.new_password,
      },
      {
        onSuccess: (success) => router.push("/"),
        onError: (res) => setError("old_password", { message: res?.old_password[0] ?? "This field is invalid" }),
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

export default useChangeController
