import {string, object, date, number, array} from 'yup'
import { LATITUDE, LONGITUDE } from '..';

export interface SearchEventsResponse {
    eventId?: string;
    name?: string;
    eventType?: string;
    description?: string;
    eventStart: Date | null;
    eventEnd: Date | null;
    fees: number;
    userEmail?: string;
    status?: string;
    images: string[];
    placeID?: string
    longitude?: number;
    latitude?: number;
    city: string;
}

export const EventsInitialValues: SearchEventsResponse = {
    name: '',
    eventType: '',
    description: '',
    eventStart: null,
    eventEnd: null,
    fees: 0,
    images: [],
    placeID: '',
    eventId: '',
    latitude: undefined,
    longitude: undefined,
    city: "",
}

export const EventsValidationSchema = object({
    name: string().required("Please complete this field"),
    eventType: string().required("Please complete this field"),
    placeID: string().required("Please complete this field"),
    eventStart: date().nullable('Please complete this field').required("Please complete this field"),
    eventEnd: date().nullable('Please complete this field').required("Please complete this field"),
    fees: number().nullable('Please complete this field')
    .min(0, 'please enter a valid fees number')
    .required("Please complete this field"),
    images: array().required('Please complete this field').min(1, 'Please complete this field')
})