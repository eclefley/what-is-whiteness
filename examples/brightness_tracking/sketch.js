/*
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// Mat to store the grayscale converted camera frame
let myMatGrayscale;

//finds the darkest point on the screen
let darkestPoint;

let LK1_mp3;
let LK2_mp3;
let LK3_mp3;
let LK4_mp3;

//store current state for all zone information
let zone = ['','','',''];

//store a value for each print function
let zoneLocation = ['LK1','LK2','LK3','LK4'];

//the print function currently triggered
let currentTextPrinted;

//stores whether a zone is available to print
let available = [];

function setup() {
    createCanvas(820, 640);
    // setup p5 capture
    myCapture = createCapture(VIDEO);
    myCapture.size(820, 640);
    myCapture.hide();
    // wait for OpenCV to init
    p5.cv.onComplete = onOpenCVComplete;
    
    //set text being printed to corresponding zone
    // if ( ['', '', '', ''] == [0] )
//    if (zone == [0]) {
//        currentTextPrinted = [0];
//    } else if (zone == [1]) {
//        currentTextPrinted = [1];
//    } else if (zone == [2]) {
//        currentTextPrinted = [2];
//    } else if (zone == [3]) {
//        currentTextPrinted = [3];
//    } 
    
    //makes the zones available to print the text -> push starts new drawing state
    for (let j = 0; j < 4; j++) {
        available.push([j]);
    }
    
    // result
    // available = [ [0], [1], [2], [3] ]
}

function preload() {
  //LK1_mp3 = loadSound("LK1.mp3");
  //LK2_mp3 = loadSound("LK2.mp3");
  //LK3_mp3 = loadSound("LK3.mp3");
  //LK4_mp3 = loadSound("LK4.mp3");
}

function onOpenCVComplete() {
    // create a CV capture helper
    myCVCapture = p5.cv.getCvVideoCapture(myCapture);
    // create a CV Mat to read new color frames into
    myMat = p5.cv.getRGBAMat(820, 640);
    // create a CV mat for color to grayscale conversion
    myMatGrayscale = new cv.Mat();
}

//remove text in a zone after it's printed one time upon a motion detection trigger
function clearText () {
    let index = floor(available.length);
    //[0] indexes currentTextPrinted into array
    let zoneStateVariable = available.splice(index, 3)[0];
    let i = zoneStateVariable[0];
    let i = zoneStateVariable[0];
    zone[i] = zoneLocation[currentTextPrinted];
    //let j = zoneStateVariable[1];
    //let k = zoneStateVariable[2];
    //let l = zoneStateVariable[3];
    //zone[i][j][k][l] = zoneLocation[currentTextPrinted];
    currentTextPrinted = (currentTextPrinted + 1) % zoneLocation.length;
    //zone[i][j][k][l] = currentTextPrinted;
    //currentTextPrinted = zoneLocation;
}

function draw() {
    if (p5.cv.isReady) {
        // read from CV Capture into myMat
        myCVCapture.read(myMat);
        // convert Mat to grayscale
        p5.cv.copyGray(myMat, myMatGrayscale);
        // display Mat
        p5.cv.drawMat(myMatGrayscale, 0, 0);
        // get darkest point
        darkestPoint = p5.cv.findMinLocation(myMatGrayscale);
        
        for (i = 0; i < 4; i++) {
            let zoneStateVariable = zone[i];
            if ((zoneStateVariable == zoneLocation[0]) && (darkestPoint.x < 100 && darkestPoint.y < 100)) {
                print("LK1");
            } else if ((zoneStateVariable == zoneLocation[1]) && (darkestPoint.x > 720 && darkestPoint.y > 540)) {
                print("LK2");
            } else if ((zoneStateVariable == zoneLocation[2]) && (darkestPoint.x > 720 && darkestPoint.y < 100)) {
                print("LK3");
            } else if ((zoneStateVariable == zoneLocation[3]) && (darkestPoint.x < 100 && darkestPoint.y > 540)) {
                print("LK4");
            }
        }
        clearText();
    }
}

*/











// p5.js Video capture
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// Mat to store the grayscale converted camera frame
let myMatGrayscale;
let darkestPoint;
let LK1_mp3;
let LK2_mp3;
let LK3_mp3;
let LK4_mp3;

function preload() {
  //LK1_mp3 = loadSound("LK1.mp3");
  //LK2_mp3 = loadSound("LK2.mp3");
  //LK3_mp3 = loadSound("LK3.mp3");
  //LK4_mp3 = loadSound("LK4.mp3");
}

function IsDarknessDetectedZone1() {
    if(darkestPoint.x < 100 && darkestPoint.y < 100) {
        return true;
    } else {
        return false;
    }
}

function IsDarknessDetectedZone2() {
    if(darkestPoint.x > 720 && darkestPoint.y > 540) {
        return true;
    } else {
        return false;
    }
}

function IsDarknessDetectedZone3() {
    if(darkestPoint.x > 720 && darkestPoint.y < 100) {
        return true;
    } else {
        return false;
    }
}

function IsDarknessDetectedZone4() {
    if(darkestPoint.x < 100 && darkestPoint.y > 540) {
        return true;
    } else {
        return false;
    }
}

function darknessIsDetected() {
    if (IsDarknessDetectedZone1()) {
        print("LK1");
        //LK1_mp3.play();
    }
    if (IsDarknessDetectedZone2()) {
        print("LK2");
        //LK2_mp3.play();
    }
    if (IsDarknessDetectedZone3()) {
        print("LK3");
        //LK3_mp3.play();
    }
    if (IsDarknessDetectedZone4()) {
        print("LK4");
        //LK4_mp3.play();
    }
}

function setup() {
  createCanvas(820, 640);
  // setup p5 capture
  myCapture = createCapture(VIDEO);
  myCapture.size(820, 640);
  myCapture.hide();
  // wait for OpenCV to init
  p5.cv.onComplete = onOpenCVComplete;
}

function onOpenCVComplete() {
  // create a CV capture helper
  myCVCapture = p5.cv.getCvVideoCapture(myCapture);
  // create a CV Mat to read new color frames into
  myMat = p5.cv.getRGBAMat(820, 640);
  // create a CV mat for color to grayscale conversion
  myMatGrayscale = new cv.Mat();
}

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // display Mat
    p5.cv.drawMat(myMatGrayscale, 0, 0);
    // get darkest point (for each zone simultaneously)
    darkestPoint = p5.cv.findMinLocation(myMatGrayscale);
    // draw darkest point
    //circle(darkestPoint.x, darkestPoint.y, 30);
    
      /*
    if (IsDarknessDetected(true)) {
        print("LK1");
    } else {
    image(myCapture, 0, 0);
  }
    */ 
      
  /*    
    if(darkestPoint.x < 100 && darkestPoint.y < 100) {
    print("LK1");
      //if(LK1_mp3.isPlaying()) {
        //LK1_mp3.stop();
      //} else {
        //LK1_mp3.play();
      //}
    }
  } else {
    image(myCapture, 0, 0);
  }
  */
      darknessIsDetected();
  }
}

