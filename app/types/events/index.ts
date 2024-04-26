export interface SearchEventsResponse {
    eventId?: string;
    name?: string;
    location?: string;
    eventType?: string;
    description?: string;
    eventStart: Date;
    eventEnd: Date;
    fees: number;
    userEmail?: string;
    status: string;
    images: string[];
}