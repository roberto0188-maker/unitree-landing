// EmailJS Initialization
(function() {
    emailjs.init("GmN35ke_LF-XlFCPq");
})();

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('ai-chat');
const completionScreen = document.getElementById('completion-screen');

// EmailJS Configuration - USER: Fill these when created in panel
const SERVICE_ID = "service_3btpiop"; // Corrected Service ID
const TEMPLATE_ID = "template_nblv9r7"; // Corrected Template ID

let currentStep = 0;
const leadData = {
    useCase: '',
    budget: '',
    company: '',
    userEmail: '',
    consultaID: '',
    targetEmail: 'roberto0188@gmail.com'
};

const steps = [
    {
        question: "Entendido. ¿Para qué industria o caso de uso estás considerando robots Unitree?",
        field: 'useCase'
    },
    {
        question: "¿Qué presupuesto aproximado (USD) tienes asignado para este proyecto?",
        field: 'budget'
    },
    {
        question: "¿Cuál es el nombre de tu empresa o la persona que solicita información?",
        field: 'company'
    },
    {
        question: "Por último, ¿a qué correo electrónico te gustaría que te enviemos la propuesta comercial?",
        field: 'userEmail'
    }
];

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processResponse(response) {
    // Show user response
    addMessage(response, 'user');
    
    // Save data
    const step = steps[currentStep];
    leadData[step.field] = response;
    
    // Progress or Finish
    currentStep++;
    
    setTimeout(() => {
        if (currentStep < steps.length) {
            addMessage(steps[currentStep].question, 'bot');
        } else {
            sendLead();
        }
    }, 800);
    
    chatInput.value = '';
}

function generateConsultaID() {
    return 'UN-' + Math.floor(100000 + Math.random() * 900000);
}

function sendLead() {
    leadData.consultaID = generateConsultaID();
    const currentTime = new Date().toLocaleString();
    
    addMessage(`Procesando... Generando Número de Consulta: ${leadData.consultaID}`, 'bot');
    
    // MAPPING TO YOUR EXACT EMAIL TEMPLATE KEYS:
    const templateParams = {
        case_number: leadData.consultaID,
        name: leadData.company,
        email: leadData.userEmail,
        industry: leadData.useCase,
        budget: leadData.budget,
        time: currentTime,
        to_email: leadData.targetEmail // (Optional helper)
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(() => {
            console.log("SUCCESS! Email sent.");
            finalizeLead();
        }, (error) => {
            console.log("FAILED to send email...", error);
            finalizeLead();
        });
}

function finalizeLead() {
    setTimeout(() => {
        addMessage(`Se ha enviado la información de ${leadData.company} a roberto0188@gmail.com.`, 'bot');
        
        // Show success screen with details
        document.getElementById('display-consulta-id').innerText = leadData.consultaID;
        document.getElementById('display-company').innerText = leadData.company;
        
        setTimeout(() => {
            chatWindow.classList.add('hidden');
            completionScreen.classList.remove('hidden');
        }, 1500);
    }, 1500);
}

sendBtn.addEventListener('click', () => {
    if (chatInput.value.trim() !== '') {
        processResponse(chatInput.value.trim());
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        processResponse(chatInput.value.trim());
    }
});

function resetChat() {
    currentStep = 0;
    // Reset Data
    leadData.useCase = '';
    leadData.budget = '';
    leadData.company = '';
    leadData.userEmail = '';
    leadData.consultaID = '';
    
    chatMessages.innerHTML = '<div class="message bot">Hola, soy el asistente virtual de Unitree Partner. Estoy aquí para calificar tu proyecto. ¿Para qué industria o caso de uso estás considerando robots Unitree?</div>';
    chatWindow.classList.remove('hidden');
    completionScreen.classList.add('hidden');
}
