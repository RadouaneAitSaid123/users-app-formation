import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UserList from "./index";

describe("UserList", () => {
  it("renders table headers", () => {
    render(
      <MemoryRouter>
        <UserList users={[]} search="" deleteUser={jest.fn()} />
      </MemoryRouter>,
    );
    const nameHeader = screen.getByText("Name");
    expect(nameHeader).toBeInTheDocument();
    const lastNameHeader = screen.getByText("LastName");
    expect(lastNameHeader).toBeInTheDocument();
    const emailHeader = screen.getByText("Email");
    expect(emailHeader).toBeInTheDocument();
    const phoneHeader = screen.getByText("Phone");
    expect(phoneHeader).toBeInTheDocument();
    const actionsHeader = screen.getByText("Actions");
    expect(actionsHeader).toBeInTheDocument();
  });

  it("renders one row per user", () => {
    const users = [
      {
        id: 1,
        name: "Radouane",
        lastName: "Ait said",
        email: "radouane@gmail.com",
        phone: "0637269069",
      },
      {
        id: 2,
        name: "Soufyane",
        lastName: "Ait said",
        email: "soufyane@gmail.com",
        phone: "0607077763",
      },
    ];

    render(
      <MemoryRouter>
        <UserList search="" users={users} deleteUser={jest.fn()} />
      </MemoryRouter>,
    );
    for (let user of users) {
      const userName = screen.getByText(user.name);
      expect(userName).toBeInTheDocument();
      const userEmail = screen.getByText(user.email);
      expect(userEmail).toBeInTheDocument();
    }
  });

  it("filters users by the search prop", () => {
    const users = [
      {
        id: 1,
        name: "Radouane",
        lastName: "Ait said",
        email: "radouane@gmail.com",
        phone: "0637269069",
      },
      {
        id: 2,
        name: "Soufyane",
        lastName: "Ait said",
        email: "soufyane@gmail.com",
        phone: "0607077763",
      },
      {
        id: 3,
        name: "Mohamed",
        lastName: "Bnida",
        email: "moh@gmail.com",
        phone: "0662138674",
      },
    ];

    render(
      <MemoryRouter>
        <UserList search="ane" users={users} deleteUser={jest.fn()} />
      </MemoryRouter>,
    );
    const radouaneUserName = screen.getByText("Radouane");
    expect(radouaneUserName).toBeInTheDocument();
    const soufyaneUserName = screen.getByText("Soufyane");
    expect(soufyaneUserName).toBeInTheDocument();
    const mohamedUserName = screen.queryByText("Mohamed");
    expect(mohamedUserName).not.toBeInTheDocument();
  });

  it("renders an empty table when no users match the filter", () => {
    const users = [
      {
        id: 1,
        name: "Radouane",
        lastName: "Ait said",
        email: "radouane@gmail.com",
        phone: "0637269069",
      },
      {
        id: 2,
        name: "Soufyane",
        lastName: "Ait said",
        email: "soufyane@gmail.com",
        phone: "0607077763",
      },
    ];

    render(
      <MemoryRouter>
        <UserList search="zzz" users={users} deleteUser={jest.fn()} />
      </MemoryRouter>,
    );
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
  });
});
