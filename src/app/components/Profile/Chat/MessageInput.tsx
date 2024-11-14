import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
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
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (type === 'image' && selectedFile.type.startsWith('image/')) {
                setFilePreviewUrl(URL.createObjectURL(selectedFile));
            } else {
                setFilePreviewUrl(selectedFile.name);
            }
        }
    };

    const handleStartRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                setIsRecording(true);

                const audioChunks: Blob[] = [];
                recorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
                    const now = new Date();
                    const date = now.toISOString().split('T')[0]; // formato YYYY-MM-DD
                    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // formato HH-MM-SS
                    const filename = `audio_peluchita_${date}_${time}.mp3`;

                    const audioFile = new File([audioBlob], filename, { type: 'audio/mpeg' });
                    setFile(audioFile);
                    setFilePreviewUrl(filename); // Muestra el nombre del archivo grabado
                };

                recorder.start();
            })
            .catch(error => console.error("Error accessing microphone:", error));
    };

    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            setMediaRecorder(null);
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
        setIsRecording(false);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, backgroundColor: '#333b48', flexDirection: 'column' }}>
            {filePreviewUrl && (
                <Box sx={{ marginBottom: 1, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#ffffff' }}>{filePreviewUrl}</Typography>
                </Box>
            )}
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <IconButton component="label" sx={{ color: '#4b9cd3' }}>
                    <ImageIcon />
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
                </IconButton>
                <IconButton component="label" sx={{ color: '#4b9cd3' }}>
                    <AttachFileIcon />
                    <input type="file" hidden accept=".pdf,.doc,.docx,.txt,.zip,.mp3,.wav" onChange={(e) => handleFileChange(e, 'file')} />
                </IconButton>
                <IconButton onClick={isRecording ? handleStopRecording : handleStartRecording} sx={{ color: '#4b9cd3' }}>
                    {isRecording ? <StopIcon /> : <MicIcon />}
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
