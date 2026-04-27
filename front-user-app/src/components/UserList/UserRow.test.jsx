import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import UserRow from "./UserRow";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("UserRow", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders all user data in the correct cells", () => {
    const mockUser = {
      name: "Radouane",
      lastName: "Alit said",
      email: "radouane",
      phone: "0607077763",
    };
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRow user={mockUser} deleteUser={jest.fn()} />
          </tbody>
        </table>
      </MemoryRouter>,
    );

    for (let value of Object.values(mockUser)) {
      const dataElement = screen.getByText(String(value));
      expect(dataElement).toBeInTheDocument();
    }
  });

  it("calls deleteUser with the correct ID when the delete buton is clicked", async () => {
    const deleteUser = jest.fn();

    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRow
              user={{
                id: 42,
                name: "Radouane",
                lastName: "Aits aid",
                email: "red@gmail.com",
                phone: "0662138674",
              }}
              deleteUser={deleteUser}
            />
          </tbody>
        </table>
      </MemoryRouter>,
    );
    const deleteButton = screen.getByTestId("delete-button");
    await userEvent.click(deleteButton);
    expect(deleteUser).toHaveBeenCalledWith(42);
  });

  it("navigates to the view route when the eye button is clicked", async () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRow
              user={{
                id: 42,
                name: "Radouane",
                lastName: "Aits aid",
                email: "red@gmail.com",
                phone: "0662138674",
              }}
              deleteUser={jest.fn()}
            />
          </tbody>
        </table>
      </MemoryRouter>,
    );
    const viewButton = screen.getByTestId("view-button");
    await userEvent.click(viewButton);
    expect(mockNavigate).toHaveBeenCalledWith("view/42");
  });
});
