import {string, object, date, number, array} from 'yup'

export interface SearchEventsResponse {
    eventId?: string;
    name?: string;
    location?: string;
    eventType?: string;
    description?: string;
    eventStart: Date | null;
    eventEnd: Date | null;
    fees: number;
    userEmail?: string;
    status?: string;
    images: string[];
}

export const EventsInitialValues: SearchEventsResponse = {
    name: '',
    location: '',
    eventType: '',
    description: '',
    eventStart: null,
    eventEnd: null,
    fees: 0,
    images: [],
}

export const EventsValidationSchema = object({
    name: string().required("Please complete this field"),
    location: string().required("Please complete this field"),
    eventStart: date().nullable('Please complete this field').required("Please complete this field"),
    eventEnd: date().nullable('Please complete this field').required("Please complete this field"),
    fees: number().nullable('Please complete this field')
    .min(0, 'please enter a valid fees number')
    .required("Please complete this field"),
    images: array().required('Please complete this field').min(1, 'Please complete this field')
})