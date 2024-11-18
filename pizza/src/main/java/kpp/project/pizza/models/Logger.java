package kpp.project.pizza.models;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Logger implements Observer {

    @Override
    public void update(Pizza pizza) {
        // Отримуємо сьогоднішню дату у форматі yyyy-MM-dd
        LocalDate today = LocalDate.now();
        String fileName = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + ".txt";

        // Лог для запису
        String logEntry = "Pizza " + pizza.getName() +
                " (Order ID: " + pizza.getOrderId() + ") is now " + pizza.getState().toString();

        // Записуємо лог у файл
        writeLogToFile(fileName, logEntry);
    }

    private void writeLogToFile(String fileName, String logEntry) {
        try {
            // Створення файлу, якщо він не існує
            File logFile = new File(fileName);
            if (!logFile.exists()) {
                logFile.createNewFile();
            }

            // Запис у файл з додаванням нових рядків
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(logFile, true))) {
                writer.write(logEntry);
                writer.newLine(); // Перехід на новий рядок
            }
        } catch (IOException e) {
            System.err.println("Error writing log to file: " + e.getMessage());
        }
    }
}


