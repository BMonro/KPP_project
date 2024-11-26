import { moveToCookingStation } from "@/components/movingFunctions";
import Cooker from "./cooker";


export const initializeCookersAndStations = (tableElement, container, setCookers, setStages, countOfCooks) => {
    const tableRect = tableElement.getBoundingClientRect();
    const { left: tableX, top: tableY, width: tableWidth, height: tableHeight } = tableRect;
    const sliceTable = tableWidth / 4;

    const stages = [
      { name: "DoughStation", x: tableX + tableWidth * 0.1, y: tableY + tableHeight * 0.05, isFree: true },
      { name: "CookingStation", x: tableX + sliceTable, y: tableY + tableHeight * 0.05, isFree: true },
      { name: "BakingStation", x: tableX + sliceTable * 2, y: tableY + tableHeight * 0.05, isFree: true },
      { name: "SlicingStation", x: tableX + sliceTable * 3, y: tableY + tableHeight / 3, isFree: true },
      { name: "EndStation", x: tableX + tableWidth * 0.9, y: tableY + tableHeight * 0.2, isFree: true },
    ];

    setStages(stages);

  

    const initializeCookers = () => {
      const newCookers = Array.from({ length: countOfCooks }, (_, i) => {
          const cookerX = tableX + i * tableWidth * 0.09;
          const cookerY = tableY + tableHeight * 0.3;
          return new Cooker(container, `Chef ${i + 1}`, cookerX, cookerY, i * 50);
      });
      setCookers(newCookers);
    };

    initializeCookers();
  

    

    // Анімація для кухарів
    // if (cookers.length > 0) {
    //   setTimeout(() => moveToCookingStation(cookers[1], "SlicingStation", Stages), 1000);
    //   setTimeout(() => moveToCookingStation(cookers[1], "BakingStation", Stages), 4000);
    // }
  };