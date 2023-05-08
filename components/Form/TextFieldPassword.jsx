import React from "react"
import { Controller } from "react-hook-form"
import Text from "../Text"
import InputPassword from "./InputPassword"

const TextField = ({
  name,
  rules,
  label,
  meta,
  control = {},
  normalize,
  renderCustomError,
  isRequired,
  hiddenError,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error }, formState: { errors } }) => {
        const onChangeHandler = (e) => {
          const val = e.target.value
          const isPassRule = normalize ? normalize(val) : true

          if (val && !isPassRule) {
            return
          }

          field.onChange(val)
        }
        return (
          <>
            <Text as="label" type="12" color="label">
              {label} {isRequired && <Text color="red100">*</Text>}
            </Text>
            <InputPassword {...field} {...rest} onChange={onChangeHandler} />
            {meta && (
              <Text type="12" color={"gray600"} as="div">
                {meta}
              </Text>
            )}
            {error ? (
              <Text type="12" color={"red"} as="div">
                {error?.message}
              </Text>
            ) : null}
          </>
        )
      }}
    />
  )
}

export default TextField
