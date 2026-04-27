import { render, screen } from "@testing-library/react";
import ConfirmModal from "./index";
import { use } from "react";
import userEvent from "@testing-library/user-event";

describe("ConfirmModal", () => {
  it("does not render when show is false", () => {
    render(
      <ConfirmModal
        show={false}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
        userName="Radouane"
      />,
    );

    const modatTitle = screen.queryByText("Delete User");
    expect(modatTitle).not.toBeInTheDocument();
  });

  it("renders when show is true and display the user name", () => {
    render(
      <ConfirmModal
        show={true}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
        userName="Radouane Ait said"
      />,
    );

    const modatTitle = screen.queryByText("Delete User");
    expect(modatTitle).toBeInTheDocument();
    const username = screen.queryByText(/Radouane Ait said/i);
    expect(username).toBeInTheDocument();
  });

  it("calls onCancel when the Cancel button is clicked", () => {
    const onCancel = jest.fn();
    render(
      <ConfirmModal
        show={true}
        onConfirm={jest.fn()}
        onCancel={onCancel}
        userName="Radouane Ait said"
      />,
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when the Delete button is clicked", () => {
    const onDelete = jest.fn();
    render(
      <ConfirmModal
        show={true}
        onConfirm={onDelete}
        onCancel={jest.fn()}
        userName="Radouane Ait said"
      />,
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    userEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });

  it("calls onCancel when the backdrop button is clicked", () => {
    const onCancel = jest.fn();
    render(
      <ConfirmModal
        show={true}
        onConfirm={jest.fn()}
        onCancel={onCancel}
        userName="Radouane Ait said"
      />,
    );

    const backdropButton = screen.getByTestId("confirm-backdrop");
    userEvent.click(backdropButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
