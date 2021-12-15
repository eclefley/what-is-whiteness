//implement threshhold for darkest point instead of minpoint

// p5.js Video capture
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// Mat to store the grayscale converted camera frame
let myMatGrayscale;
let darkestPoint;

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

let zoneArray = [zoneOne, zoneTwo, zoneThree, zoneFour];

function activateZone (zone) {
    zone.isActive = true;
    
    print(zone.name, " was just activated");
}

function deactivateZone (zone) {
    zone.isActive = false;
    
        
    print(zone.name, " was just de-activated");

}

//ex: isDarkestPointInZone(zoneOne);
function isDarkestPointInZone(zone) {
    if(darkestPoint.x < zone.box.width+zone.box.x && darkestPoint.y < zone.box.height+zone.box.y) {
        return true;
    } else {
        return false;
    }
}

function preload() {
  //LK1_mp3 = loadSound("LK1.mp3");
  //LK2_mp3 = loadSound("LK2.mp3");
  //LK3_mp3 = loadSound("LK3.mp3");
  //LK4_mp3 = loadSound("LK4.mp3");
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

let i;
let zone;

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // display Mat
    p5.cv.drawMat(myMatGrayscale, 0, 0);
    p5.cv.autothreshold(myMatGrayscale);
    // get darkest point
    darkestPoint = p5.cv.findMinLocation(myMatGrayscale);
    // draw darkest point
    //circle(darkestPoint.x, darkestPoint.y, 30);
    
    for (i = 0; i < zoneArray.length; i+=1) {
        zone = zoneArray[i];
        
        if(isDarkestPointInZone(zone) && zone.isActive == false) {
            activateZone(zone);
        } else if(!isDarkestPointInZone(zone) && zone.isActive == true) {
            deactivateZone(zone);
        }
    } 
  }
}