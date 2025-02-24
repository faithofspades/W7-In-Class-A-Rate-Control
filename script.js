//create an audio context (an audio graph)
const myAudioCtx = new AudioContext();

//make oscillator node
let myOsc = myAudioCtx.createOscillator();

//make carrier source
let carrier = myAudioCtx.createConstantSource();
carrier.offset.value = 200;


//make gain node
let myGain = myAudioCtx.createGain();
myGain.gain.value = 0.5;

//connect oscillator to gain
myOsc.connect(myGain);

//connect carrier to freq
carrier.connect(myOsc.frequency);

//connect gain to destination
myGain.connect(myAudioCtx.destination);

//start oscillator
const startAudio = function() {
  myAudioCtx.resume();
  myOsc.start()
  carrier.start();
};

let myButton = document.getElementById('startAudio');

myButton.addEventListener('click', startAudio);