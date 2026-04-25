import { fireEvent, render, screen } from "@testing-library/react";
import UserForm from ".";
import userEvent from "@testing-library/user-event";

describe("UserForm", () => {
  const mockUser = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
  };

  it("renders all four input fields", () => {
    render(
      <UserForm
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        user={mockUser}
        label="Add"
      />,
    );
    const nameInput = screen.getByPlaceholderText("Enter user name");
    expect(nameInput).toBeInTheDocument();

    const lastnameInput = screen.getByPlaceholderText("Enter user lastname");
    expect(lastnameInput).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Enter user email");
    expect(emailInput).toBeInTheDocument();

    const phoneInput = screen.getByPlaceholderText("Enter user phone");
    expect(phoneInput).toBeInTheDocument();
  });

  it("the button label is dynamic", () => {
    render(
      <UserForm
        label="Add"
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        user={mockUser}
      />,
    );
    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();

    render(
      <UserForm
        label="Edit"
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        user={mockUser}
      />,
    );
    const editButton = screen.getByRole("button", { name: "Edit" });
    expect(editButton).toBeInTheDocument();
  });

  it("inputs display the values passed through props", () => {
    render(
      <UserForm
        handleChange={jest.fn()}
        handleSubmit={jest.fn()}
        user={{
          name: "Radouane",
          lastName: "Ait said",
          email: "radouane@ait.com",
          phone: "0623772519",
        }}
      />,
    );

    const nameInput = screen.getByPlaceholderText("Enter user name");
    expect(nameInput).toHaveValue("Radouane");

    const lastnameInput = screen.getByPlaceholderText("Enter user lastname");
    expect(lastnameInput).toHaveValue("Ait said");

    const emailInput = screen.getByPlaceholderText("Enter user email");
    expect(emailInput).toHaveValue("radouane@ait.com");

    const phoneInput = screen.getByPlaceholderText("Enter user phone");
    expect(phoneInput).toHaveValue("0623772519");
  });

  it("calls handleChange when the user types", () => {
    const handleChange = jest.fn();

    render(<UserForm handleChange={handleChange} user={mockUser} />);

    const nameInput = screen.getByPlaceholderText("Enter user name");
    userEvent.type(nameInput, "Radouane");
    expect(handleChange).toHaveBeenCalled();

    const lastnameInput = screen.getByPlaceholderText("Enter user lastname");
    userEvent.type(lastnameInput, "Ait");
    expect(handleChange).toHaveBeenCalled();

    const emailInput = screen.getByPlaceholderText("Enter user email");
    userEvent.type(emailInput, "red@");
    expect(handleChange).toHaveBeenCalled();

    const phoneInput = screen.getByPlaceholderText("Enter user phone");
    userEvent.type(phoneInput, "0765");
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls handleSubmit when user form is submitted", () => {
    const handleSubmit = jest.fn();

    render(
      <UserForm
        handleSubmit={handleSubmit}
        user={{
          name: "Radouane",
          lastName: "Ait said",
          email: "radouane@ait.com",
          phone: "0623772519",
        }}
        label="Add"
      />,
    );

    const addButton = screen.getByRole("button", { name: "Add" });
    userEvent.click(addButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("default browser form submission is prevented", () => {
    const handleSubmit = jest.fn();
    render(
      <UserForm
        handleSubmit={handleSubmit}
        user={{
          name: "Radouane",
          lastName: "Ait said",
          email: "radouane@ait.com",
          phone: "0623772519",
        }}
        label="Add"
      />,
    );

    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
