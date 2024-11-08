// src/types/chatTypes.ts

// Tipo para un mensaje
export interface IMessage {
    _id: string; // ID del mensaje
    conversation: string; // ID de la conversación a la que pertenece el mensaje
    sender: string; // ID del usuario que envía el mensaje
    content: string; // Contenido del mensaje
    createdAt: string; // Fecha de creación en formato ISO
    updatedAt?: string; // Fecha de última actualización, opcional
}

// Tipo para una conversación
export interface IConversation {
    _id: string; // ID de la conversación
    participants: string[]; // Array de IDs de los usuarios participantes
    messages?: IMessage[]; // Lista de mensajes, opcional
    createdAt: string; // Fecha de creación en formato ISO
    updatedAt?: string; // Fecha de última actualización, opcional
}
