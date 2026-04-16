// statless

const Navbare = () =>
  <nav className="navbar navbar-dark bg-dark px-3">
    <a className="navbar-brand" href="/">
      Home
    </a>
    <a className="navbar-brand" href="/users">
      Users
    </a>
    <button className="btn btn-outline-light ms-auto">Logout</button>
  </nav>

export default Navbare;
