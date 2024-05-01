#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <DHT.h>

// WiFi Parameters
const char* WIFI_SSID = "EL_DIRECTOR";
const char* WIFI_PASSWORD = "trypassword";

// MQTT Server Parameters
const char* MQTT_CLIENT_ID = "ESP32Client";
const char* MQTT_BROKER = "3efe6d8d8deb46a79cf3fced831f468b.s1.eu.hivemq.cloud";
const char* MQTT_USER = "M4hmoud";
const char* MQTT_PASSWORD = "Boumaiza03";
const char* MQTT_TOPIC1 = "temperature";
const char* MQTT_TOPIC2 = "humidity";
const char* MQTT_TOPIC3 = "flame";
const char* MQTT_TOPIC4 = "fluid";
const char* MQTT_TOPIC5 = "motion";

// DHT22 Sensor
#define DHT_PIN 15
#define DHT_TYPE DHT11
DHT dht(DHT_PIN, DHT_TYPE);

//Flame Sensor
const int flamePin = 12;

//Fluid Sensor
const int fluidPin = 14;

//Utrasonic sensor
const int trigPin = 5;
const int echoPin = 18;

//define sound speed in cm/uS
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

long duration;
float distanceCm;
float distanceInch;

WiFiClientSecure espClient;
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
    }    }
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

  // Load the CA certificate
  const char* root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----)EOF";

  //const char* server_cert = "";
  //const char* server_key = "";

  espClient.setCACert(root_ca);
  //espClient.setCertificate(server_cert);  // for client verification
  //espClient.setPrivateKey(server_key);

  // Connect to MQTT Broker with TLS
  Serial.print("Connecting to MQTT server... ");
  client.setServer(MQTT_BROKER, 8883);
  if (client.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASSWORD)) {
    Serial.println("Connected!");
  } else {
    Serial.println("Connection failed.");
  }

  // flame sensor setup
  pinMode(flamePin, INPUT);

  // fluid sensor setup
  pinMode(fluidPin, INPUT);
  // Ultrasonic setup
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
}

void loop() {
  if(!client.connected()) {
    reconnect();
  }
  client.loop();

  // Measure weather conditions
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (!isnan(temperature)) {
    client.publish(MQTT_TOPIC1, String(temperature).c_str());
    Serial.println("Published temperature: " + String(temperature));
  }

  if (!isnan(humidity)) {
    client.publish(MQTT_TOPIC2, String(humidity).c_str());
    Serial.println("Published humidity: " + String(humidity));
  }

  // Measure Flame condition
  int flameDetected = digitalRead(flamePin);
  if (flameDetected == LOW) {
    client.publish(MQTT_TOPIC3, "1");
    Serial.println("Flame detected!");
  } else {
    client.publish(MQTT_TOPIC3, "0");
    Serial.println("No Flame detected!");
  }

  // Measure Fluid condition
  int fluidDetected = digitalRead(fluidPin);
  if (fluidDetected == LOW) {
    client.publish(MQTT_TOPIC4, "1");
    Serial.println("Fluid detected!");
  } else {
    client.publish(MQTT_TOPIC4, "0");
    Serial.println("No Fluid detected!");
  }

  //measure motion condition
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance
  distanceCm = duration * SOUND_SPEED/2;
  
  // Convert to inches
  distanceInch = distanceCm * CM_TO_INCH;

  //publish motion detection
  if(distanceInch <= 8) {
    client.publish(MQTT_TOPIC5, "1");
  } else {
    client.publish(MQTT_TOPIC5, "0");
  }
  
  // Prints the distance in the Serial Monitor
  Serial.print("Distance (cm): ");
  Serial.println(distanceCm);
  Serial.print("Distance (inch): ");
  Serial.println(distanceInch);

  delay(1000);
}
