import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the App component", () => {
    const { asFragment, getByText } = render(<App />);
    expect(
      getByText("QBxR: Quarterback Evaluation Platform")
    ).toBeInTheDocument();
  });
});
