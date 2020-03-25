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
const double respQuotient=0.8; //ranges from 0.7 to 1.0 , typically 0.8, depends on metabolism and diet https://www.sciencedirect.com/topics/medicine-and-dentistry/respiratory-quotient
 
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
