import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Card, InputGroup } from 'react-bootstrap';

const AIChatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! Looking for a villa or need help moving?' }
    ]);
    const scrollRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            // Your Go Backend URL
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            
            setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to server.' }]);
        }
    };

    return (
        <div className="fixed-bottom p-3" style={{ zIndex: 1050, left: 'auto', width: '350px' }}>
            {!isOpen ? (
                <Button variant="primary" className="rounded-circle shadow-lg p-3" onClick={() => setIsOpen(true)}>
                    💬
                </Button>
            ) : (
                <Card className="shadow-lg border-0">
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <strong>AI Assistant</strong>
                        <Button variant="close" variant="white" onClick={() => setIsOpen(false)} />
                    </Card.Header>
                    <Card.Body style={{ height: '300px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-2 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div className={`p-2 rounded shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '80%' }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                        <Form onSubmit={handleSendMessage}>
                            <InputGroup>
                                <Form.Control 
                                    placeholder="Type a message..." 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)} 
                                />
                                <Button type="submit" variant="primary">Send</Button>
                            </InputGroup>
                        </Form>
                    </Card.Footer>
                </Card>
            )}
        </div>
    );
};

export default AIChatbox;