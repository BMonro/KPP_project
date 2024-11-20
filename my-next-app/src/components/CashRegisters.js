export function initializeCashRegisters(casaElement, setCashRegisters) {
    const casaRect = casaElement.getBoundingClientRect();
    const { left: casaX, top: casaY, width: casaWidth, height: casaHeight } = casaRect;

    const newRegisters = Array.from({ length: 3 }, (_, i) => ({
      name: `Cash Register ${i + 1}`,
      x: casaX + casaWidth * 0.25 + i * casaWidth * 0.25,
      y: casaY - casaHeight * 0.4,
      isFree: true,
    }));

    setCashRegisters(newRegisters);
  }