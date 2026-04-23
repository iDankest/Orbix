import React from 'react';
import { render, screen, act } from "@testing-library/react";
import { OrbixProvider, OrbixContext } from "../../context/OrbixContext";
import { useContext } from "react";
import { expect, test, vi } from "vitest";

// 1. Mock de hooks externos (importante para que no llamen a la red real)
vi.mock("../../hooks/useFetch", () => ({
  useFetch: vi.fn((url) => {
    if (url.includes("planetary/apod")) return { data: { url: "nasa.jpg" } };
    return { data: { results: [] }, loading: false };
  }),
}));

// 2. Componente de prueba para "consumir" el contexto
const TestConsumer = () => {
  const { searchTerm, setSearchTerm, messages, sendMessage } = useContext(OrbixContext);
  return (
    <div>
      <span data-testid="search-val">{searchTerm}</span>
      <button onClick={() => setSearchTerm("Mars")} data-testid="btn-search">Search</button>
      
      <div data-testid="msg-count">{messages.length}</div>
      <button onClick={() => sendMessage("Hola!")} data-testid="btn-msg">Send</button>
    </div>
  );
};

// --- LOS TESTS ---

test("OrbixProvider debe proveer el valor inicial de searchTerm", () => {
  render(
    <OrbixProvider>
      <TestConsumer />
    </OrbixProvider>
  );
  expect(screen.getByTestId("search-val").textContent).toBe("");
});

test("setSearchTerm debe actualizar el valor en el contexto", async () => {
  render(
    <OrbixProvider>
      <TestConsumer />
    </OrbixProvider>
  );
  
  const btn = screen.getByTestId("btn-search");
  await act(async () => btn.click());
  
  expect(screen.getByTestId("search-val").textContent).toBe("Mars");
});

test("sendMessage debe añadir un mensaje a la lista", async () => {
  render(
    <OrbixProvider>
      <TestConsumer />
    </OrbixProvider>
  );

  const initialCount = parseInt(screen.getByTestId("msg-count").textContent);
  const btnMsg = screen.getByTestId("btn-msg");
  
  await act(async () => btnMsg.click());

  const finalCount = parseInt(screen.getByTestId("msg-count").textContent);
  expect(finalCount).toBe(initialCount + 1);
});