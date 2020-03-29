/*
This file contains examples showing you how to implement the Arduino end of serial communication.
All communication will be happening in a simple format: "{setting/statistic}|{updatedValue}"
For example, say the temperature sensor has just read 1.7 deg C, you'd send "roomTemp|1.7" or call sendData("roomTemp", 1.7)
As C necessitates a buffer size, the maximum size of any communication will be 60 bytes.
Every update/communication will take its own line - one update; one line.
*/

// Make sure to include this line in setup()
void setup()
{
    // ...
    Serial.begin(115200);
    // ...
}

/*
 * Include the following functions in your code, and use them in loop()
 * receiveData() will store information in 2 variables: settingName and newValue
 * It's up to you to interpret those values and act accordingly. For example, you might do:
 * 
 * void loop()
 * {
 *    //...
 *    
 *    receiveData(); // Run this every loop
 *    if (settingName != "none")
 *    {
 *        // Update [settingName] to be [newValue] or interpret the message or whatever
 *        // Remember that newValue is a char[] i.e. if you want a number value you have to convert it
 *        // To do this, #include <stdlib.h> at the top and just run strtod(newValue, NULL)
 *    }
 *    //... 
 * }
 */

void sendData(char *name, double value)
{
    Serial.print(name);
    Serial.print("|");
    Serial.println(value);
}

void sendData(char *name, char *value)
{
    Serial.print(name);
    Serial.print("|");
    Serial.println(value);
}

const byte DATA_MAX_SIZE = 60;
char data[DATA_MAX_SIZE];

char *settingName = "none";
char *newValue = "none";

void receiveData()
{
   static char endMarker = '\n';
   char receivedChar;
   int ndx = 0;

   memset(data, 32, sizeof(data));
   
   while (Serial.available() > 0)
   {
      receivedChar = Serial.read();
      if (receivedChar == endMarker)
      {
         data[ndx] = '\0';
         settingName = strtok(data, "|");
         newValue = strtok(NULL, "|");
         
         return;
      }

      data[ndx] = receivedChar;
      ndx++;

      if (ndx >= DATA_MAX_SIZE)
        break;
   }

   // Data received is invalid
   settingName = "none";
   newValue = "none";
   memset(data, 32, sizeof(data));
}
