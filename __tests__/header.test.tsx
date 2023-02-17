import { render, screen } from "@testing-library/react";
import Header from "components/header";
import "@testing-library/jest-dom";
import { useSession, signIn, signOut } from "next-auth/react";
import userEvent from "@testing-library/user-event";

jest.mock("next-auth/react");

describe("Not logged in header nav button", () => {
  it("button exist", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {},
      status: "unauthenticated",
    });
    render(<Header />);

    const signInBtn = screen.getByRole("button", {
      name: /signInBtn/i,
    });

    const searchBtn = screen.getByRole("button", {
      name: /searchBtn/i,
    });

    expect(signInBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  it("click event", async () => {
    render(<Header />);
    const signInBtn = screen.getByRole("button", {
      name: /signInBtn/i,
    });
    const user = userEvent.setup();
    await user.click(signInBtn);
    expect(signInBtn).toBeInTheDocument();
  });
});

describe("logged in header nav button", () => {
  it("button exist", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "jeffrafter",
        },
      },
      status: "authenticated",
    });

    render(<Header />);

    const heading = screen.getByRole("button", {
      name: /signOutBtn/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
