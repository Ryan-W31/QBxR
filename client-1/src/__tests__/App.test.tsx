import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import LoginPage from "@/pages/LoginPage";
import LandingPage from "@/pages/LandingPage";
import { renderWithProviders } from "@/lib/test-utils";
import { BrowserRouter } from "react-router-dom";

describe("Renders pages correctly", async () => {
  it("Should render the Landing Page correctly", async () => {
    renderWithProviders(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const title = screen.getByText("QBxR: Quarterback Evaluation Platform");
    expect(title).not.toBeNull();
  });

  it("Should render the Login Page correctly", async () => {
    renderWithProviders(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const title = screen.getByTestId("login-title");
    expect(title).not.toBeNull();
  });
});
