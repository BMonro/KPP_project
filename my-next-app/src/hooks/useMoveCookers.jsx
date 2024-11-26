import { moveToCashRegister } from "@/components/movingFunctions";
import { useEffect, useRef } from "react";
import Client from "@/components/Client";
import { sendDataToKitchen } from "@/utils/sentData";
import { moveToCookingStation } from "@/components/movingFunctions";


const useMoveCookers = (orders, setOrders, cookers, stages, isSended) => {
    const ordersRef = useRef(orders);

    useEffect(() => {
        ordersRef.current = orders; // Оновлюємо поточне значення референсу
    }, [orders]);

    useEffect(() => {
        if (ordersRef.current.length === 0) return;

        const orders = ordersRef.current;
        console.log("Поточні ордери:", ordersRef.current);
        console.log("Поточні кухарі:", cookers);

        for (const order of orders) {
            for (const cooker of cookers) {
                if (cooker.isFree) {
                    let isClaimed = false;
                    cookers.map(cook => {
                        if (cook.selectedOrder == order) {
                            isClaimed = true;
                        }
                    })
                    if (isClaimed) {
                        isClaimed = false;
                        break;
                    }
                    cooker.selectedOrder = order;
                    cooker.isFree = false;
                    cooker.status = order.status;
                    console.log("Кухар зайняв ордер:", cooker.name, order);
                    moveToCookingStation(cooker, stages[0].name, stages);
                    break;
                }
                // console.log(order, cooker.selectedOrder)
                if (order && cooker.selectedOrder) {
                    if (!cooker.isFree && order.orderId === cooker.selectedOrder.orderId) {
                        console.log("Кухар працює з ордером:", cooker.name, order);
                        if (order.status !== "ReadyForPickUp") {
                            // console.log("Зміна статусу ордера:", order);
                            cooker.status = order.status;

                            let newStatusIndex = statuses.indexOf(cooker.status);
                            moveToCookingStation(cooker, stages[newStatusIndex].name, stages);
                            break;
                        }
                        else {
                            moveToCookingStation(cooker, stages[4].name, stages);
                            // console.log("кінець ордера:", order);
                            cooker.isFree = true;
                            cooker.status = null;
                            cooker.selectedOrder = null;
                            // handlerDeleteOrder(order)
                            break;
                        }

                    }
                }
            }



            console.log("Йдемо до наступного кухаря...");
        }
    }, [orders]); // Додаємо тільки ключові залежності

};


const statuses = [
    "Kneading", "Preparing", "Baking", "Packing", "ReadyForPickUp"
]

export default useMoveCookers;