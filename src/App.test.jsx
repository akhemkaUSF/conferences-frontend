import { render, screen } from "@testing-library/react"

test("Renders Task Label", () => {
    render(<App />);
    const linkElement = screen.getByText("NOLEMUN:");
    expect(linkElement).toBeInTheDocument();
  });