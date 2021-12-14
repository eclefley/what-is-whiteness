




let zoneOne = {
    box: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    },
    isActive: false,
    name: 'LK1',
};

function activateZone (zone) {
    zone.isActive = true;
}

function deactivateZone (zone) {
    zone.isActive = false;
}







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
let zoneImageRegion;

function preload() {
  //LK1_mp3 = loadSound("LK1.mp3");
  //LK2_mp3 = loadSound("LK2.mp3");
  //LK3_mp3 = loadSound("LK3.mp3");
  //LK4_mp3 = loadSound("LK4.mp3");
}

function IsDarknessDetected() {
    if(darkestPoint.x < 100 && darkestPoint.y < 100) {
        return true;
    } else {
        return false;
    }
}
/*
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
*/


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
  zoneImageRegion = new cv.Mat();

}


function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // display Mat
    p5.cv.drawMat(myMatGrayscale, 0, 0);



    let rect = new cv.Rect([zoneOne.box.x, zoneOne.box.y, zoneOne.box.width, zoneOne.box.height]);
    zoneImageRegion = myMatGrayscale(rect);
    // get darkest point (for each zone simultaneously)
    //instead of findMinLocation for whole screen, findMinLocation for each zone ->look at lib documentation
    darkestPoint = p5.cv.findMinLocation(zoneImageRegion);

    // draw darkest point
    circle(darkestPoint.x, darkestPoint.y, 30);
    
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

    if (IsDarknessDetected(zoneOne)) {
    print("LK1");
    //LK1_mp3.play();
    }
    /*
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
    */
  }
}

