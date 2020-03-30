#include <Servo.h>
#include <LiquidCrystal.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <Adafruit_BME280.h>
#include <Adafruit_Sensor.h>

//------------------------------------entities--------------------------------------------

//set up LCD (with pins) 
LiquidCrystal lcd(8,9,10,11,12,13);

//servo variables
Servo Regulator;
int Rval;
int Rangle;

Servo AirCompressor;
int potpinACClosed = 0;
int potpinACOpen = 1023;
int ACval;
int ACangle;

Servo O2;
int potpinO2Closed = 0;
int potpinO2Open = 1023;
int O2val;
int O2angle;

//O2 sensor [CURRENTLY MISSING]

//pressure chamber sensor
Adafruit_BME280 PCsensor;

//exhale sensor
Adafruit_BMP280 Esensor;

//------------------------------------variables----------------------------------------------

//regulator variables
int maxRegAngle = 107;   //subject to change on the rotation capacity of regulator
int inhale = 0;
int closed = 511;
int exhale = 1023;

//AirCompressor & O2 variables
int maxACAngle = 179; //subject to change on the rotation of needle valve
int maxO2Angle = 179;



//settings-variables (SUBJECT TO CHANGE BASED ON RPi)
double Pdesiredexhale = 40.0;
double Pdesiredinhale = 20.0;


//other variables
double Pexhale;
double Pinhale;
double Tmin;
double Tmax;
double FiO2f = 21;
double FiO2margin = 0.5;    //for now

//----------------------------------setup(): starting entities-------------------------------------------

void setup() {

  Regulator.attach(37);
  AirCompressor.attach(38);
  O2.attach(39);

  Serial.begin(115200);
  
  //commence sensor BME280 at pressure chamber
  if (!PCsensor.begin(0x76)) {
    Serial.println("Could not find a valid Pressure Chamber sensor, check wiring!");
    //control mechanical error
  }

  //commence sensor BME280 at regulator cave
  if (!Esensor.begin(0x77)) {
    Serial.println("Could not find a valid Exhale sensor, check wiring!");
    //control mechanical error
  }

  //start regulator at closed
  {
    Rval = closed;
    Serial.println(Rval);

    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Serial.println(Rangle);

    Regulator.write(Rangle);
  }

  //start AC and O2 at closed
  {
    ACval = potpinACClosed;
    Serial.println(ACval);
    ACangle = map(ACval, 0, 1023, 0, maxACAngle);
    Serial.println(ACangle);
    AirCompressor.write(ACangle);

    O2val = potpinO2Closed;
    Serial.println(O2val);
    O2angle = map(O2val, 0, 1023, 0, maxO2Angle);
    Serial.println(O2angle);
    O2.write(O2angle);
  }

//-------------------------------------------settings input---------------------------------------

  //await settings and variable configuration
  {
    
    //when begin operation is clicked physically or through the UI, carry forward.
  }

  //Air compressor input opens, fan begins
  {
    ACval = potpinACOpen;
    ACangle = map(ACval, 0, 1023, 0, maxACAngle);
    AirCompressor.write(ACangle);

    digitalWrite(49, HIGH); //open the motor
  }

//--------------------------------------------starting the breathing----------------------------------
  
  //first exhale
  {
    Rval = exhale;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  Pexhale = hPaToCmH2O(Esensor.readPressure());
  while (Pexhale <= Pdesiredexhale) {
    //test for the pressure, stop when it reaches the desired exhale
    mixture();
    Pexhale = hPaToCmH2O(Esensor.readPressure());
  } 
}

//----------------------------------loop()------------------------------------------------------------

void loop() {

  double Temperature = PCsensor.readTemperature();
  double Humidity = PCsensor.readHumidity();

  Tmin = 0.9*Temperature;
  Tmax = 1.1*Temperature;

  //temp and humidity to be checked every breath
  if (Temperature > Tmin && Temperature < Tmax) {
    
  }
  else {
    
  }
  
  //after exhale
  {
    Rval = closed;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  //inhale
  {
    Rval = inhale;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  Pinhale = hPaToCmH2O(Esensor.readPressure());
  while (Pinhale >= Pdesiredinhale) {

    Pinhale = hPaToCmH2O(Esensor.readPressure());
  }

  //after inhale
  {
    Rval = closed;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  //exhale
  {
    Rval = exhale;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  Pexhale = hPaToCmH2O(Esensor.readPressure());
  while (Pexhale <= Pdesiredexhale) {
    //test for the pressure, stop when it reaches the desired exhale
    mixture();
    Pexhale = hPaToCmH2O(Esensor.readPressure());
  }  

}


double O2LevelSim;

void mixture() {
  double Pchamber = hPaToCmH2O(PCsensor.readPressure());
  if (Pchamber <= (1.1)*Pdesiredexhale) {

    //simulate the FiO2 value
    O2LevelSim = 21;
    if (O2LevelSim >= FiO2f - FiO2margin) {
      ACval = potpinACOpen;
      ACangle = map(ACval, 0, 1023, 0, maxACAngle);
      AirCompressor.write(ACangle);
  
      O2val = potpinO2Closed;
      O2angle = map(O2val, 0, 1023, 0, maxO2Angle);
      O2.write(O2angle);
    }

    if (O2LevelSim < FiO2f -FiO2margin) {
      ACval = potpinACOpen;
      ACangle = map(ACval, 0, 1023, 0, maxACAngle);
      AirCompressor.write(ACangle);
  
      O2val = potpinO2Open;
      O2angle = map(O2val, 0, 1023, 0, maxO2Angle);
      O2.write(O2angle);
    }
  }

  if (Pchamber > (1.1)*Pdesiredexhale) {

    O2LevelSim = 21;
    if (O2LevelSim >= FiO2f - FiO2margin) {
      ACval = potpinACClosed;
      ACangle = map(ACval, 0, 1023, 0, maxACAngle);
      AirCompressor.write(ACangle);

      O2val = potpinO2Closed;
      O2angle = map(O2val, 0, 1023, 0, maxO2Angle);
      O2.write(O2angle);
    }

    if (O2LevelSim < FiO2f -FiO2margin) {
      ACval = potpinACClosed;
      ACangle = map(ACval, 0, 1023, 0, maxACAngle);
      AirCompressor.write(ACangle);

      O2val = potpinO2Open;
      O2angle = map(O2val, 0, 1023, 0, maxO2Angle);
      O2.write(O2angle);
    }
  }
}

double hPaToCmH2O(double phpa) {
  double pcmh2o = 1.0197442889221*phpa;
  return pcmh2o;
}
