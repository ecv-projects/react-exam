const handleChangeField = ({ target: { name, value } }, onChangeField, validateFields, setErrors, errors) => {
  onChangeField(name, value)
  const error = validateFields(name, value)
  setErrors({
    ...errors,
    [name]: error
  })
}

export default handleChangeField;
