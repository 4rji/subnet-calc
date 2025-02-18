let currentLevel = 1;
const quizData = {
    1: {
        ip: "192.168.1.0/24",
        answers: {
            gateway: "192.168.1.1",
            broadcast: "192.168.1.255",
            usableIPs: "254",
            ipRange: "192.168.1.1 - 192.168.1.254",
            subnetMask: "255.255.255.0"
        }
    },
    2: {
        ip: "172.16.0.0/16",
        answers: {
            gateway: "172.16.0.1",
            broadcast: "172.16.255.255",
            usableIPs: "65534",
            ipRange: "172.16.0.1 - 172.16.255.254",
            subnetMask: "255.255.0.0"
        }
    },
    3: {
        ip: "10.0.0.0/8",
        answers: {
            gateway: "10.0.0.1",
            broadcast: "10.255.255.255",
            usableIPs: "16777214",
            ipRange: "10.0.0.1 - 10.255.255.254",
            subnetMask: "255.0.0.0"
        }
    },
    4: {
        ip: "10.0.0.0/24",
        answers: {
            gateway: "10.0.0.1",
            broadcast: "10.0.0.255",
            usableIPs: "254",
            ipRange: "10.0.0.1 - 10.0.0.254",
            subnetMask: "255.255.255.0"
        }
    }
};

const lessonData = {
    1: {
        title: "How to Find Gateway IP",
        content: `
            <h4>Understanding Gateway IP</h4>
            <p>The Gateway IP is typically the first usable IP address in a subnet. Here's how to find it:</p>
            
            <h4>Steps to Find Gateway IP:</h4>
            <p>1. Identify the network address (given IP with subnet mask)</p>
            <p>2. The Gateway is usually the first usable IP address after the network address</p>
            
            <h4>Examples:</h4>
            <p>For network <code>192.168.1.0/24</code>:</p>
            <p>- Network Address: 192.168.1.0</p>
            <p>- Gateway IP: 192.168.1.1</p>
            
            <h4>Quick Tip:</h4>
            <p>In most cases, just add 1 to the last octet of the network address to get the gateway IP!</p>
        `
    },
    2: {
        title: "Understanding Broadcast & IP Range",
        content: `
            <h4>Broadcast IP</h4>
            <p>The Broadcast IP is the last address in a subnet, used to send packets to all hosts.</p>
            
            <h4>IP Range</h4>
            <p>The usable IP range goes from the Gateway IP to the last usable IP (one before broadcast).</p>
            
            <h4>How to Calculate:</h4>
            <p>For a /24 network (e.g., 192.168.1.0/24):</p>
            <p>- Broadcast: 192.168.1.255</p>
            <p>- IP Range: 192.168.1.1 - 192.168.1.254</p>
            
            <h4>Remember:</h4>
            <p>- First IP = Network Address (not usable)</p>
            <p>- Last IP = Broadcast Address (not usable)</p>
        `
    },
    3: {
        title: "Calculating Usable IPs",
        content: `
            <h4>Understanding Usable IPs</h4>
            <p>Usable IPs are the addresses that can be assigned to hosts in a network.</p>
            
            <h4>Formula:</h4>
            <p>Usable IPs = 2^(32-prefix length) - 2</p>
            
            <h4>Common Subnet Sizes:</h4>
            <p>/24 = 254 usable IPs</p>
            <p>/16 = 65,534 usable IPs</p>
            <p>/8 = 16,777,214 usable IPs</p>
            
            <h4>Why Subtract 2?</h4>
            <p>We subtract 2 because:</p>
            <p>1. Network address cannot be used</p>
            <p>2. Broadcast address cannot be used</p>
        `
    }
};

function openQuiz(level) {
    currentLevel = level;
    document.getElementById('quizModal').style.display = 'block';
    document.getElementById('levelNumber').textContent = level;
    document.getElementById('givenIP').textContent = quizData[level].ip;
    clearInputs();
    clearFeedback();
}

function closeQuiz() {
    document.getElementById('quizModal').style.display = 'none';
}

function clearInputs() {
    const inputs = document.querySelectorAll('.quiz-form input');
    inputs.forEach(input => input.value = '');
}

function clearFeedback() {
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('feedback').className = 'feedback';
}

function checkAnswers() {
    const answers = quizData[currentLevel].answers;
    const userAnswers = {
        gateway: document.getElementById('gateway').value.trim(),
        broadcast: document.getElementById('broadcast').value.trim(),
        usableIPs: document.getElementById('usableIPs').value.trim(),
        ipRange: document.getElementById('ipRange').value.trim(),
        subnetMask: document.getElementById('subnetMask').value.trim()
    };

    let correct = true;
    let feedback = '';

    for (let key in answers) {
        if (userAnswers[key].toLowerCase() !== answers[key].toLowerCase()) {
            correct = false;
            feedback += `<p>❌ Incorrect ${key}. The correct answer is: ${answers[key]}</p>`;
        } else {
            feedback += `<p>✅ Correct ${key}!</p>`;
        }
    }

    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = feedback;
    feedbackElement.className = `feedback ${correct ? 'success' : 'error'}`;

    if (correct) {
        // Mark level as completed
        document.querySelector(`.level-btn:nth-child(${currentLevel})`).classList.add('completed');
    }
}

function openLesson(lesson) {
    currentLesson = lesson;
    document.getElementById('lessonModal').style.display = 'block';
    document.getElementById('lessonNumber').textContent = lesson;
    document.getElementById('lessonText').innerHTML = lessonData[lesson].content;
}

