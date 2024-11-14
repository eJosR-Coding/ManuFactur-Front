// src/types/chatTypes.ts
export interface IMessage {
    _id: string;
    conversation: string;
    sender: {
        _id: string;
        username: string;
    };
    content?: string;
    fileUrl?: string;
    createdAt: Date;
}

export interface IConversation {
    _id: string;
    participants: string[];
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}
