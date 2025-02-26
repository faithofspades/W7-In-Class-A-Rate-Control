//create an audio context (an audio graph)
const myAudioCtx = new AudioContext();

//make oscillator node
let myOsc = myAudioCtx.createOscillator();
myOsc.frequency.value = 0;

//make carrier source
let carrier = myAudioCtx.createConstantSource();
carrier.offset.value = 300;

//make modulation oscillator
let modOsc = myAudioCtx.createOscillator();
modOsc.frequency.value = 200;

//modulation depth
let modDepth = myAudioCtx.createGain();
modDepth.gain.value = 100;

//make gain node
let myGain = myAudioCtx.createGain();
myGain.gain.value = 0.5;

//connect oscillator to gain
myOsc.connect(myGain);

//connect modulation to depth
modOsc.connect(modDepth);

//connect carrier to freq
carrier.connect(myOsc.frequency);

//connect modulation depth to frequency
modDepth.connect(myOsc.frequency);

//connect gain to destination
myGain.connect(myAudioCtx.destination);

//start oscillator
const startAudio = function() {
  myAudioCtx.resume();
  myOsc.start()
  modOsc.start()
  carrier.start();};
//Add event listener to button
let myButton = document.getElementById('startAudio');
myButton.addEventListener('click', startAudio);