import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import store from "./store";

test("renders navigation brand", () => {
  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(/from fridge/i)).toBeInTheDocument();
});
