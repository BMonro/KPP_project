  export function moveToCookingStation(cooker, stationName, stages) {
      // Знаходимо потрібну станцію за назвою
      const station = stages.find((stage) => stage.name === stationName);
    
      // Якщо станція не знайдена або вона зайнята, виходимо
      if (!station || !station.isFree) {
        console.log(`${stationName} is currently occupied or does not exist.`);
        return;
      }
    
      // Робимо станцію зайнятою
      station.isFree = false;
    
      console.log(`Moving ${cooker.name} to ${station.name}...`);
    
      // Передаємо назву станції для зміни зображення
      cooker.moveTo(station.x, station.y, station.name, () => {
        // console.log(`${cooker.name} reached ${station.name}.`);
    
        // Після досягнення станції робимо її знову вільною
        station.isFree = true;
      }, stationName);
    }

    export function moveToCashRegister(client, cashRegisterIndex, setCashRegisters) {
      setCashRegisters((prevRegisters) => {
        const register = prevRegisters[cashRegisterIndex];
        if (!register || !register.isFree) {
          console.log(`Cash Register ${cashRegisterIndex + 1} is currently occupied or does not exist.`);
          return prevRegisters; // If the register is occupied, do nothing
        }
    
        const updatedRegisters = [...prevRegisters];
        updatedRegisters[cashRegisterIndex] = { ...register, isFree: false }; // Mark register as occupied
    
        // Move the client to the register
        client.moveTo(register.x, register.y + register.y * 0.6, () => {
          console.log(`${client.name} reached ${register.name}.`);
          setTimeout(() => {
            setCashRegisters((prev) => {
              const resetRegisters = [...prev];
              resetRegisters[cashRegisterIndex] = { ...register, isFree: true }; // Free up register after delay
              console.log(`${register.name} is now free.`);
              return resetRegisters;
            });
          }, 3000); // Delay before making the register available
        });
    
        return updatedRegisters;
      });
  }
  