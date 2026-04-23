
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import AuthGate from "../../components/AuthGate";
import { expect, test, vi } from "vitest";

test("AuthGate debe permitir escribir el nombre y enviar el formulario", () => {
  const mockOnLogin = vi.fn(); // Una función espía
  
  render(<AuthGate onLogin={mockOnLogin} onClose={() => {}} layoutId="test" />);

  const input = screen.getByPlaceholderText(/NOMBRE DEL COMANDANTE/i);
  const button = screen.getByText(/INICIAR SECUENCIA/i);

  // 1. Simulamos que el usuario escribe "Kilian"
  fireEvent.change(input, { target: { value: 'Kilian' } });
  
  // 2. Simulamos el clic
  fireEvent.click(button);

  // 3. Verificamos que la función fue llamada con "Kilian"
  expect(mockOnLogin).toHaveBeenCalledWith("Kilian");
});