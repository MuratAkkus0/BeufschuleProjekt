function FormPartSelect(props) {
  const {
    labelFor,
    labelText,
    optionList = [],
    optionalTextFirst = "",
    optionalTextLast = "",
    selectValue,
    onValueChange,
    optionValue,
  } = props;
  return (
    <div className="form__part">
      <label className="labels" htmlFor={labelFor}>
        {labelText}
      </label>
      <select
        onChange={onValueChange}
        name={labelFor}
        id={labelFor}
        value={selectValue}
      >
        {optionList &&
          optionList.map((item, index) => {
            return (
              <option key={index} value={optionValue ?? item}>
                {optionalTextFirst} {item} {optionalTextLast}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default FormPartSelect;
