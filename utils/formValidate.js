export const formValidate = (getValues) => {
  return {
    email: {
      required: {
        value: true,
        message: "This field is required",
      },
      pattern: {
        value: /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        message: "This field is invalid",
      },
    },
    emailRequiredOnly: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
    passwordRequiredOnly: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
    password: {
      required: {
        value: true,
        message: "This field is required",
      },
      validate: {
        isUpperCase: (value) => /[A-Z]/.test(value),
        isLowerCase: (value) => /[a-z]/.test(value),
        containNumber: (value) => /\d/.test(value),
        minimum: (value) => value?.length >= 8,
      },
    },
    confirm_password: {
      required: {
        value: true,
        message: "This field is required",
      },
      validate: (value) => {
        if (value === getValues("password")) {
          return true
        }

        if (value === getValues("new_password")) {
          return true
        }

        return "The password do not match"
      },
    },
    currentPassword: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
    newPassword: {
      required: {
        value: true,
        message: "This field is required",
      },
      validate: (value) => {
        if (/[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && value?.length >= 8) {
          return true
        }
        return "Password Invalid"
      },
    },
  }
}
