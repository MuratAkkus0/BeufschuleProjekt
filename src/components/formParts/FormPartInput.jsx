export default function FormPartInput(props) {
  const {
    labelFor,
    labelText,
    onValueChange,
    inputValue,
    isDisabled,
    isRequired,
    placeHolder,
    inputPattern,
  } = props;

  return (
    <>
      <div className="form__part">
        <label className="labels" htmlFor={labelFor}>
          {labelText}
        </label>
        <input
          onChange={onValueChange}
          value={inputValue}
          type="text"
          id={labelFor}
          name={labelFor}
          disabled={isDisabled}
          placeholder={placeHolder}
          pattern={inputPattern}
          required={isRequired}
        />
      </div>
    </>
  );
}
