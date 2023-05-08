import React from "react"
import Input from "./Form/Input"
import Text from "./Text"

const FieldSet = ({ label, meta, ...rest }) => {
  const { error } = rest

  return (
    <>
      <Text as="label" type="12" color="label">
        {label}
      </Text>
      <Input {...rest} />
      {meta && (
        <Text type="12" color={error ? "red" : "gray600"}>
          {meta}
        </Text>
      )}
    </>
  )
}

export default FieldSet
