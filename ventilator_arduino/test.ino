#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);


#define DHTPIN 6
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

boolean condition = true;


void setup() {
  lcd.begin(16, 2);
  lcd.print("Temperature: ");
  dht.begin();

}

void loop() {

  pinMode(22, OUTPUT);
  pinMode(24, OUTPUT);
  pinMode(26, OUTPUT);

  if(condition == true){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Temperature: ");
    lcd.setCursor(0,1);
    lcd.print(dht.readTemperature(false)-1.4);
    condition = false;
  }
  else{
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Humidity (%): ");
    lcd.setCursor(0,1);
    lcd.print(dht.readHumidity()+2);
    condition = true;
  }
{
  if(dht.readTemperature(false)<25 ){
    digitalWrite(22, HIGH);
    digitalWrite(24, LOW);
    digitalWrite(26, LOW);
  }
  else if(dht.readTemperature(false)<30 && dht.readTemperature(false)>=25 ){
    digitalWrite(22, LOW);
    digitalWrite(24, HIGH);
    digitalWrite(26, LOW);
  }
  else if(dht.readTemperature(false)>=30 ){
    digitalWrite(22,LOW);
    digitalWrite(24, LOW);
    digitalWrite(26, HIGH);
  }
}  
  
  delay(3000);
  
}
