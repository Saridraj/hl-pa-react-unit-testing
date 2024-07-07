import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserProfile from "@/components/UserProfile";

// Mock the fetch function
global.fetch = jest.fn();

const mockFetch = (status: any, data: any) => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: status === 200,
      status,
      json: () => Promise.resolve(data),
    })
  );
};

describe("UserProfile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    render(<UserProfile userId="1" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays user data when fetch is successful", async () => {
    const userData = { name: "John Doe", email: "john.doe@example.com" };
    mockFetch(200, userData);

    render(<UserProfile userId="1" />);

    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );
    expect(screen.getByText("Email: john.doe@example.com")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", async () => {
    mockFetch(500, {});

    render(<UserProfile userId="1" />);

    await waitFor(() =>
      expect(
        screen.getByText("Error: Failed to fetch user data")
      ).toBeInTheDocument()
    );
  });
});
