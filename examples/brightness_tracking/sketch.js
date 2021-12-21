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
var len;
let randSound;
let bellSounds = [];
let dingSounds = [];
let bassSounds = [];
let singingSounds = [];
let meditationVoiceLoop;

function playBellSounds() {
    //bell = bellSounds[j];
    randSound = random(bellSounds);
    len = random(bellSounds).duration();
    randSound.setVolume(0.1);
    
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
    randSound.setVolume(0.1);
    
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
    randSound.setVolume(0.8);
    
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
    //setVolume(0.5);
    
    if(!randSound.isPlaying() && randSound.isLoaded()) {
        randSound.play();
        console.log("playing")
    } else if(randSound == len) {
        randSound.stop;
        console.log("stopping")
    }  
}
 
function doMeditationVoiceLoop() {
    if(!meditationVoiceLoop.isPlaying() && meditationVoiceLoop.isLoaded()) {
        meditationVoiceLoop.play();
        console.log("calling addCue");
        meditationVoiceLoop.addCue(1, console.log, "add cue callback called");
        
        //meditationVoiceLoop.duration();
        console.log(meditationVoiceLoop.duration());
    } 
}

function stopMeditationVoiceLoop() {
    if(meditationVoiceLoop.isPlaying() == true) {
        meditationVoiceLoop.pause();
    } 
}

function doMeditationVoiceImages() {
    //len = meditationVoiceImages.duration();
    console.log("here");

   /* for (i = 0; i < len; i++) {
        if (!meditationVoiceImages.isPlaying() && meditationVoiceImages.isLoaded()) {
            stopMeditationVoiceLoop();
            meditationVoiceImages.play();
        } else if (i == len) {
                meditationVoiceImages.stop;
                doMeditationVoiceLoop();
        }
    }*/
}


function activateZone(zone) {
    zone.isActive = true;
    
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

function queueVoiceLoopAndPlayVoiceImages() {
    console.log("starting voice images");
    meditationVoiceImages.onended(queueVoiceImagesAndPlayVoiceLoop);
    meditationVoiceImages.play();
}

function queueVoiceImagesAndPlayVoiceLoop() {
    console.log("starting voice loop");
    meditationVoiceLoop.onended(queueVoiceLoopAndPlayVoiceImages);
    meditationVoiceLoop.play();
}

function setup() {
    createCanvas(820, 640);
    // setup p5 capture
    myCapture = createCapture(VIDEO);
    myCapture.size(820, 640);
    myCapture.hide();
    // wait for OpenCV to init
    p5.cv.onComplete = onOpenCVComplete;
    
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
    
    meditationVoiceLoop = loadSound("voice_loop.wav", queueVoiceImagesAndPlayVoiceLoop);
    meditationVoiceImages = loadSound("voice_with_images.wav");
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
        //meditationVoiceLoop.addCue(1, doMeditationVoiceImages);
        //doMeditationVoiceLoop();
    }
}