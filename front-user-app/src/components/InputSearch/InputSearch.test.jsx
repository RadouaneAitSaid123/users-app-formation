import { render, screen } from "@testing-library/react";
import InputSearch from "../InputSearch";
import userEvent from "@testing-library/user-event";

describe("InputSearch", () => {
  it("renders inputsearch with the correct placeholder", () => {
    render(<InputSearch value="" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("displays the value passed as a prop", () => {
    render(<InputSearch value="Radouane" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toHaveValue("Radouane");
  });

  it("calls onChange when the user types", () => {
    const handelChange = jest.fn();
    render(<InputSearch value="" onChange={handelChange} />);
    const input = screen.getByPlaceholderText("Search...");
    userEvent.type(input, "Radouane");
    expect(handelChange).toHaveBeenCalled();
  });
});
