// src/components/ConversationList.tsx
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface User {
    _id: string;
    username: string;
}

interface ConversationListProps {
    onSelectConversation: (userId: string) => void;
}

export default function ConversationList({ onSelectConversation }: ConversationListProps) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Fetch de todos los usuarios desde el nuevo endpoint
        fetch('http://localhost:5000/api/users/all')
            .then((res) => res.json())
            .then((data) => setUsers(data.data));
    }, []);

    return (
        <List sx={{ color: '#ffffff' }}> {/* Ajuste de color de fondo y texto */}
            {users.map((user) => (
                <ListItem
                    component="button"
                    key={user._id}
                    onClick={() => onSelectConversation(user._id)}
                    sx={{
                        color: '#ffffff', // Color de texto
                        backgroundColor: '#1f2937', // Fondo del item
                        '&:hover': {
                            backgroundColor: '#3f51b5', // Color de fondo al hacer hover (morado azulado)
                        },
                    }}
                >
                    <ListItemText
                        primary={
                            <Typography variant="body1" sx={{ color: '#ffffff' }}>
                                {user.username}
                            </Typography>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}
