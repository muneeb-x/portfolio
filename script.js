/* ==========================================================================
   IMMERSEVING QUANTUM REACTOR CORE ENGINE (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initQuantumCanvas();
  initSystemUptime();
  initHUDTabs();
  initHeroTypewriter();
  initAudioSynth();
  initNeuralNetSandbox();
  init3DCarousel();
  initEchoCompanion();
  initStatsDials();
});

/* ===== 1. COSMIC VECTOR FLOW BACKDROP CANVAS ===== */
function initQuantumCanvas() {
  const canvas = document.getElementById('quantumCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let mouse = { x: null, y: null, targetX: null, targetY: null, radius: 160 };
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });
  
  // Quantum particle explosion on click
  window.addEventListener('click', (e) => {
    if (e.target.tagName === 'CANVAS' || e.target.tagName === 'BODY') {
      triggerAudioChime(440 + Math.random() * 400); // Synthesize chime note!
      spawnExplosion(e.clientX, e.clientY);
    }
  });
  
  class VectorParticle {
    constructor(x, y, isExplosion = false) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height;
      this.vx = isExplosion ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.4;
      this.vy = isExplosion ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.4;
      this.baseRadius = isExplosion ? Math.random() * 3 + 1.5 : Math.random() * 2 + 0.5;
      this.radius = this.baseRadius;
      this.alpha = isExplosion ? 1 : Math.random() * 0.5 + 0.2;
      this.decay = isExplosion ? Math.random() * 0.02 + 0.01 : 0;
      this.color = getComputedStyle(document.body).getPropertyValue('--glow-primary').trim() || '#3bc9b0';
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.radius * 2;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
    
    update() {
      this.color = getComputedStyle(document.body).getPropertyValue('--glow-primary').trim() || '#3bc9b0';
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.decay > 0) {
        this.alpha -= this.decay;
        this.radius *= 0.96;
      } else {
        // Natural screen bounds rebound
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        // Mouse hover vector flow ripple
        if (mouse.x !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            this.x -= dx * force * 0.025;
            this.y -= dy * force * 0.025;
          }
        }
      }
      
      this.draw();
    }
  }
  
  function spawnExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
      particles.push(new VectorParticle(x, y, true));
    }
  }
  
  function spawnParticles() {
    particles = [];
    let count = Math.min(Math.floor((width * height) / 14000), 80);
    for (let i = 0; i < count; i++) {
      particles.push(new VectorParticle());
    }
  }
  
  function drawVectorGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
    ctx.lineWidth = 0.5;
    let gap = 60;
    
    for (let x = 0; x < width; x += gap) {
      ctx.beginPath();
      for (let y = 0; y < height; y += 10) {
        let offsetX = 0;
        if (mouse.x !== null) {
          let dx = mouse.x - x;
          let dy = mouse.y - y;
          let dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            offsetX = Math.sin(y * 0.05) * force * 18 * (dx > 0 ? -1 : 1);
          }
        }
        ctx.lineTo(x + offsetX, y);
      }
      ctx.stroke();
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Smooth lerp mouse coordinates
    if (mouse.targetX !== null && mouse.targetY !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      }
    } else {
      mouse.x = null;
      mouse.y = null;
    }
    
    drawVectorGrid();
    
    // Filter and update active particles
    particles = particles.filter(p => p.decay === 0 || p.alpha > 0.01);
    particles.forEach(p => p.update());
    
    // Maintain minimum count
    if (particles.filter(p => p.decay === 0).length < 40) {
      particles.push(new VectorParticle());
    }
    
    requestAnimationFrame(animate);
  }
  
  spawnParticles();
  animate();
}

