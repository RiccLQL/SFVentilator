#include <Servo.h>
#include <LiquidCrystal.h>

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

void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:

}
void update(){
  
}

/**
 * Converts pressure in cm of water to mm of mercury
 * @param inputPressure
 * @return pressure in mmHg
 */
double cmH2O_To_mmHg(double inputPressure){
  return inputPressure*0.73555912101486; 
}

/**
 * Converts pressure in mm of mercury to cm of water 
 * @param inputPressure
 * @return pressure in cmH2O
 */
double mmHg_To_cmH2O(double inputPressure){
  return inputPressure*1.3595100263596591; 
}

/**
 * Method to calculate the alveolar oxygen partial pressure 
 * for more information: https://www.sciencedirect.com/topics/medicine-and-dentistry/alveolar-gas-equation
 *                       www-users.med.cornell.edu/~spon/picu/calc/alvgaseq.htm
 * @param baroPressure: pressure sensor in mmHg  
 * @param fracConcentrationO2: the fraction of concentration of oxygen : (no unit)
 * @param partialPressureCO2: partial pressure of carbon dioxyde in mmHg 
 * @param vaporPressureH2O: constant at 37C and is equal to 47mmHg 
 * @return Alveolar oxygen partial pressure in mmHg 
 */
double calculateAlveolarO2Pressure(double baroPressure,double fracConcentrationO2,double partialPressureCO2,double vaporPressureH2O){
  return (fracConcentrationO2*(baroPressure-vaporPressureH2O))-(partialPressureCO2/respQuotient); 
}

/**
 * Method to calculate constant M, which is a combination of the desired FiO2, the desired pressure, the temperature of the environment, the gas constant and the molar mass
 * 
 * @param n: molar mass (mol/L) or smt
 * @param T: temperature (Celsius)
 * @return constant M
 */
double M_constant(double n, double T) {

  double ACf;
  double R;
  double Pf = 40;
  double M;
  
  M = (ACf*n*R*T)/Pf;

  return M;
}

/**
 * Method to calculate the time for which the O2 source is open, letting in pressurized O2
 * 
 * @param M: the M constant (no pertinent unit)
 * @param Vf: the desired volume for inhale (L)
 * @param Qtank: the flow rate of the O2 valve
 * @return the time ttank in seconds
 */
double O2_Open_Time(double M, double Vf, double Qtank) {

  double ttank;

  ttank = (M-0.21*Vf)/(1.21*Qtank);

  return ttank;
}

/**
 * Method to calculate the time for which the air compressor source is open, letting in slightly compressed ambient air
 * 
 * @param M: the M constant (no pertinent unit)
 * @param Vf: the desired volume for inhale (L)
 * @param Qair: the flow rate of the 15mm air valve
 * @return the time tair in seconds
 */
double Air_Open_Time(double M, double Vf, double Qair) {

  double tair;

  tair = (Vf-M)/(0.79*Qair);

  return tair;
}
