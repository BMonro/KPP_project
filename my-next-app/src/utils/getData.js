import { useEffect, useState } from "react";

export async function fetchCustomers() {
  try {
    const response = await fetch("http://localhost:3001/new/customer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
}
