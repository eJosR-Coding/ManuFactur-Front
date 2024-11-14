// src/types/chatTypes.ts
export interface IMessage {
    filename: string;
    _id: string;
    conversation: string;
    sender: {
        _id: string;
        username: string;
    };
    content?: string;
    fileUrl?: string;
    fileMetadata?: {
        filename: string;
        contentType: string;
    };
    createdAt: Date;
}

export interface IConversation {
    _id: string;
    participants: string[];
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}
