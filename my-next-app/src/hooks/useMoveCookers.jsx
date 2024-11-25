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

        const order = ordersRef.current[0];
        console.log("Поточні ордери:", ordersRef.current);
        console.log("Поточні кухарі:", cookers);

        for (const cooker of cookers) {
            if (cooker.isFree) {
                cooker.selectedOrder = order;
                cooker.isFree = false;
                console.log("Зайняли ордер:", order);
                moveToCookingStation(cooker, stages[0].name, stages);
                break;
            }

            if (!cooker.isFree && order.orderId === cooker.selectedOrder.orderId) {
                if (order.status !== "ReadyForPickUp") {
                    console.log("Зміна статусу ордера:", order);

                    const newStatusIndex = statuses.indexOf(order.status) + 1;
                    if (newStatusIndex < statuses.length) {
                        const newStatus = statuses[newStatusIndex];
                        setOrders((currentOrders) => {
                            const updatedOrders = currentOrders.map((currentOrder) =>
                                currentOrder.orderId === order.orderId
                                    ? { ...currentOrder, status: newStatus }
                                    : currentOrder
                            );
                            return updatedOrders;
                        });
                        console.log("Змінений статус ордера:", { ...order, status: newStatus });
                        moveToCookingStation(cooker, stages[newStatusIndex].name, stages);
                    }
                    break;
                }
                else {
                    moveToCookingStation(cooker, stages[stages.length].name, stages);
                    console.log("кінець ордера:", order);
                    break;
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