import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import { IMessage } from '../../../types/chatTypes';

interface MessageInputProps {
    conversationId: string;
    currentUserId: string;
    onNewMessage: (newMessage: IMessage) => void;
}

export default function MessageInput({ conversationId, currentUserId, onNewMessage }: MessageInputProps) {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [isImage, setIsImage] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (type === 'image' && selectedFile.type.startsWith('image/')) {
                setFilePreviewUrl(URL.createObjectURL(selectedFile));
                setIsImage(true);
            } else {
                setFilePreviewUrl(null);
                setIsImage(false);
            }
        }
    };

    const handleSendMessage = async () => {
        const formData = new FormData();
        formData.append('conversationId', conversationId);
        formData.append('sender', currentUserId);
        formData.append('content', message);
        if (file) formData.append('file', file);

        const response = await fetch('http://localhost:5000/api/messages/send', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result && result.data) {
            onNewMessage(result.data);
        }

        setMessage('');
        setFile(null);
        setFilePreviewUrl(null);
        setIsImage(false);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, backgroundColor: '#333b48', flexDirection: 'column' }}>
            {filePreviewUrl && isImage && (
                <Box sx={{ marginBottom: 1 }}>
                    <img src={filePreviewUrl} alt="Vista previa" style={{ maxHeight: '100px', borderRadius: '8px' }} />
                </Box>
            )}
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <IconButton component="label" sx={{ color: '#4b9cd3' }}>
                    <ImageIcon />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'image')}
                    />
                </IconButton>
                <IconButton component="label" sx={{ color: '#4b9cd3' }}>
                    <AttachFileIcon />
                    <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx,.txt,.zip,.mp3,.wav"
                        onChange={(e) => handleFileChange(e, 'file')}
                    />
                </IconButton>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    sx={{
                        input: { color: '#ffffff' },
                        backgroundColor: '#1f2937',
                        borderRadius: '4px',
                    }}
                />
                <IconButton color="primary" onClick={handleSendMessage} sx={{ color: '#4b9cd3' }}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
