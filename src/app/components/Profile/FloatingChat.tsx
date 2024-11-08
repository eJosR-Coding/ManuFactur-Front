import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, IconButton, Typography, List, ListItem, ListItemText } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { IConversation, IMessage } from '../../types/chatTypes';

interface FloatingChatProps {
    userId: string;
    recipientId: string;
}

const FloatingChat: React.FC<FloatingChatProps> = ({ userId, recipientId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState<string>('');

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                // Verificar si ya existe una conversación entre los dos usuarios
                const res = await fetch(`http://localhost:5000/api/conversations`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ participants: [userId, recipientId] }),
                });
                const data = await res.json();
                if (data.success) {
                    setConversationId(data.data._id); // Almacenar el ID de la conversación
                    setMessages(data.data.messages); // Cargar mensajes
                }
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        };

        fetchConversation();
    }, [userId, recipientId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !conversationId) return;

        try {
            const res = await fetch(`http://localhost:5000/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversationId, sender: userId, content: newMessage }),
            });
            const data = await res.json();
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.data]); // Agregar el nuevo mensaje a la lista
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
            {!isOpen ? (
                <IconButton onClick={() => setIsOpen(true)}>
                    <ChatBubbleOutlineIcon fontSize="large" />
                </IconButton>
            ) : (
                <Box
                    sx={{
                        width: 300,
                        height: 400,
                        backgroundColor: '#2d3748',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 1,
                            backgroundColor: '#1a202c',
                            color: '#fff',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                        }}
                    >
                        <Typography variant="subtitle1">Chat</Typography>
                        <IconButton onClick={() => setIsOpen(false)} color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <List sx={{ flexGrow: 1, overflowY: 'auto', padding: 1 }}>
                        {messages.map((msg) => (
                            <ListItem key={msg._id}>
                                <ListItemText
                                    primary={msg.sender === userId ? 'You' : 'Friend'}
                                    secondary={msg.content}
                                    sx={{ textAlign: msg.sender === userId ? 'right' : 'left' }}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ display: 'flex', padding: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            sx={{
                                backgroundColor: '#1f2937',
                                color: '#fff',
                                '& .MuiOutlinedInput-root': { borderColor: '#374151' },
                                marginRight: 1,
                            }}
                        />
                        <Button onClick={handleSendMessage} variant="contained" color="primary">
                            Send
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default FloatingChat;
