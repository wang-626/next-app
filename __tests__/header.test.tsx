import { render, screen } from "@testing-library/react";
import Header from "components/header";
import "@testing-library/jest-dom";
import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react");

describe("Home", () => {
  it("Not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {},
      status: "unauthenticated",
    });
    render(<Header />);

    const heading = screen.getByRole("button", {
      name: /Sign in/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("Logged in", () => {
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
      name: /Sign out/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
