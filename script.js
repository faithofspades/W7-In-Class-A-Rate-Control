//create an audio context (an audio graph)
const myAudioCtx = new AudioContext();


// //add mic input 
// navigator.mediaDevices.getUserMedia({audio: true})
//   .then(function(stream) {
//     let myMic = myAudioCtx.createMediaStreamSource(stream);
//     myMic.connect(myAudioCtx.destination);
//   });

// //create a gain node
// let myGain2 = myAudioCtx.createGain();
// myGain2.gain.value = 1;
// //connect gain node to destination
// myGain2.connect(myAudioCtx.destination);
// //connect mic to gain node
// myMic.connect(myGain2);

//make oscillator node
let myOsc = myAudioCtx.createOscillator();
myOsc.frequency.value = 600;

//make modulation oscillator
let modOsc = myAudioCtx.createOscillator();
modOsc.frequency.value = 0.1;

//modulation depth
let modDepth = myAudioCtx.createGain();
modDepth.gain.value = 0.2;

//make gain node
let myGain = myAudioCtx.createGain();
myGain.gain.value = 0.5;

//connect oscillator to gain
myOsc.connect(myGain);

//connect modulation to depth
modOsc.connect(modDepth);

//connect gain to destination
myGain.connect(myAudioCtx.destination);

//create delay line
let delay = myAudioCtx.createDelay();
delay.delayTime.value = 0.25;

//create feedback
let feedback = myAudioCtx.createGain();
feedback.gain.value = 0.05;

//connect gain to delay
myGain.connect(delay); 

//center delay time
let delayTime = myAudioCtx.createConstantSource();
delayTime.offset.value = 0.5;

delayTime.connect(delay.delayTime);

//frequency modulation
modDepth.connect(delay.delayTime);

//connect delay to destination
delay.connect(myAudioCtx.destination);

//connect delay to feedback

delay.connect(feedback);

//connect feedback to delay
feedback.connect(delay);

//start oscillator
const startAudio = function() {
  myAudioCtx.resume();
  myOsc.start()
  modOsc.start()
  delayTime.start();};

//Add event listener to button
let myButton = document.getElementById('startAudio');
myButton.addEventListener('click', startAudio);

//add event listener to mod depth slider
let modDepthSlider = document.getElementById('modDepth');
modDepthSlider.addEventListener('input', function() {
  modDepth.gain.value = modDepthSlider.value;
});

//add event listener to mod frequency slider
let modFreqSlider = document.getElementById('modFreq');
modFreqSlider.addEventListener('input', function() {
  modOsc.frequency.value = modFreqSlider.value;
});

//add event listener to delay time slider
let delayTimeSlider = document.getElementById('delayTime');
delayTimeSlider.addEventListener('input', function() {
  delayTime.offset.value = delayTimeSlider.value;
});

//add event listener to delay feedback slider
let feedbackSlider = document.getElementById('feedback');
feedbackSlider.addEventListener('input', function() {
  feedback.gain.value = feedbackSlider.value;
});