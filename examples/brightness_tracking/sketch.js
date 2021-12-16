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
let Ending_Voice_Audio;
let Loop_Voice_Audio;
let LK2_DS;
let LK3_BASS;
let LK4_A;
let img1;
let img2;
let img3;
var len;

let zoneOne = {
    box: {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
    },
    isActive: false,
    name: 'LK1',
};

let zoneTwo = {
    box: {
    x: 0,
    y: 0,
    width: 770,
    height: 590,
    },
    isActive: false,
    name: 'LK2',
};

let zoneThree = {
    box: {
    x: 0,
    y: 0,
    width: 770,
    height: 5,
    },
    isActive: false,
    name: 'LK3',
};

let zoneFour = {
    box: {
    x: 0,
    y: 0,
    width: 50,
    height: 590,
    },
    isActive: false,
    name: 'LK4',
};

let zoneArray = [zoneOne, zoneTwo, zoneThree, zoneFour];

function preload() {
    //Ending_Voice_Audio = loadSound("VOICE_ENDING.wav");
    //Loop_Voice_Audio = loadSound("VOICE_LOOP.wav");
    LK2_DS = loadSound("LK2_DS.wav");
    LK3_BASS = loadSound("LK3_BASS.wav");
    LK4_A = loadSound("LK4_A.wav");
    LK2_FS = loadSound("LK2_FS.wav");
    //img1;
    //img2; 
    //img3;
}

function soundLK2_DS() {
    len = LK2_DS.duration();
    
    for (i = 0; i < len; i++) {
        
        if(!LK2_DS.isPlaying() && i == 0) {
            LK2_DS.play();
        } else if(i == len) {
            LK2_DS.stop;
            //i = 0;
        }
    }
}

function soundLK3_BASS() {
    len = LK3_BASS.duration();
    
    for (i = 0; i < len; i++) {
        
        if(!LK3_BASS.isPlaying() && i == 0) {
            LK3_BASS.play();
        } else if(i == len) {
            LK3_BASS.stop;
            //i = 0;
        }
    }
}

function soundLK4_A() {
    len = LK4_A.duration();
    
    for (i = 0; i < len; i++) {
        
        if(!LK4_A.isPlaying() && i == 0) {
            LK4_A.play();
        } else if(i == len) {
            LK4_A.stop;
            //i = 0;
        }
    }
}

function soundLK2_FS() {
    len = LK2_FS.duration();
    
    for (i = 0; i < len; i++) {
        
        if(!LK2_FS.isPlaying() && i == 0) {
            LK2_FS.play();
        } else if(i == len) {
            LK2_FS.stop;
            //i = 0;
        }
    }
}

function activateZone(zone) {
    zone.isActive = true;
    
    
    //console.log(len);
    //=12
    /*
    //use for looping audio
    if(LK2_DS.isPlaying() && LK2_DS.currentTime() == 12) {
        LK2_DS.stop();
    } else if(LK2_DS.currentTime() == 0) {
        LK2_DS.play();
    }
    */
    
    
    //if(LK2_DS.currentTime() == 12) {
      //  LK2_DS.stop();
    //} 
    if(zone == zoneOne) {
        soundLK2_DS();
    }
    
    if(zone == zoneTwo) {
        soundLK3_BASS();
    }
    
    if(zone == zoneThree) {
        soundLK4_A();
    }
    
    if(zone == zoneFour) {
        soundLK2_FS();
    }
    
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