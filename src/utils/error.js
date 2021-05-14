const checkAllErrors = (errors, validateFields, fields, setErrors) => {
    let flagError = false
    let newErrors = {...errors}

    Object.keys(fields).forEach(field => {
      const error = validateFields(field, fields[field])
      if (error !== '') {
        flagError = true
      }

      newErrors = {
        ...newErrors,
        [field]: error
      }
    })
    setErrors(newErrors)

    return flagError
  }

  export default checkAllErrors;