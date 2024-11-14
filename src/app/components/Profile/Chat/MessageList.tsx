import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import MessageInput from './MessageInput';
import { IMessage } from '../../../types/chatTypes';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import FileAttachment from './FileAttachment';

interface MessageListProps {
    conversationId: string;
    currentUserId: string;
}

export default function MessageList({ conversationId, currentUserId }: MessageListProps) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/messages/conversation/${conversationId}`)
            .then((res) => res.json())
            .then((data) => setMessages(data.data));
    }, [conversationId]);

    const handleNewMessage = (newMessage: IMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const handleImageClick = (src: string) => {
        setImageSrc(src);
        setLightboxOpen(true);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 2, backgroundColor: '#1f2937', color: '#ffffff' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '60vh', marginBottom: 2 }}>
                <List>
                    {messages.map((message) => (
                        <ListItem
                            key={message._id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: message.sender._id === currentUserId ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <Box
                                sx={{
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    maxWidth: '60%',
                                    backgroundColor: message.sender._id === currentUserId ? '#4b9cd3' : '#333b48',
                                    color: '#ffffff',
                                    fontSize: '0.875rem',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    ...(message.sender._id !== currentUserId ? { border: '1px solid #555' } : {}),
                                }}
                            >
                                {message.sender._id !== currentUserId && (
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', color: '#9aa0a6' }}>
                                        {message.sender.username}
                                    </Typography>
                                )}
                                {message.content && <Typography variant="body2">{message.content}</Typography>}

                                {message.fileUrl && message.fileMetadata && (
                                    <FileAttachment
                                        fileUrl={`http://localhost:5000${message.fileUrl}`}
                                        filename={message.fileMetadata.filename}
                                        contentType={message.fileMetadata.contentType}
                                        onImageClick={handleImageClick} // Pasamos handleImageClick aquí
                                    />
                                )}
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {imageSrc && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={[{ src: imageSrc }]}
                />
            )}

            <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#1f2937', padding: '10px', zIndex: 10 }}>
                <MessageInput
                    conversationId={conversationId}
                    currentUserId={currentUserId}
                    onNewMessage={handleNewMessage}
                />
            </Box>
        </Box>
    );
}
