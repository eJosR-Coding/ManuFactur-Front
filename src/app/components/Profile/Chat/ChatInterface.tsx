// src/components/ChatInterface.tsx
import React, { useState } from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { IConversation } from '../../../types/chatTypes'; // Import the IConversation type

interface ChatInterfaceProps {
    currentUserId: string;
}

export default function ChatInterface({ currentUserId }: ChatInterfaceProps) {
    const [selectedConversation, setSelectedConversation] = useState<IConversation | null>(null); // Use IConversation type
    const [isMinimized, setIsMinimized] = useState(true);

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleSelectConversation = async (userId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/chat/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ participants: [currentUserId, userId] }),
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();

            if (data && data.success) {
                setSelectedConversation(data.data); // Set the full conversation object
            } else {
                throw new Error("No conversation data returned");
            }
        } catch (error) {
            console.error("Error creating or fetching conversation:", error);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: isMinimized ? '300px' : '600px',
                height: isMinimized ? '50px' : '500px',
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                overflow: 'hidden',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                    padding: '0.5rem',
                }}
            >
                <Typography variant="h6" sx={{ color: '#fff' }}>Chat</Typography>
                <IconButton onClick={toggleMinimize} color="inherit">
                    {isMinimized ? <OpenInFullIcon /> : <MinimizeIcon />}
                </IconButton>
            </Box>

            {!isMinimized && (
                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Grid container>
                        <Grid item xs={4} sx={{ borderRight: '1px solid #ccc' }}>
                            <ConversationList onSelectConversation={handleSelectConversation} />
                        </Grid>
                        <Grid item xs={8}>
                            {selectedConversation ? (
                                <MessageList 
                                    conversationId={selectedConversation._id} 
                                    currentUserId={currentUserId} 
                                />
                            ) : (
                                <Typography variant="h6" sx={{ padding: 2, color: '#555' }}>
                                    Select a conversation to view messages
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
}