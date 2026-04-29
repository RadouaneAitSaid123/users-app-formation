import { renderHook, waitFor } from "@testing-library/react";
import useUsers from "./useUsers";

describe("UseUsers", () => {
  it("returns isLoading : true initially", () => {
    global.fetch = jest.fn(() => new Promise(() => {}));
    const { result } = renderHook(() => useUsers());
    const isLoading = result.current.isLoading;

    expect(isLoading).toBe(true);
  });

  it("returns the fetched users after the API call resolves", async () => {
    const fakeUsers = [
      {
        id: 1,
        name: "Radouane",
        lastName: "AIt said",
        email: "red@gmail.com",
        phone: "0662138674",
      },
      {
        id: 2,
        name: "Soufyan",
        lastName: "AIt said",
        email: "sou@gmail.com",
        phone: "0662138674",
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeUsers),
      }),
    );
    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.users).toEqual(fakeUsers);
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("sets error when the fetch fails", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.error).toEqual("Network error");
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("calls the correct URL", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      }),
    );
    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5051/api/users');
  });
});
