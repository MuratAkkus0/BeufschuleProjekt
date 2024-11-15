function FormPartDate(props) {
  const { labelFor, labelText, isRequired = false } = props;
  return (
    <>
      <div className="form__part">
        <label className="labels" htmlFor={labelFor}>
          {labelText}
        </label>
        <input
          type="date"
          name={labelFor}
          id={labelFor}
          required={isRequired}
          max={new Date().toJSON().slice(0, 10)}
        />
      </div>
    </>
  );
}

export default FormPartDate;
