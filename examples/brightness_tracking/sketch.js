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

//sounds
let Ending_Voice_Audio;
let Loop_Voice_Audio;
var len;
let randSound;

let bellSounds = [];
let dingSounds = [];
let bassSounds = [];
let singingSounds = [];

function playBellSounds() {
    //bell = bellSounds[j];
    randSound = random(bellSounds);
    len = random(bellSounds).duration();
    
    
    if(!randSound.isPlaying() && randSound.isLoaded()) {
        randSound.play();
        console.log("playing")
    } else if(randSound == len) {
        randSound.stop;
        console.log("stopping")
    }  
}

function playSingingSounds() {
    randSound = random(singingSounds);
    len = random(singingSounds).duration();
    
    
    if(!randSound.isPlaying() && randSound.isLoaded()) {
        randSound.play();
        console.log("playing")
    } else if(randSound == len) {
        randSound.stop;
        console.log("stopping")
    }  
}

function playDingSounds() {
    randSound = random(dingSounds);
    len = random(dingSounds).duration();
    
    
    if(!randSound.isPlaying() && randSound.isLoaded()) {
        randSound.play();
        console.log("playing")
    } else if(randSound == len) {
        randSound.stop;
        console.log("stopping")
    }  
}

function playBassSounds() {
    randSound = random(bassSounds);
    len = random(bassSounds).duration();
    
    
    if(!randSound.isPlaying() && randSound.isLoaded()) {
        randSound.play();
        console.log("playing")
    } else if(randSound == len) {
        randSound.stop;
        console.log("stopping")
    }  
}
 


function activateZone(zone) {
    zone.isActive = true;
    
    //adjust sound volume using p5js lib function -> see coding train
    
    
    /*
    //use for looping audio
    if(LK2_DS.isPlaying() && LK2_DS.currentTime() == 12) {
        LK2_DS.stop();
    } else if(LK2_DS.currentTime() == 0) {
        LK2_DS.play();
    }
    
    //https://p5js.org/reference/#/p5.SoundLoop
    //https://p5js.org/reference/#/p5.SoundFile/setVolume
    //https://p5js.org/reference/#/p5.SoundFile/jump
    //https://p5js.org/reference/#/p5.SoundFile/addCue
    */
    
    if(zone == zoneOne) {
        playBellSounds();
    }
    
    if(zone == zoneTwo) {
        playSingingSounds();
    }
    
    if(zone == zoneThree) {
        playDingSounds();
    }
    
    if(zone == zoneFour) {
        playBassSounds();
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
        
    loopingVoice.push(loadSound("bell_C.wav"));
    
    bellSounds.push(loadSound("bell_C.wav"));
    bellSounds.push(loadSound("bell_FS.wav"));
    bellSounds.push(loadSound("bell_A.wav"));
    
    singingSounds.push(loadSound("voice1.mp3"));
    singingSounds.push(loadSound("voice2.mp3"));
    singingSounds.push(loadSound("voice3.mp3"));
    singingSounds.push(loadSound("voice4.mp3")); 
    
    dingSounds.push(loadSound("ding_AS.wav"));
    dingSounds.push(loadSound("ding_FS.wav"));
    dingSounds.push(loadSound("ding_DS.wav"));
    
    bassSounds.push(loadSound("bassInOut.wav"));
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