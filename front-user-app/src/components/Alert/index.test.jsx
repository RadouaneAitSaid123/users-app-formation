import { render, screen } from "@testing-library/react";
import AlertContainer from ".";
import userEvent from "@testing-library/user-event";

describe("ConfirmContainer", () => {
  it("does not render when the alerts array is empty", () => {
    render(<AlertContainer alerts={[]} onDismiss={jest.fn()} />);

    const alertStackDiv = screen.queryByRole("alert");

    expect(alertStackDiv).not.toBeInTheDocument();
  });

  it("renders one alert with the correct message and type", () => {
    const mockAlerts = [
      { id: 1, message: "User Added successfully!", type: "success" },
    ];

    render(<AlertContainer alerts={mockAlerts} onDismiss={jest.fn()} />);

    const alertMessage = screen.getByText("User Added successfully!");

    expect(alertMessage).toBeInTheDocument();

    const alertToastDiv = screen.getByRole("alertdialog");

    expect(alertToastDiv).toHaveClass("alert-success");
  });

  it("renders multiple alerts", () => {
    const mockAlerts = [
      { id: 1, message: "User Added successfully!", type: "success" },
      {
        id: 2,
        message: "Failed to add user. Please try again.",
        type: "danger",
      },
    ];

    render(<AlertContainer alerts={mockAlerts} onDismiss={jest.fn()} />);

    const alertSuccessMessage = screen.getByText("User Added successfully!");
    expect(alertSuccessMessage).toBeInTheDocument();

    const alertDangerMessage = screen.getByText(
      "Failed to add user. Please try again.",
    );
    expect(alertDangerMessage).toBeInTheDocument();
  });

  it("calls onDismiss with the correct ID when the close button clicked", () => {
    const onDismiss = jest.fn();
    const mockAlerts = [
      { id: 99, message: "User Added successfully!", type: "success" },
    ];

    render(<AlertContainer alerts={mockAlerts} onDismiss={onDismiss} />);

    const closeButton = screen.getByRole("button");
    userEvent.click(closeButton);
    expect(onDismiss).toHaveBeenCalledWith(99);
  });
});
