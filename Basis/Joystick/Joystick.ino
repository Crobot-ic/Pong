#define joyX A0
#define joyY A1
#define joy2X A2
#define joy2Y A3

void setup() {
  Serial.begin(9600);
}
     
void loop() {
  // put your main code here, to run repeatedly:
  int firstValue = analogRead(joyX);
  int secondValue = analogRead(joy2X);
   
     
  //print the values with to plot or view
  Serial.print("firstValue :");
  Serial.print(firstValue);

  Serial.print(",\tsecondValue :");
  Serial.print(secondValue);
  
  Serial.print("\n");
  delay(1000);
}
