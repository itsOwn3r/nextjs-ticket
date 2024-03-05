export type MessageType = {
    id: string | undefined;
    text: string;
    name: string | undefined;
    email: string | undefined;
    avatar: string | undefined;
    type: string | null;
    date: number
}

export type TicketType = {
    title: string;
    ticket: {
        user: string;
        name: string;
        avatar: string | undefined;
        images: string[];
        text: string;
        date: number;
    }[];
    opener: string;
    images?: string[];
    openerEmail: string;
    department: string;
    priority: string;
    tags: string[];
}