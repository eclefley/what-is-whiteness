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

function preload() {
  LK1_mp3 = loadSound("LK1.mp3");
  LK2_mp3 = loadSound("LK2.mp3");
}

function IsDarknessDetectedZone1() {
    if(darkestPoint.x < 20 && darkestPoint.y < 100) {
        return true;
    } else {
        return false;
    }
}

function IsDarknessDetectedZone2() {
    if(darkestPoint.x > 800 && darkestPoint.y < 600) {
        return true;
    } else {
        return false;
    }
}

function darknessIsDetected() {
    if (IsDarknessDetectedZone1(true)) {
        //print("LK1");
        LK1_mp3.play();
    }
    if (IsDarknessDetectedZone2(true)) {
        //print("LK2");
        //LK2_mp3.play();
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
    // get darkest point
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

