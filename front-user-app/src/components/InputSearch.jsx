const InputSearch = ({ value, onChange }) => {
  return (
    <>
      <div className="input-group w-25">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputSearch;
