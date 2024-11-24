import Cashier from "./Cashier";


export const initializeCashiers = (casaElement, container, setCashRegisters) => {
    const casaRect = casaElement.getBoundingClientRect();
    const { left: casaX, top: casaY, width: casaWidth, height: casaHeight } = casaRect;

    const cashiers = Array.from({ length: 3 }, (_, i) => {
      const cashierX = casaX + casaWidth * 0.25 + i * casaWidth * 0.25;
      const cashierY = casaY - casaHeight * 0.4;
      return new Cashier(container, `Cashier ${i + 1}`, i+1, true, cashierX, cashierY);
    });

    // Оновлення стейту касирів
    setCashRegisters(cashiers);
  };
