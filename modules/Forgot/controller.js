import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { requestAnonymous } from "../../apis/client"
import { formValidate } from "../../utils/formValidate"

const useForgotController = () => {
  const { control, handleSubmit, watch } = useForm()
  const router = useRouter()
  const { mutate, isLoading, data, error } = useMutation((payload) => {
    return requestAnonymous.post("/api/account/forget/password/", payload)
  })

  const onSubmit = handleSubmit((formValues) => {
    return mutate(formValues, {
      onSuccess: (success) => router.push("/forgot-confirm"),
    })
  })

  return {
    statePwdValue: watch("password"),
    control,
    formRules: formValidate(),
    onSubmit,
  }
}

export default useForgotController
