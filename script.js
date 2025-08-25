const cover = document.getElementById('cover');
const openBtn = document.getElementById('open-btn');
const chatContainer = document.getElementById('chat-container');
const messagesDiv = document.getElementById('messages');
const typingDiv = document.getElementById('typing');
const optionsDiv = document.getElementById('options');

const sendSound = document.getElementById('send-sound');
const receiveSound = document.getElementById('receive-sound');

// Abrir chat desde la portada
openBtn.onclick = () => {
  cover.style.display = 'none';
  chatContainer.style.display = 'flex';
  showTypingMessage("Hola, tengo algo especial para ti...", [
    {text: "¿Qué es?", next: "pregunta1"}
  ]);
};

// Añadir mensaje al chat con sonido
function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.innerHTML = text;
  messagesDiv.appendChild(msg);
  setTimeout(() => msg.classList.add('show'), 50);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // reproducir audio
  if(sender === 'user') {
    sendSound.currentTime = 0;
    sendSound.play();
  } else if(sender === 'bot') {
    receiveSound.currentTime = 0;
    receiveSound.play();
  }
}

// Mostrar mensaje del bot con animación de escritura
function showTypingMessage(message, options = []) {
  optionsDiv.innerHTML = "";
  let dots = 0;
  typingDiv.style.display = 'block';
  const interval = setInterval(() => {
    typingDiv.innerText = 'writing' + '.'.repeat(dots);
    dots = (dots + 1) % 4;
  }, 400);

  setTimeout(() => {
    clearInterval(interval);
    typingDiv.style.display = 'none';
    addMessage(message, 'bot');
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.classList.add('option');
      btn.innerText = opt.text;
      btn.onclick = () => choose(opt.next, opt.text);
      optionsDiv.appendChild(btn);
      btn.style.display = 'block';
    });
  }, 1800);
}

// Manejar la elección del usuario
function choose(nextStep, userText) {
  addMessage(userText, 'user');

  setTimeout(() => {
    if(nextStep === "pregunta1"){
      showTypingMessage("Es un pequeño juego, quiero saber algo de ti...", [
        {text: "Está bien", next: "pregunta2"}
      ]);
    }
    else if(nextStep === "pregunta2"){
      showTypingMessage("Elige un camino: ¿prefieres las estrellas o el mar?", [
        {text: "Estrellas", next: "estrella"},
        {text: "Mar", next: "mar"}
      ]);
    }
    else if(nextStep === "estrella"){
      showTypingMessage("Las estrellas iluminan tu destino... ✦", [
        {text: "¿Y ahora?", next: "finalEstrella"}
      ]);
    }
    else if(nextStep === "mar"){
      showTypingMessage("El mar guarda secretos profundos... ☾", [
        {text: "¿Y ahora?", next: "finalMar"}
      ]);
    }
    else if(nextStep === "finalEstrella"){
      showTypingMessage(
        `Tu viaje termina aquí, pero hay algo esperándote: <a href="https://ejemplo.com/panecitos" target="_blank">panecitos</a>`, 
        [{text: "Volver al inicio", next: "reset"}]
      );
    }
    else if(nextStep === "finalMar"){
      showTypingMessage(
        `El mar te lleva a un destino distinto: <a href="https://ejemplo.com/panquesitos" target="_blank">panquesitos</a>`, 
        [{text: "Volver al inicio", next: "reset"}]
      );
    }
    else if(nextStep === "reset"){
      resetToCover();
    }
  }, 600);
}

// Reiniciar chat a portada
function resetToCover() {
  messagesDiv.innerHTML = '';
  optionsDiv.innerHTML = '';
  chatContainer.style.display = 'none';
  cover.style.display = 'flex';
}
