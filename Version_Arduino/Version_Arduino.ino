#include <Adafruit_NeoPixel.h>

#define joyX A0
#define joyY A1
#define joy2X A2
#define joy2Y A3

#define PIN 6
#define NUMPIXELS 400
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);


int firstPlayerBoard[5] = {140, 160, 180, 200, 220};
int secondPlayerBoard[5] = {159, 179, 199, 219, 239};
int avanceX = 0, avanceY = 1;
int ball = 189;
int firstMove = 0, secondMove = 0;
int firstScore = 0, secondScore = 0;

void setup() {
    Serial.begin(9600);
} 


// Display the LEDs 
void setupLocation() {
    for(int i = 0; i < NUMPIXELS; i++) {
        if()
        pixels.setPixelColor(i, );
    }
    pixels.show();
}   

void copyArray(int[] tabToPaste, int[] wherePaste) {
    for(int i = 0; i < NUMPIXELS; i++) 
        wherePaste[i] = tabToPaste[i];
}

// Get the position of the first joystick and update the content of firstPlayerBoard
void moveFirstPlayer() {
    readFirst();
    int tempTab[NUMPIXELS];
    if(firstMove == 0) return;
    if(firstMove < 0) {
        if(firstPlayerBoard[4] == 380) return;
        copyArray(firstPlayerBoard, tempTab);
        for (int i = 0; i < 4; i++) firstPlayerBoard[i] = tempTab[i + 1];
        firstPlayerBoard[4] += 20;
    } else {
        if(firstPlayerBoard[0] == 0) return;
        copyArray(firstPlayerBoard, tempTab);
        for (int i = 0; i < 4; i++) firstPlayerBoard[i + 1] = tempTab[i];
        firstPlayerBoard[0] -= 20;
    }
}

// Get the position of the first joystick
void readFirst() {
    int value = analogRead(joyY);
    if(value < 80) firstMove = -1;
    else if(value > 200) firstMove = 1;
}

// Get the position of the second joystick and update the content of secondPlayerBoard
void moveSecondPlayer() {
    int value = analogRead(joy2Y);
    if(value < 80) firstMove = -1;
    else if(value > 200) firstMove = 1;
}

// Get the position of the second joystick
void readSecond() {
  
}

// Update the content of ball, which contains the 
void moveBall() {

}

void loop () {
    delay(500);
    moveBall();
    moveFirstPlayer();
    moveSecondPlayer();
    setupLocation();
}