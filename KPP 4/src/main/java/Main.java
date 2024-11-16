import javax.swing.*;
import java.awt.*;
import java.util.Random;
import java.util.concurrent.*;

public class Main {
    private static ScheduledThreadPoolExecutor sensorPool;
    private static ExecutorService processingPool;
    private static ConcurrentHashMap<String, Integer> sensorMap;

    private static JTextArea logArea;
    private static JPanel threadPanelContainer;
    private static JFrame frame;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            setupApplication();
            setupUI();
        });
    }

    private static void setupApplication() {
        sensorPool = new ScheduledThreadPoolExecutor(5);
        processingPool = Executors.newFixedThreadPool(3);
        sensorMap = new ConcurrentHashMap<>();
    }

    private static void setupUI() {
        frame = new JFrame("Weather Prediction System");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 400);
        frame.setLayout(new BorderLayout());

        // Верхня панель з контролями
        JPanel controlPanel = new JPanel(new FlowLayout());
        JTextField sensorNameField = new JTextField(10);
        JTextField intervalField = new JTextField(5);
        JButton addSensorButton = new JButton("Add Sensor");
        JButton removeSensorButton = new JButton("Remove Sensor");

        controlPanel.add(new JLabel("Sensor Name:"));
        controlPanel.add(sensorNameField);
        controlPanel.add(new JLabel("Interval (s):"));
        controlPanel.add(intervalField);
        controlPanel.add(addSensorButton);
        controlPanel.add(removeSensorButton);
        frame.add(controlPanel, BorderLayout.NORTH);

        // Центральна панель для відображення потоків
        threadPanelContainer = new JPanel();
        threadPanelContainer.setLayout(new BoxLayout(threadPanelContainer, BoxLayout.Y_AXIS));
        JScrollPane scrollPane = new JScrollPane(threadPanelContainer);
        frame.add(scrollPane, BorderLayout.CENTER);

        // Нижня панель для журналу
        logArea = new JTextArea(10, 40);
        logArea.setEditable(false);
        JScrollPane logScrollPane = new JScrollPane(logArea);
        frame.add(logScrollPane, BorderLayout.SOUTH);

        // Дії кнопок
        addSensorButton.addActionListener(e -> {
            String sensorName = sensorNameField.getText().trim();
            String intervalText = intervalField.getText().trim();
            if (!sensorName.isEmpty() && !intervalText.isEmpty()) {
                try {
                    int interval = Integer.parseInt(intervalText);
                    addSensor(sensorName, interval);
                } catch (NumberFormatException ex) {
                    log("Invalid interval format");
                }
            } else {
                log("Sensor name and interval are required");
            }
        });

        removeSensorButton.addActionListener(e -> {
            String sensorName = sensorNameField.getText().trim();
            if (!sensorName.isEmpty()) {
                removeSensor(sensorName);
            } else {
                log("Sensor name is required to remove");
            }
        });

        frame.setVisible(true);
    }

    private static void addSensor(String sensorName, int interval) {
        if (sensorMap.containsKey(sensorName)) {
            log("Sensor already exists: " + sensorName);
            return;
        }
        sensorMap.put(sensorName, interval);

        sensorPool.scheduleAtFixedRate(() -> {
            Random random = new Random();
            int temperature = 15 + random.nextInt(20); // 15-35°C
            int humidity = 30 + random.nextInt(70);    // 30-100%
            int windSpeed = 5 + random.nextInt(20);    // 5-25 km/h

            String data = "Temp: " + temperature + "°C, Humidity: " + humidity + "%, Wind: " + windSpeed + " km/h";

            log(sensorName + " -> " + data);

            processingPool.submit(() -> {
                SwingUtilities.invokeLater(() -> updateThreadPanel(sensorName, data));
            });
        }, 0, interval, TimeUnit.SECONDS);

        addThreadPanel(sensorName, "Waiting for data...");
        log("Added sensor: " + sensorName + " with interval " + interval + " seconds");
    }

    private static void removeSensor(String sensorName) {
        if (sensorMap.remove(sensorName) != null) {
            sensorPool.remove(() -> log("Sensor removed: " + sensorName));
            SwingUtilities.invokeLater(() -> removeThreadPanel(sensorName));
            log("Removed sensor: " + sensorName);
        } else {
            log("Sensor not found: " + sensorName);
        }
    }

    private static void addThreadPanel(String sensorName, String status) {
        JPanel threadPanel = new JPanel(new FlowLayout());
        threadPanel.setName(sensorName);
        threadPanel.add(new JLabel("Sensor: " + sensorName));
        threadPanel.add(new JLabel("Data: " + status));
        threadPanelContainer.add(threadPanel);
        threadPanelContainer.revalidate();
    }

    private static void updateThreadPanel(String sensorName, String result) {
        for (Component comp : threadPanelContainer.getComponents()) {
            if (comp instanceof JPanel && sensorName.equals(comp.getName())) {
                JPanel panel = (JPanel) comp;
                panel.removeAll();
                panel.add(new JLabel("Sensor: " + sensorName));
                panel.add(new JLabel("Data: " + result));
                panel.revalidate();
                panel.repaint();
                break;
            }
        }
    }

    private static void removeThreadPanel(String sensorName) {
        for (Component comp : threadPanelContainer.getComponents()) {
            if (comp instanceof JPanel && sensorName.equals(comp.getName())) {
                threadPanelContainer.remove(comp);
                threadPanelContainer.revalidate();
                threadPanelContainer.repaint();
                break;
            }
        }
    }

    private static void log(String message) {
        logArea.append(message + "\n");
        logArea.setCaretPosition(logArea.getDocument().getLength());
    }
}
