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



/*
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

let zoneTwo = {
    box: {
    x: 0,
    y: 0,
    width: 720,
    height: 540,
    },
    isActive: false,
    name: 'LK2',
};

let zoneThree = {
    box: {
    x: 0,
    y: 0,
    width: 720,
    height: 100,
    },
    isActive: false,
    name: 'LK3',
};

let zoneFour = {
    box: {
    x: 0,
    y: 0,
    width: 100,
    height: 540,
    },
    isActive: false,
    name: 'LK4',
};

function activateZone (zone) {
    zone.isActive = true;
}

function deactivateZone (zone) {
    zone.isActive = false;
}






let src;
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

function IsDarknessDetected() {
    if(darkestPoint.x < 100 && darkestPoint.y < 100) {
        return true;
    } else {
        return false;
    } 
    
    if(darkestPoint.x > 720 && darkestPoint.y > 540) {
        return true;
    } else {
        return false;
    }
    if(darkestPoint.x > 720 && darkestPoint.y < 100) {
        return true;
    } else {
        return false;
    }
    if(darkestPoint.x < 100 && darkestPoint.y > 540) {
        return true;
    } else {
        return false;
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

        //instead of findMinLocation for whole screen, findMinLocation for each zone ->look at lib documentation
        darkestPoint = p5.cv.findMinLocation(myMatGrayscale);

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
/*
        if (IsDarknessDetected()) {
        print("LK1");
        //LK1_mp3.play();
        }
        
        if (IsDarknessDetected()) {
        print("LK2");
        //LK1_mp3.play();
        }
        
        if (IsDarknessDetected()) {
        print("LK3");
        //LK1_mp3.play();
        }
        
        if (IsDarknessDetected()) {
        print("LK4");
        //LK1_mp3.play();
        }
*/
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
/*
    }
}

*/