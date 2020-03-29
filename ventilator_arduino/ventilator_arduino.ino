#include <Servo.h>
#include <LiquidCrystal.h>
#include <Wire.h>


//set up LCD (with pins) 
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);//values from test.ino 
//Servos for valves and air compressor motor
Servo oxygen_Tank_Valve_Servo; //oxygen tank motor to release O2
Servo pressure_tank_Servo; //motor to open close valve 
Servo air_Compressor_Valve_Servo; 

//Pin numbers for Sensors (can choose to hardcode pins) 


//constants for calculations 
const double respQuotient=0.8; //ranges from 0.7 to 1.0 , typically 0.8, depends on metabolism and diet https://www.sciencedirect.com/topics/medicine-and-dentistry/respiratory-quotient, to be modified by User in UI

//constants depending on location/quality of O2 tank 
const double fractionO2TankFilled=1.0; //100% of the Oxygen tank filled, to be modified by User in UI
const double fractionO2Air=0.18; //18% of air in hospital , to be modified by User in UI

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

//regulator variables
int maxRegAngle = 59;
int inhale = 0;
int closed = 511;
int exhale = 1023;

//AirCompressor & O2 variables
int maxACAngle = 179; //subject to change on the rotation of needle valve
int maxO2Angle = 179;

//sensor addresses
BME280_a;
BME280_b;
BME280_c;
O2sensor;

#define BME280_a_pressure_1 
//...

//settings-variables (SUBJECT TO CHANGE BASED ON RPi)
int Pdesiredexhale = 40;


void setup() {

  Regulator.attach(37);
  AirCompressor.attach(38);
  O2.attach(39);

  Serial.begin(115200);


  Wire.begin();
  Wire.beginTransmission(BME

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

  
  
  //first exhale
  {
    Rval = exhale;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  boolean a = true;
  while (a) {
    //test for the pressure, stop when it reaches the desired exhale
  }  
}

void loop() {
  {
    Rval = closed;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  delay(1);

  {
    Rval = inhale;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  boolean i = true;
  while(a) {
    //test for the pressure, stop when it reaches the desired exhale
  }

  {
    Rval = closed;
    Rangle = map(Rval, 0, 1023, 0, maxRegAngle);
    Regulator.write(Rangle);
  }

  delay(1);

  
  
}
