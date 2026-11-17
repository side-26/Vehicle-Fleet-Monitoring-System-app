import { describe, it, expect, afterEach, assert } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as jestDomMatchers from "@testing-library/jest-dom/vitest";

import Container from "./index";
import styles from "./container.module.css";

const containerClass = styles.container;
void jestDomMatchers;

assert(typeof containerClass === "string", "Container CSS Module class is missing");

describe("Container", () => {
  afterEach(cleanup);

  describe("Rendering", () => {
    it("should render successfully", () => {
      const { container } = render(<Container>Content</Container>);

      expect(container.firstElementChild).toBeInTheDocument();
    });

    it("should render a section element", () => {
      const { container } = render(<Container>Content</Container>);

      expect(container.firstElementChild?.tagName).toBe("SECTION");
    });

    it("should apply the default CSS module class", () => {
      const { container } = render(<Container>Content</Container>);

      expect(styles.container).toBeTruthy();

      expect(container.firstElementChild).toHaveClass(containerClass);
    });

    it("should render without children content", () => {
      const { container } = render(<Container>{null}</Container>);

      expect(container.firstElementChild).toBeEmptyDOMElement();
    });
  });

  describe("Children", () => {
    it("should render text children", () => {
      render(<Container>Container content</Container>);

      expect(screen.getByText("Container content")).toBeInTheDocument();
    });

    it("should render numeric children", () => {
      render(<Container>{0}</Container>);

      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should render React elements", () => {
      render(
        <Container>
          <h1>Dashboard</h1>
          <p>Vehicle monitoring</p>
        </Container>,
      );

      expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();

      expect(screen.getByText("Vehicle monitoring")).toBeInTheDocument();
    });

    it("should render multiple children", () => {
      render(
        <Container>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </Container>,
      );

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      expect(screen.getByText("Third")).toBeInTheDocument();
    });

    it("should support nested containers", () => {
      const { container } = render(
        <Container>
          <Container>Nested content</Container>
        </Container>,
      );

      expect(container.querySelectorAll("section")).toHaveLength(2);

      expect(screen.getByText("Nested content")).toBeInTheDocument();
    });
  });

  describe("Class names", () => {
    it("should support an undefined className", () => {
      const { container } = render(<Container className={undefined}>Content</Container>);

      expect(container.firstElementChild).toHaveClass(containerClass);
    });

    it("should support an empty className", () => {
      const { container } = render(<Container className="">Content</Container>);

      expect(container.firstElementChild).toHaveClass(containerClass);
    });

    it("should merge custom and default classes", () => {
      const { container } = render(<Container className="custom-container">Content</Container>);

      expect(container.firstElementChild).toHaveClass(containerClass, "custom-container");
    });

    it("should support multiple custom classes", () => {
      const { container } = render(
        <Container className="custom-one custom-two">Content</Container>,
      );

      expect(container.firstElementChild).toHaveClass(containerClass, "custom-one", "custom-two");
    });

    it("should support Tailwind prefixed classes", () => {
      const { container } = render(
        <Container className="tw:bg-card tw:rounded-lg">Content</Container>,
      );

      expect(container.firstElementChild).toHaveClass(
        containerClass,
        "tw:bg-card",
        "tw:rounded-lg",
      );
    });
  });

  describe("Updates", () => {
    it("should update children on re-render", () => {
      const { rerender } = render(<Container>Initial content</Container>);

      rerender(<Container>Updated content</Container>);

      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();

      expect(screen.getByText("Updated content")).toBeInTheDocument();
    });

    it("should update className on re-render", () => {
      const { container, rerender } = render(
        <Container className="initial-class">Content</Container>,
      );

      rerender(<Container className="updated-class">Content</Container>);

      expect(container.firstElementChild).not.toHaveClass("initial-class");

      expect(container.firstElementChild).toHaveClass(containerClass, "updated-class");
    });
  });
});