function closeLesson() {
    document.getElementById('lessonModal').style.display = 'none';
}

// Add these new constants and functions
const binaryQuizData = {
    binaryToDecimal: [
        { binary: "00010001", decimal: "17" },
        { binary: "00001111", decimal: "15" },
        { binary: "11000000", decimal: "192" },
        { binary: "11001100", decimal: "204" },
        { binary: "11111111", decimal: "255" }
    ],
    decimalToBinary: [
        { decimal: "65", binary: "01000001" },
        { decimal: "24", binary: "00011000" },
        { decimal: "184", binary: "10111000" },
        { decimal: "202", binary: "11001010" },
        { decimal: "128", binary: "10000000" }
    ]
};

let currentBinaryQuestion = 0;

function openBinaryQuiz() {
    currentBinaryQuestion = Math.floor(Math.random() * binaryQuizData.binaryToDecimal.length);
    document.getElementById('binaryQuizModal').style.display = 'block';
    document.getElementById('binaryNumber').textContent = binaryQuizData.binaryToDecimal[currentBinaryQuestion].binary;
    document.getElementById('decimalNumber').textContent = binaryQuizData.decimalToBinary[currentBinaryQuestion].decimal;
    clearBinaryInputs();
    clearBinaryFeedback();
}

function closeBinaryQuiz() {
    document.getElementById('binaryQuizModal').style.display = 'none';
}

function clearBinaryInputs() {
    document.getElementById('decimalAnswer').value = '';
    document.getElementById('binaryAnswer').value = '';
}

function clearBinaryFeedback() {
    document.getElementById('binaryFeedback').innerHTML = '';
    document.getElementById('binaryFeedback').className = 'feedback';
}

function checkBinaryAnswers() {
    const binaryToDecimal = binaryQuizData.binaryToDecimal[currentBinaryQuestion];
    const decimalToBinary = binaryQuizData.decimalToBinary[currentBinaryQuestion];
    
    const userDecimalAnswer = document.getElementById('decimalAnswer').value.trim();
    const userBinaryAnswer = document.getElementById('binaryAnswer').value.trim();
    
    let feedback = '';
    let allCorrect = true;

    // Check binary to decimal conversion
    if (userDecimalAnswer === binaryToDecimal.decimal) {
        feedback += '<p>✅ Correct binary to decimal conversion!</p>';
    } else {
        feedback += `<p>❌ Incorrect binary to decimal. ${binaryToDecimal.binary} = ${binaryToDecimal.decimal}</p>`;
        allCorrect = false;
    }

    // Check decimal to binary conversion
    if (userBinaryAnswer === decimalToBinary.binary) {
        feedback += '<p>✅ Correct decimal to binary conversion!</p>';
    } else {
        feedback += `<p>❌ Incorrect decimal to binary. ${decimalToBinary.decimal} = ${decimalToBinary.binary}</p>`;
        allCorrect = false;
    }

    const feedbackElement = document.getElementById('binaryFeedback');
    feedbackElement.innerHTML = feedback;
    feedbackElement.className = `feedback ${allCorrect ? 'success' : 'error'}`;

    if (allCorrect) {
        // Generate new question after 2 seconds
        setTimeout(() => {
            currentBinaryQuestion = (currentBinaryQuestion + 1) % binaryQuizData.binaryToDecimal.length;
            document.getElementById('binaryNumber').textContent = binaryQuizData.binaryToDecimal[currentBinaryQuestion].binary;
            document.getElementById('decimalNumber').textContent = binaryQuizData.decimalToBinary[currentBinaryQuestion].decimal;
            clearBinaryInputs();
            clearBinaryFeedback();
        }, 2000);
    }
}

function generateRandomBinary(length = 8) {
    let binary = '';
    // Aseguramos que el primer dígito sea 1 para evitar números que empiecen con 0
    binary += '1';
    for(let i = 1; i < length; i++) {
        binary += Math.round(Math.random());
    }
    return binary;
}

function generateRandomDecimal(max = 255) {
    return Math.floor(Math.random() * max + 1).toString();
}

function generateNewNumbers() {
    // Generar nuevo número binario
    const newBinary = generateRandomBinary();
    document.getElementById('binaryNumber').textContent = newBinary;
    
    // Generar nuevo número decimal
    const newDecimal = generateRandomDecimal();
    document.getElementById('decimalNumber').textContent = newDecimal;
    
    // Limpiar las entradas y el feedback
    clearBinaryInputs();
    clearBinaryFeedback();
    
    // Actualizar las respuestas correctas en binaryQuizData
    binaryQuizData.binaryToDecimal[currentBinaryQuestion] = {
        binary: newBinary,
        decimal: parseInt(newBinary, 2).toString()
    };
    
    binaryQuizData.decimalToBinary[currentBinaryQuestion] = {
        decimal: newDecimal,
        binary: parseInt(newDecimal).toString(2).padStart(8, '0')
    };
}

// Update the window.onclick function
window.onclick = function(event) {
    const quizModal = document.getElementById('quizModal');
    const lessonModal = document.getElementById('lessonModal');
    const binaryQuizModal = document.getElementById('binaryQuizModal');
    
    if (event.target == quizModal) {
        closeQuiz();
    }
    if (event.target == lessonModal) {
        closeLesson();
    }
    if (event.target == binaryQuizModal) {
        closeBinaryQuiz();
    }
} 