/* ===== 2. REAL-TIME SYSTEM TELEMETRY COUNTERS ===== */
function initSystemUptime() {
  const uptimeEl = document.getElementById('uptime');
  const startTime = Date.now();
  
  function update() {
    let elapsed = Date.now() - startTime;
    let hrs = Math.floor(elapsed / 3600000);
    let mins = Math.floor((elapsed % 3600000) / 60000);
    let secs = Math.floor((elapsed % 60000) / 1000);
    let ms = Math.floor(elapsed % 1000);
    
    if (uptimeEl) {
      uptimeEl.textContent = 
        `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
    }
    requestAnimationFrame(update);
  }
  
  update();
  
  // Random ping telemetries
  setInterval(() => {
    const pingEl = document.getElementById('pingRate');
    if (pingEl) {
      pingEl.textContent = `${Math.floor(Math.random() * 4 + 9)}ms`;
    }
  }, 3000);
}

/* ===== 3. HUD FLOATING NAVBAR SECTIONS SCROLL ===== */
function initHUDTabs() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.hud-section');
  const navbar = document.querySelector('.hud-nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAudioChime(600 + Math.random() * 300); // Synthesize chime!
      
      document.getElementById('navLinks').classList.remove('open');
      
      const targetId = link.getAttribute('href').substring(1);
      if (!targetId) return;
      
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      sections.forEach(section => {
        section.classList.remove('active-section');
        if (section.id === targetId) {
          section.classList.add('active-section');
          
          // Custom loads trigger
          if (targetId === 'neural-net') drawNeuralNet();
          if (targetId === 'projects-deck') renderCarousel();
        }
      });
    });
  });
}

window.toggleMenu = function() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
};

/* ===== 4. DYNAMIC SYSTEM THEME SWITCHER ===== */
window.switchTheme = function(themeName) {
  triggerAudioChime(320);
  const body = document.body;
  
  body.classList.remove('theme-redblack');
  body.classList.add(`theme-${themeName}`);
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(themeName)) {
      btn.classList.add('active');
    }
  });
};

/* ===== 5. HERO TYPEWRITER CAROUSEL ===== */
function initHeroTypewriter() {
  const words = ['DATA PIPELINES', 'ML MODELS', 'C++ SYSTEMS', 'JAVA APPS', 'BIG DATA CORE'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typing');
  
  if (!typingEl) return;
  
  function type() {
    const current = words[wordIdx];
    if (!isDeleting) {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 80);
    } else {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    }
  }
  
  type();
}

/* ===== 6. REAL-TIME WEB AUDIO API SYNTHESIZER ENGINE ===== */
let audioCtx = null;
let isAudioMuted = true;

function initAudioSynth() {
  const toggleBtn = document.getElementById('audioToggleBtn');
  const footerText = document.getElementById('audioStatusText');
  
  window.toggleAudio = function() {
    isAudioMuted = !isAudioMuted;
    
    if (!isAudioMuted) {
      // Initialize AudioContext on first user action
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      toggleBtn.innerHTML = '<i class="fas fa-volume-up"></i> ACTIVE';
      toggleBtn.classList.add('synth-active');
      footerText.textContent = 'ACTIVE';
      footerText.classList.add('t-success');
      
      // Synthesize starting chime chord!
      triggerSynthesizedChord([261.63, 329.63, 392.00, 523.25]); // C Major
    } else {
      toggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i> MUTED';
      toggleBtn.classList.remove('synth-active');
      footerText.textContent = 'MUTED';
      footerText.classList.remove('t-success');
    }
  };
  
  // Connect synthesized hover sounds to all HUD links, buttons, and chips
  const interactiveNodes = document.querySelectorAll('a, button, select, input, .chip, .project-carousel-card');
  interactiveNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      if (!isAudioMuted && audioCtx) {
        triggerAudioChime(500 + Math.random() * 350); // Warm cyber chime!
      }
    });
  });
}

function triggerAudioChime(freq) {
  if (isAudioMuted || !audioCtx) return;
  
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    osc.type = 'triangle'; // Warm, soft synthesized chime waves
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Lowpass filter for smooth analog telemetry vibe
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
    
    // Gain decays smoothly over 1 second
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  } catch (err) {
    console.warn('Web Audio node collision: ', err);
  }
}

function triggerSynthesizedChord(frequencies) {
  if (isAudioMuted || !audioCtx) return;
  
  try {
    frequencies.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const delay = audioCtx.createDelay();
      
      osc.type = 'sine'; // Pure beautiful harmonics
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);
      
      delay.delayTime.setValueAtTime(0.15, audioCtx.currentTime);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 2.5);
    });
  } catch (err) {
    console.warn('Chord Synthesis error: ', err);
  }
}

/* ===== 7. MLP NEURAL NETWORK BACKPROPAGATION SOLVER SANDBOX ===== */
let netConfig = {
  canvas: null,
  ctx: null,
  // MLP architecture: 2 Inputs -> 3 Hidden -> 1 Output
  inputs: [0.6, 0.4],
  hidden: [0, 0, 0],
  output: 0,
  // Weight arrays initialized randomly between [-1.0, 1.0]
  w1: [
    [0.2, -0.4, 0.6],  // w1 from x1 to hidden[0, 1, 2]
    [-0.5, 0.3, 0.1]   // w1 from x2 to hidden[0, 1, 2]
  ],
  w2: [0.7, -0.3, 0.5], // w2 from hidden[0, 1, 2] to output
  biases: [0.1, -0.2, 0.15, -0.1], // hidden biases + output bias
  target: 0,
  isTraining: false,
  epochs: 0
};

function initNeuralNetSandbox() {
  netConfig.canvas = document.getElementById('neuralNetCanvas');
  if (!netConfig.canvas) return;
  netConfig.ctx = netConfig.canvas.getContext('2d');
  
  resizeNetCanvas();
  window.addEventListener('resize', resizeNetCanvas);
  
  // Setup inputs
  updateNeuronInputs();
}

function resizeNetCanvas() {
  if (!netConfig.canvas) return;
  const parent = netConfig.canvas.parentElement;
  netConfig.canvas.width = parent.clientWidth;
  netConfig.canvas.height = parent.clientHeight;
  drawNeuralNet();
}

window.updateNeuronInputs = function() {
  const x1 = parseFloat(document.getElementById('neuronX1').value);
  const x2 = parseFloat(document.getElementById('neuronX2').value);
  
  document.getElementById('valX1').textContent = x1.toFixed(1);
  document.getElementById('valX2').textContent = x2.toFixed(1);
  
  netConfig.inputs = [x1, x2];
  
  // Set targeted value: y = 1 if x1 + x2 >= 1.0 else 0
  netConfig.target = (x1 + x2 >= 1.0) ? 1 : 0;
  
  drawNeuralNet();
};

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

window.runForwardPass = function() {
  if (netConfig.isTraining) return;
  triggerAudioChime(640);
  
  // Step 1: Forward Propagation through 3 Hidden Neurons
  for (let h = 0; h < 3; h++) {
    let z = netConfig.inputs[0] * netConfig.w1[0][h] + 
            netConfig.inputs[1] * netConfig.w1[1][h] + 
            netConfig.biases[h];
    netConfig.hidden[h] = sigmoid(z);
  }
  
  // Step 2: Forward Propagation to Output
  let zOut = netConfig.hidden[0] * netConfig.w2[0] + 
             netConfig.hidden[1] * netConfig.w2[1] + 
             netConfig.hidden[2] * netConfig.w2[2] + 
             netConfig.biases[3];
  netConfig.output = sigmoid(zOut);
  
  // Update output logs
  document.getElementById('neuronOutput').textContent = netConfig.output.toFixed(4);
  document.getElementById('trainingStatus').textContent = 'FORWARD_PASS_COMPLETED';
  
  // Animate synaptic signals
  animateNeuralFlow();
};

function animateNeuralFlow() {
  let startTime = Date.now();
  const ctx = netConfig.ctx;
  const canvas = netConfig.canvas;
  
  function drawFlow() {
    let elapsed = Date.now() - startTime;
    let progress = elapsed / 1000; // 1s animation
    
    if (progress > 1) {
      drawNeuralNet();
      return;
    }
    
    drawNeuralNet(progress);
    requestAnimationFrame(drawFlow);
  }
  
  drawFlow();
}

window.trainNeuralNetwork = function() {
  if (netConfig.isTraining) return;
  netConfig.isTraining = true;
  document.getElementById('trainingStatus').textContent = 'TRAINING_BACKPROP_ACTIVE...';
  
  let epoch = 0;
  let targetEpochs = 40;
  let learningRate = 0.55;
  
  function trainingStep() {
    if (!netConfig.isTraining) return;
    
    // 1. Forward Pass
    for (let h = 0; h < 3; h++) {
      let z = netConfig.inputs[0] * netConfig.w1[0][h] + 
              netConfig.inputs[1] * netConfig.w1[1][h] + 
              netConfig.biases[h];
      netConfig.hidden[h] = sigmoid(z);
    }
    let zOut = netConfig.hidden[0] * netConfig.w2[0] + 
               netConfig.hidden[1] * netConfig.w2[1] + 
               netConfig.hidden[2] * netConfig.w2[2] + 
               netConfig.biases[3];
    netConfig.output = sigmoid(zOut);
    
    // 2. Compute Output Error Gradient (Mean Squared Error derivative)
    let error = netConfig.target - netConfig.output;
    let dOutput = error * netConfig.output * (1 - netConfig.output); // Output local gradient
    
    // 3. Backpropagate error to Hidden layer
    let dHidden = [0, 0, 0];
    for (let h = 0; h < 3; h++) {
      let hiddenError = dOutput * netConfig.w2[h];
      dHidden[h] = hiddenError * netConfig.hidden[h] * (1 - netConfig.hidden[h]); // Hidden local gradient
    }
    
    // 4. Update weights using Gradient Descent
    for (let h = 0; h < 3; h++) {
      netConfig.w2[h] += learningRate * dOutput * netConfig.hidden[h];
      netConfig.w1[0][h] += learningRate * dHidden[h] * netConfig.inputs[0];
      netConfig.w1[1][h] += learningRate * dHidden[h] * netConfig.inputs[1];
    }
    
    // Update biases
    netConfig.biases[3] += learningRate * dOutput;
    for (let h = 0; h < 3; h++) {
      netConfig.biases[h] += learningRate * dHidden[h];
    }
    
    epoch++;
    netConfig.epochs++;
    document.getElementById('epochsCounter').textContent = netConfig.epochs;
    document.getElementById('neuronOutput').textContent = netConfig.output.toFixed(4);
    
    if (epoch % 5 === 0) {
      triggerAudioChime(300 + epoch * 10); // Synthesize pitch rise!
    }
    
    drawNeuralNet();
    
    if (epoch < targetEpochs && Math.abs(error) > 0.005) {
      setTimeout(trainingStep, 80);
    } else {
      netConfig.isTraining = false;
      document.getElementById('trainingStatus').textContent = `CONVERGED (ERR: ${Math.abs(error).toFixed(5)})`;
      triggerSynthesizedChord([329.63, 392.00, 523.25, 659.25]); // Major chord resolution!
    }
  }
  
  trainingStep();
};

window.resetNeuralNetwork = function() {
  triggerAudioChime(240);
  netConfig.isTraining = false;
  netConfig.epochs = 0;
  document.getElementById('epochsCounter').textContent = '0';
  document.getElementById('neuronOutput').textContent = '0.0000';
  document.getElementById('trainingStatus').textContent = 'RESET_COMPLETED';
  
  // Reset weights randomly
  netConfig.w1 = [
    [(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5],
    [(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5]
  ];
  netConfig.w2 = [(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5];
  netConfig.hidden = [0, 0, 0];
  netConfig.output = 0;
  
  drawNeuralNet();
};

function drawNeuralNet(flowProgress = null) {
  const ctx = netConfig.ctx;
  const canvas = netConfig.canvas;
  if (!ctx || !canvas) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Neuron coordinates mapping
  const nodes = {
    inputs: [
      { x: canvas.width * 0.15, y: canvas.height * 0.35, val: netConfig.inputs[0], lbl: 'bias (x1)' },
      { x: canvas.width * 0.15, y: canvas.height * 0.65, val: netConfig.inputs[1], lbl: 'flow (x2)' }
    ],
    hidden: [
      { x: canvas.width * 0.5, y: canvas.height * 0.25, val: netConfig.hidden[0], lbl: 'h1' },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, val: netConfig.hidden[1], lbl: 'h2' },
      { x: canvas.width * 0.5, y: canvas.height * 0.75, val: netConfig.hidden[2], lbl: 'h3' }
    ],
    output: { x: canvas.width * 0.85, y: canvas.height * 0.5, val: netConfig.output, lbl: 'output (y)' }
  };
  
  const green = '#ff1a1a';
  const magenta = '#880000';
  
  // 1. Draw Synaptic Links (Synapses)
  // Input to Hidden Synapses
  for (let i = 0; i < 2; i++) {
    for (let h = 0; h < 3; h++) {
      let weight = netConfig.w1[i][h];
      let thickness = Math.min(Math.abs(weight) * 3 + 0.5, 6);
      ctx.beginPath();
      ctx.moveTo(nodes.inputs[i].x, nodes.inputs[i].y);
      ctx.lineTo(nodes.hidden[h].x, nodes.hidden[h].y);
      ctx.strokeStyle = weight >= 0 ? green : magenta;
      ctx.globalAlpha = Math.min(Math.abs(weight) * 0.4 + 0.12, 0.75);
      ctx.lineWidth = thickness;
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      // Draw flowing signal impulse
      if (flowProgress !== null && flowProgress < 0.5) {
        let t = flowProgress * 2; // scale to [0, 1] range
        let px = nodes.inputs[i].x + (nodes.hidden[h].x - nodes.inputs[i].x) * t;
        let py = nodes.inputs[i].y + (nodes.hidden[h].y - nodes.inputs[i].y) * t;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }
  
  // Hidden to Output Synapses
  for (let h = 0; h < 3; h++) {
    let weight = netConfig.w2[h];
    let thickness = Math.min(Math.abs(weight) * 3 + 0.5, 6);
    ctx.beginPath();
    ctx.moveTo(nodes.hidden[h].x, nodes.hidden[h].y);
    ctx.lineTo(nodes.output.x, nodes.output.y);
    ctx.strokeStyle = weight >= 0 ? green : magenta;
    ctx.globalAlpha = Math.min(Math.abs(weight) * 0.4 + 0.12, 0.75);
    ctx.lineWidth = thickness;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Draw flowing signal impulse
    if (flowProgress !== null && flowProgress >= 0.5) {
      let t = (flowProgress - 0.5) * 2; // scale to [0, 1] range
      let px = nodes.hidden[h].x + (nodes.output.x - nodes.hidden[h].x) * t;
      let py = nodes.hidden[h].y + (nodes.output.y - nodes.hidden[h].y) * t;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  
  // 2. Draw Neuron Nodes
  const allNodes = [...nodes.inputs, ...nodes.hidden, nodes.output];
  allNodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0a16';
    ctx.fill();
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--glow-primary').trim() || '#3bc9b0';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw internal active core glow
    let alpha = node.val;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--glow-accent').trim() || '#7c6aff';
    ctx.globalAlpha = alpha * 0.8 + 0.1;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    // Node values text labels
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.val.toFixed(2), node.x, node.y);
    
    // Node designation text label above
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-dim').trim() || '#6c6c90';
    ctx.font = '600 8px monospace';
    ctx.fillText(node.lbl.toUpperCase(), node.x, node.y - 25);
  });
}

/* ===== 8. LIQUID 3D CAROUSEL PROJECT SHIFTER ===== */
let carouselIndex = 0;

function init3DCarousel() {
  renderCarousel();
}

window.selectCarouselCard = function(idx) {
  if (carouselIndex === idx) return;
  triggerAudioChime(420);
  carouselIndex = idx;
  renderCarousel();
};

window.slideCarousel = function(dir) {
  triggerAudioChime(400);
  if (dir === 'left') {
    carouselIndex = (carouselIndex - 1 + 3) % 3;
  } else {
    carouselIndex = (carouselIndex + 1) % 3;
  }
  renderCarousel();
};

function renderCarousel() {
  const cards = document.querySelectorAll('.project-carousel-card');
  const indicators = document.querySelectorAll('.carousel-indicators .indicator');
  
  cards.forEach((card, idx) => {
    // Math to compute relative angles and depths of circular slides
    let offset = idx - carouselIndex;
    
    // Correct looping offsets
    if (offset < -1) offset += 3;
    if (offset > 1) offset -= 3;
    
    card.classList.remove('active-card');
    
    if (offset === 0) {
      // Center active slide
      card.style.transform = `translateX(0px) translateZ(80px) rotateY(0deg) scale(1.05)`;
      card.style.opacity = 1;
      card.style.zIndex = 5;
      card.classList.add('active-card');
      
      // Red/black theme active card highlight
      card.style.borderColor = 'var(--glow-primary)';
    } else if (offset === 1) {
      // Right slide
      card.style.transform = `translateX(280px) translateZ(-150px) rotateY(-36deg) scale(0.85)`;
      card.style.opacity = 0.35;
      card.style.zIndex = 3;
    } else {
      // Left slide
      card.style.transform = `translateX(-280px) translateZ(-150px) rotateY(36deg) scale(0.85)`;
      card.style.opacity = 0.35;
      card.style.zIndex = 3;
    }
  });
  
  // Sync dot indicators
  indicators.forEach((ind, idx) => {
    ind.classList.remove('active');
    if (idx === carouselIndex) ind.classList.add('active');
  });
}

/* ===== 9. SMART COMPANION ECHO-9 CONVERSATIONAL ENVIRONMENT ===== */
function initEchoCompanion() {
  // Eye iris parallax movement loops based on cursor client vectors
  const iris = document.getElementById('eyeIris');
  const pupil = document.getElementById('eyePupil');
  
  window.addEventListener('mousemove', (e) => {
    if (!iris || !pupil) return;
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Translate client ratio to eye coordinate shift limits
    const shiftX = (x - 0.5) * 12;
    const shiftY = (y - 0.5) * 12;
    
    iris.setAttribute('cx', 50 + shiftX);
    iris.setAttribute('cy', 50 + shiftY);
    
    pupil.setAttribute('cx', 50 + shiftX * 1.5);
    pupil.setAttribute('cy', 50 + shiftY * 1.5);
  });
}

const chatDatabase = {
  bio: "Abdul Muneeb is a Data Science & AI enthusiast currently pursuing his BS in Data Science. He has a strong foundation in C, C++, Java, Python, and SQL, and is passionate about building intelligent systems that solve real-world problems. His engineering ethos centres around clean, efficient, and scalable solutions.",
  skills: "Abdul Muneeb's technical arsenal includes: C, C++, Java, Python, SQL, JavaScript for languages. Pandas, NumPy, Scikit-Learn, Apache Kafka, Apache Spark for Data & AI. Git, Docker, Jupyter, VS Code, and Linux for tools and environments.",
  os: "The OS Assignments (A01, A02, A03) are a series of system-level programming projects written in C, covering core Operating Systems concepts including process management, memory handling, file systems, and CPU scheduling algorithms.",
  focus: "Abdul Muneeb is currently focused on exploring data-driven solutions & intelligent systems. He is diving deep into machine learning, big data technologies, and building a strong foundation in software engineering principles.",
  sound: "Pure custom synthesizer channels built using the HTML5 Web Audio API! Oscillators build complex triangle/sine soundwaves, gain layers construct decay curves, and biquad filter nodes compile a low-pass analog texture. 100% real-time, asset-free browser audio."
};

window.triggerEchoQuery = function(topic) {
  const logs = document.getElementById('chatLogs');
  const iris = document.getElementById('eyeIris');
  const status = document.getElementById('eyeStatus');
  
  if (!logs || !chatDatabase[topic]) return;
  
  // Highlight eye active scan visual state!
  triggerAudioChime(720);
  if (iris) {
    iris.style.fill = 'rgba(255, 255, 255, 0.1)';
    setTimeout(() => { iris.style.fill = 'rgba(var(--glow-primary), 0.04)'; }, 600);
  }
  if (status) {
    status.textContent = 'COMPILING_QUERY...';
    status.className = 't-accent';
  }
  
  // 1. Log outgoing question bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-line outgoing';
  userBubble.innerHTML = `
    <span class="sender-tag">[OPERATOR]:</span>
    <span class="sender-msg">Querying AR.TELEMETRY: ${topic.toUpperCase()}</span>
  `;
  logs.appendChild(userBubble);
  
  // Typewriter output delay
  setTimeout(() => {
    if (status) {
      status.textContent = 'REPLY_ESTABLISHED';
      status.className = 't-success';
    }
    
    const replyBubble = document.createElement('div');
    replyBubble.className = 'chat-line incoming';
    replyBubble.innerHTML = `
      <span class="sender-tag">[ECHO-9]:</span>
      <span class="sender-msg" id="typingEcho"></span>
    `;
    logs.appendChild(replyBubble);
    
    // Typewriter effect on Echo-9 response
    const msg = chatDatabase[topic];
    const targetEl = document.getElementById('typingEcho');
    let idx = 0;
    
    function typeResponse() {
      if (idx < msg.length) {
        targetEl.textContent += msg[idx];
        idx++;
        logs.scrollTop = logs.scrollHeight;
        setTimeout(typeResponse, 12);
      } else {
        // Strip temporary typing ID
        targetEl.removeAttribute('id');
        if (status) {
          status.textContent = 'MONITORING_INPUT';
          status.className = 't-success';
        }
      }
    }
    typeResponse();
    
  }, 750);
};

/* ===== 10. STATISTICS COUNT-UPS ===== */
function initStatsDials() {
  const dial = document.getElementById('reactorGauge');
  if (!dial) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Dasharray: 2 * PI * 48 = 301.6
        // Set projects stat dial to ~80% fill
        dial.style.strokeDashoffset = 301 - (80 / 100) * 301;
        
        // Trigger metric number count-ups
        const counter = document.getElementById('countVal');
        if (counter) {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          let curr = 0;
          
          function count() {
            curr += target / 60;
            if (curr >= target) {
              counter.textContent = target;
            } else {
              counter.textContent = Math.floor(curr);
              requestAnimationFrame(count);
            }
          }
          count();
        }
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(document.querySelector('.dials-panel'));
}

/* ===== 11. CONNECT EMAIL COPY CLIPBOARD & MAILTO LAUNCH ===== */
window.copyEmail = function(btn) {
  const email = 'muneebkhurram69@gmail.com';
  const toast = document.getElementById('hudToast');
  
  triggerAudioChime(880); // High chime!
  
  navigator.clipboard.writeText(email).then(() => {
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2400);
    }
    
    setTimeout(() => {
      window.location.href = `mailto:${email}`;
    }, 350);
  }).catch(err => {
    console.error('Copy pipeline halted: ', err);
    window.location.href = `mailto:${email}`;
  });
};

/* ===== 12. MAGNETIC NODE TRANSLATION TRAILING ===== */
const magneticNodes = document.querySelectorAll('.magnetic-node');
if (window.innerWidth >= 768) {
  magneticNodes.forEach(node => {
    node.addEventListener('mousemove', (e) => {
      const bounds = node.getBoundingClientRect();
      const x = e.clientX - bounds.left - (bounds.width / 2);
      const y = e.clientY - bounds.top - (bounds.height / 2);
      
      const factor = 0.38;
      node.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
    
    node.addEventListener('mouseleave', () => {
      node.style.transform = 'translate(0px, 0px)';
    });
  });
}
