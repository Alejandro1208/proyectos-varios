
let audioContext: AudioContext | null = null;
let noiseNode: ScriptProcessorNode | null = null;
let filterNode: BiquadFilterNode | null = null;

const getCtx = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
};

export const playPopSFX = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

export const playClickSFX = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};

export const startNoise = (type: 'brown' | 'pink' | 'white' = 'brown') => {
  const ctx = getCtx();
  if (noiseNode) return;

  const bufferSize = 4096;
  let lastOut = 0.0;
  let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0; // Para ruido rosa

  noiseNode = ctx.createScriptProcessor(bufferSize, 1, 1);
  noiseNode.onaudioprocess = (e) => {
    const output = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      
      if (type === 'brown') {
        let brown = (lastOut + (0.02 * white)) / 1.02;
        lastOut = brown;
        output[i] = brown * 3.5;
      } else if (type === 'pink') {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else {
        output[i] = white * 0.5;
      }
    }
  };

  filterNode = ctx.createBiquadFilter();
  filterNode.type = 'lowpass';
  filterNode.frequency.setValueAtTime(400, ctx.currentTime);

  noiseNode.connect(filterNode);
  filterNode.connect(ctx.destination);
};

export const stopNoise = () => {
  if (noiseNode) { noiseNode.disconnect(); noiseNode = null; }
  if (filterNode) { filterNode.disconnect(); filterNode = null; }
};
