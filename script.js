let currentScreen = 'welcomeScreen';
let storyIndex = 0;
let memoriesShown = 0;
let noDodgeCount = 0;

// Navegación entre pantallas
function nextScreen(screenId) {
    document.getElementById(currentScreen).classList.remove('active');
    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
        currentScreen = screenId;
        
        if (currentScreen === 'questionScreen') {
            startHeartRain();
            // Agregar efecto de escritura a la pregunta principal
            setTimeout(() => {
                const questionElement = document.getElementById('mainQuestion');
                const originalText = questionElement.innerHTML;
                questionElement.innerHTML = '';
                questionElement.style.borderRight = '3px solid #ff1744';
                questionElement.style.animation = 'blink 1s infinite';
                
                let i = 0;
                const typeEffect = setInterval(() => {
                    if (i < originalText.length) {
                        questionElement.innerHTML = originalText.slice(0, i + 1);
                        i++;
                    } else {
                        clearInterval(typeEffect);
                        questionElement.style.borderRight = 'none';
                        questionElement.style.animation = 'glow-text 2s infinite alternate, bounce 3s infinite';
                    }
                }, 100);
            }, 1000);
        } else if (currentScreen === 'celebrationScreen') {
            startCelebrationEffects();
        }
    }, 500);
}

// Historia interactiva
function showStoryTexts() {
    const stories = ['story1', 'story2', 'story3'];
    
    if (storyIndex < stories.length) {
        document.getElementById(stories[storyIndex]).classList.add('show');
        storyIndex++;
        
        if (storyIndex >= stories.length) {
            setTimeout(() => {
                document.querySelector('#questionBtn').style.display = 'inline-block';
                document.querySelector('#storyScreen .next-btn').style.display = 'none';
            }, 1000);
        }
    }
}

// Mostrar recuerdos uno por uno
function showMemories() {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
            memoriesShown++;
            
            if (memoriesShown >= memoryCards.length) {
                setTimeout(() => {
                    document.getElementById('questionBtn').style.display = 'inline-block';
                }, 1000);
            }
        }, index * 800);
    });
}

// Animar tarjetas de recuerdos
function animateCard(card) {
    card.style.transform = 'scale(1.05) rotate(2deg)';
    card.style.background = 'rgba(255, 107, 157, 0.2)';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.background = 'rgba(255, 255, 255, 0.1)';
    }, 300);
}

// Mostrar viñeta de comentario al pasar el cursor
function showNoComment(btn) {
    // Solo mostrar la viñeta una vez
    if (btn.querySelector('.comment-bubble') || btn.classList.contains('btn-no-hiding')) {
        return;
    }
    
    // Crear viñeta de comentario
    const bubble = document.createElement('div');
    bubble.className = 'comment-bubble';
    bubble.innerHTML = 'Vaya... te dejo solo con SÍ entonces 😏💕';
    
    // Posicionar la viñeta relativa al botón
    btn.style.position = 'relative';
    btn.appendChild(bubble);
    
    // Después de 2.5 segundos, quitar la viñeta y empezar a ocultar el botón
    setTimeout(() => {
        bubble.style.animation = 'bubbleDisappear 0.5s ease-out forwards';
        
        setTimeout(() => {
            bubble.remove();
            
            // Empezar animación lenta de desaparición del botón "No"
            btn.classList.add('btn-no-hiding');
            
            // Después de que termine la animación, ocultar completamente
            setTimeout(() => {
                btn.style.display = 'none';
                
                // Hacer el botón "Sí" más prominente
                const yesBtn = document.querySelector('.btn-yes');
                yesBtn.style.transform = 'scale(1.1)';
                yesBtn.style.animation = 'pulse 1s infinite, rainbow 2s infinite, glow 1.5s infinite alternate';
                yesBtn.innerHTML = '¡ES TU ÚNICA OPCIÓN! 💕✨';
                
                // Centrar el botón "Sí"
                const buttonsContainer = document.querySelector('.answer-buttons');
                buttonsContainer.style.justifyContent = 'center';
                
            }, 2000); // Tiempo de la animación fadeOutSlow
        }, 500); // Tiempo de bubbleDisappear
    }, 2500); // Tiempo que permanece visible la viñeta
}

// Prevenir click en el botón "No" después de que aparezca la viñeta
function preventNo() {
    // No hacer nada, solo evitar que se ejecute cualquier acción
    return false;
}

// Mostrar celebración
function showCelebration() {
    // Crear explosión de corazones inmediata
    createHeartExplosion();
    
    // Efecto de zoom en la pregunta
    const mainQuestion = document.getElementById('mainQuestion');
    mainQuestion.style.transform = 'scale(1.2)';
    main
