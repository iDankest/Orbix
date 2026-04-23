// src/test/components/CardDash.test.jsx
import React from 'react';
import { render, screen } from "@testing-library/react";
import CardDash from "../../components/CardDash";
import { expect, test } from "vitest";

test("CardDash debe mostrar el título y el valor correctamente", () => {
  render(<CardDash title="Oxígeno" value="98%" subtitle="Nivel estable" />);
  
  expect(screen.getByText("Oxígeno")).toBeInTheDocument();
  expect(screen.getByText("98%")).toBeInTheDocument();
});