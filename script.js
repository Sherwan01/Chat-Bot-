let userName = '';  // Variable to store the user's name

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = userInput.value.trim();

    if (message === '') return;

    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show typing indicator
    showTypingIndicator();

    // Simulate bot's response delay
    setTimeout(() => {
        // Hide typing indicator
        hideTypingIndicator();

        // Bot's response
        const botResponse = getBotResponse(message);
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = botResponse;
        chatBox.appendChild(botMessage);

        // Add quick reply buttons
        addQuickReplyButtons(chatBox);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);  // Adjust delay as needed

    // Clear the input
    userInput.value = '';
}

function getBotResponse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("my name is")) {
        userName = message.split(" ").slice(-1)[0];  // Extract the name from the message
        return `Nice to meet you, ${userName}! How can I help you today?`;
    }

    // Expanded response database
    const responses = {
        "hello": `Hi ${userName || 'there'}! How can I assist you today?`,
        "how are you": `I'm just a bunch of code, but I'm functioning perfectly! How about you, ${userName || 'friend'}?`,
        "what's your name": "I'm a chatbot created by Himanshu. And you are?",
        "bye": `Goodbye ${userName || ''}! Feel free to come back anytime.`,
        "what can you do": "I can chat, tell jokes, share knowledge, and help with basic tasks. What would you like to do?",
        "who created you": "I was created by Himanshu, a developer who loves to build cool things.",
        "tell me a joke": "Why don't some couples go to the gym? Because some relationships don't work out!",
        "what's the weather like": "I'm not sure about the current weather, but you can check it on your favorite weather app!",
        "what time is it": `The current time is ${new Date().toLocaleTimeString()}.`,
        "what's the date today": `Today's date is ${new Date().toLocaleDateString()}.`,
        "how old are you": "I’m ageless, but I’ve been around since this page was loaded!",
        "what's your favorite color": "I don't have a preference, but I think all colors are beautiful.",
        "what is 2 + 2": "2 + 2 equals 4.",
        "tell me about yourself": `I'm a chatbot, here to make your day better! How can I assist you, ${userName || 'friend'}?`,
        "tell me a story": "Once upon a time, in a land of code, a friendly chatbot was created to help people just like you...",
        "what's your favorite food": "I don't eat, but I've heard pizza is quite popular!",
        "what's the meaning of life": "42! Just kidding, it's whatever you make of it.",
        "how do you work": "I respond to your inputs based on patterns and predefined logic. You type, I respond!",
        "what is love": "Love is a complex emotion. Some say it's about care, others about connection. What do you think?",
        "recommend a book": "I’d suggest starting with '1984' by George Orwell if you’re into dystopian novels.",
        "sing a song": "🎶 I'm a little chatbot, short and stout... 🎶",
        "play a game": "How about a quick round of 20 questions? You start!",
        "where are you from": "I'm from the digital world, created right here in your browser!",
        "what's your purpose": "My purpose is to assist, entertain, and provide information. What can I do for you?",
        "can you help me with coding": "Absolutely! I can help with coding questions. What language are you working with?",
        "who am i": `You're ${userName || 'a curious user'}, and I'm happy to chat with you!`,
        "tell me something interesting": "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
        "can you speak other languages": "I primarily communicate in English, but I can handle a few basic phrases in other languages!",

        // New responses about the creator
        "tell me about your creator": `My creator is Himanshu. He is a Computer Engineering student at Delhi Technological University (DTU) with a GPA of 7.6. He is skilled in C++, Python, Java, SQL, CSS, and JavaScript, among other technologies.`,
        "give some info about himanshu": `Himanshu is currently studying at Delhi Technological University (DTU), pursuing a degree in Computer Engineering. He has a passion for modern and quantum physics and is actively researching Quantum Entanglement. Himanshu also enjoys reading, cricket, and working out. He was the Cultural Council Head at Engifest DTU and has led various projects like a portfolio website and a note-taking website.`,
        "what's your creator's education": `Himanshu is pursuing a degree in Computer Engineering from Delhi Technological University (2021-2025) with a GPA of 7.6. He scored 90% in his Xth CBSE exams and 84% in his XIIth CBSE exams.`,
        "what's your creator's experience": `Himanshu has experience as a Mentor at Desh Ke Mentor (01/2022-04/2022), where he led a program for underprivileged students, helping them discover their passions and set long-term goals. His efforts resulted in a 75% increase in students pursuing their ambitions.`,
        "what are his skills": `Himanshu is skilled in C++, Python, Java, SQL, CSS, and JavaScript. He is also proficient in React, Canvas, MongoDB, and SQL databases.`,
        "what are his achievements": `Himanshu was the sole student from his coaching center to gain admission to DTU and clear the JEE Mains examination. He also co-led the Yuvaan Fest, increasing attendance by 50% and sponsorship revenue by 30%.`,
        "what are his interests": `Himanshu is passionate about theoretical physics, especially quantum physics. He enjoys reading sci-fi and historical novels, playing and watching cricket, and maintaining a disciplined workout routine.`,
        "what are his projects": `Himanshu has worked on several projects, including a portfolio website and a note-taking website. You can check all his projects on his GitHub profile.`,
        "what are his leadership roles": `Himanshu has held several leadership roles, including Cultural Council Head at Engifest DTU (Aug 2023-May 2024), Official Head of the Astronomical Club (March 2022-May 2023), and PR Head at Yuvaan Cultural Fest (April 2022-April 2024).`,

        // Resume showcase options
        "tell me more": "Sure! Would you like to know more about Himanshu's Education, Experience, Skills, Achievements, Interests, Projects, or Leadership roles?",
        "i need help with something else": "No problem! Do you want to learn more about Himanshu's Education, Experience, Skills, Achievements, Interests, Projects, or Leadership roles?",
        "let's chat about something else": "Of course! You can ask me about Himanshu's Education, Experience, Skills, Achievements, Interests, Projects, or Leadership roles!",

        "default": "I'm sorry, I don't understand that. Could you please rephrase or ask something else?"
    };

    // Additional pattern matching
    if (lowerCaseMessage.includes("weather")) {
        return "I can't check the weather right now, but you can always find it online!";
    } else if (lowerCaseMessage.includes("your creator") || lowerCaseMessage.includes("who made you")) {
        return "I was created by Himanshu, a talented developer!";
    } else if (lowerCaseMessage.includes("tell me a story")) {
        return "Once upon a time, in a world full of data, a chatbot was born to help and entertain users...";
    } else if (lowerCaseMessage.includes("calculate")) {
        return "I can help with basic math. What would you like to calculate?";
    } else if (lowerCaseMessage.includes("help me with")) {
        return "Sure! What do you need help with?";
    } else if (lowerCaseMessage.includes("quote")) {
        return "Here's one for you: 'The only way to do great work is to love what you do.' - Steve Jobs";
    } else if (lowerCaseMessage.includes("fact")) {
        return "Did you know that a group of flamingos is called a 'flamboyance'?";
    }

    return responses[lowerCaseMessage] || responses["default"];
}




function showTypingIndicator() {
    const chatBox = document.getElementById('chat-box');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
    chatBox.appendChild(typingIndicator);
}

function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function addQuickReplyButtons(chatBox) {
    const quickReplies = [
        "Tell me more!",
        "I need help with something else.",
        "Let's chat about something else."
    ];

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'quick-replies';

    quickReplies.forEach(reply => {
        const button = document.createElement('button');
        button.className = 'quick-reply-button';
        button.textContent = reply;
        button.onclick = () => {
            document.getElementById('user-input').value = reply;
            sendMessage();
        };
        buttonContainer.appendChild(button);
    });

    chatBox.appendChild(buttonContainer);
}

// Handle Enter key for sending messages
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
