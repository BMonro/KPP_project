import { moveToCashRegister } from "@/components/movingFunctions";
import { useEffect } from "react";
import Client from "@/components/Client";
import { sendDataToKitchen } from "@/utils/sentData";
import { moveToCookingStation } from "@/components/movingFunctions";
const useMoveCookers = (orders, cookers, stages) => {
    useEffect(() => {
        console.log(orders)

        // moveToCookingStation(cookers[0], stages[1].name, stages);
    }, [orders])

};

export default useMoveCookers;