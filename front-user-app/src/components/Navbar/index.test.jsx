import { render, screen } from "@testing-library/react";
import Navbare from "../Navbar";
import { BrowserRouter } from "react-router";

describe("Navbar", () => {
  it("renders the home link", () => {
    render(
      <BrowserRouter>
        <Navbare />
      </BrowserRouter>,
    );
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders the users link", () => {
    render(
      <BrowserRouter>
        <Navbare />
      </BrowserRouter>,
    );
    const usersLink = screen.getByText("Users");
    expect(usersLink).toBeInTheDocument();
    expect(usersLink).toHaveAttribute("href", "/users");
  });

  it("renders logout button", () => {
    render(
      <BrowserRouter>
        <Navbare />
      </BrowserRouter>,
    );
    const logoutButton = screen.getByRole('button', {name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
