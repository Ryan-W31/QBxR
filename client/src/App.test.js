import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Landing Page", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
});
