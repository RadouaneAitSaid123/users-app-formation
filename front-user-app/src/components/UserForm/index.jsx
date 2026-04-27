const UserForm = ({ handleChange, handleSubmit, user, label }) => {
  return (
    <div className="card shadow-sm p-4 mt-4">
      <h2 className="mb-4">{label} User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        aria-label="user form"
      >
        <div className="mb-3">
          <label className="form-label fw-bold">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter user name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Lastname:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter user lastname"
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter user email"
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold">Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter user phone"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-100">
          {label}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
