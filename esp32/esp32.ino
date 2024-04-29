#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// WiFi Parameters
const char* WIFI_SSID = "EL_DIRECTOR";
const char* WIFI_PASSWORD = "trypassword";

// MQTT Server Parameters
const char* MQTT_CLIENT_ID = "ESP32Client";
const char* MQTT_BROKER = "192.168.137.1"; //pc's ip address because the broker is hosted on my pc
const char* MQTT_USER = "";
const char* MQTT_PASSWORD = "";
const char* MQTT_TOPIC1 = "temperature";
const char* MQTT_TOPIC2 = "humidity";
const char* MQTT_TOPIC3 = "flame";

// DHT22 Sensor
#define DHT_PIN 15
#define DHT_TYPE DHT11
DHT dht(DHT_PIN, DHT_TYPE);

//Flame Sensor
const int flamePin = 12;

WiFiClient espClient;
PubSubClient client(espClient);

void reconnect() {
  while(!client.connected()) {
    Serial.print("\nAttempting MQTT connection...");
    if(client.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASSWORD)) {
      Serial.print("\nConnected to ");
      Serial.println(MQTT_BROKER);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("\nTrying to connect again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  // Connect to WiFi
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }
  Serial.println(" Connected!");

  // Connect to MQTT Broker
  Serial.print("Connecting to MQTT server... ");
  client.setServer(MQTT_BROKER, 1883);
  if (client.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASSWORD)) {
    Serial.println("Connected!");
  } else {
    Serial.println("Connection failed.");
  }

  // flame sensor setup
  pinMode(flamePin, INPUT);
}

void loop() {
  if(!client.connected()) {
    reconnect();
  }

  // Measure weather conditions
  dht.readTemperature();
  dht.readHumidity();
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if(client.publish(MQTT_TOPIC1, String(temperature))) {
    Serial.println("published to MQTT broker: {\"temperature\":" + String(temperature) + "}");
  }
  if(client.publish(MQTT_TOPIC2, String(humidity))) {
    Serial.println("published to MQTT broker: {\"temperature\":" + String(humidity) + "}");
  }  

  // Measure Flame condition
  int flameDetected = digitalRead(flamePin);
  if (flameDetected == LOW) {
    Serial.println("Flame detected!");
    // Publish to MQTT topic when flame is detected
    client.publish(MQTT_TOPIC3, "Flame detected!");
  } else {
    Serial.println("No flame detected.");
    client.publish(MQTT_TOPIC3, "No Flame detected.");
  }
  delay(1000);
}
