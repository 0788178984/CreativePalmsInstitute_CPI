// Footer loader script
document.addEventListener('DOMContentLoaded', function() {
    // Function to load footer
    function loadFooter() {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const footerContainer = document.getElementById('footer-container');
                if (footerContainer) {
                    footerContainer.innerHTML = data;
                    
                    // Initialize AI Assistant functionality after footer is loaded
                    initAIAssistant();
                }
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Provide fallback
                const footerContainer = document.getElementById('footer-container');
                if (footerContainer) {
                    footerContainer.innerHTML = '<div class="container py-3 text-center">&copy; 2025 Creative Palms Business & Vocational Institute. All rights reserved.</div>';
                }
            });
    }
    
    // Function to initialize the AI Assistant
    function initAIAssistant() {
        const aiAssistantIcon = document.getElementById('aiAssistantIcon');
        const aiAssistantChat = document.getElementById('aiAssistantChat');
        const closeChat = document.getElementById('closeChat');
        const chatMessages = document.getElementById('chatMessages');
        const userMessage = document.getElementById('userMessage');
        const sendMessage = document.getElementById('sendMessage');
        
        if (aiAssistantIcon && aiAssistantChat) {
            // Toggle chat window
            aiAssistantIcon.addEventListener('click', () => {
                aiAssistantChat.classList.add('active');
            });
            
            if (closeChat) {
                closeChat.addEventListener('click', () => {
                    aiAssistantChat.classList.remove('active');
                });
            }
            
            // Send message functionality
            if (sendMessage && userMessage && chatMessages) {
                function addMessage(message, isUser = false) {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('message');
                    messageDiv.classList.add(isUser ? 'user' : 'bot');
                    messageDiv.textContent = message;
                    chatMessages.appendChild(messageDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
                
                sendMessage.addEventListener('click', () => {
                    const message = userMessage.value.trim();
                    if (message) {
                        addMessage(message, true);
                        userMessage.value = '';
                        
                        // Simulate bot response
                        setTimeout(() => {
                            const responses = [
                                "I'll help you with that! Please provide more details.",
                                "Thank you for your question. Let me find the information for you.",
                                "I understand what you're looking for. Here's what you need to know...",
                                "That's a great question! Here's how we can help..."
                            ];
                            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                            addMessage(randomResponse);
                        }, 1000);
                    }
                });
                
                userMessage.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        sendMessage.click();
                    }
                });
            }
        }
    }
    
    // Load the footer
    loadFooter();
}); 