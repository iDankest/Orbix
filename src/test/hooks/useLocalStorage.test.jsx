// src/test/hooks/useLocalStorage.test.jsx
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { expect, test, beforeEach } from "vitest";

test("useLocalStorage debe guardar y recuperar datos", () => {
  const { result } = renderHook(() => useLocalStorage("test_key", "valor_inicial"));

  // 1. Verificar valor inicial
  expect(result.current[0]).toBe("valor_inicial");

  // 2. Cambiar el valor
  act(() => {
    result.current[1]("nuevo_valor");
  });

  // 3. Verificar que el estado cambió y que el localStorage tiene el dato
  expect(result.current[0]).toBe("nuevo_valor");
  expect(window.localStorage.getItem("test_key")).toBe(JSON.stringify("nuevo_valor"));
});