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
    city: string;
    placeID?: string;
    latitude?: number;
    longitude?: number;
    placeName?: string;
}

export interface BookedEventResponse {
    reservationId: string
    eventEnd: string
    eventStart: string
    eventImages: string[];
    placeName?: string;
    eventName: string
}

export interface CheckTicketModel {
    eventID: string
    reservationID: string
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
    placeName: '',
}

export const EventsValidationSchema = object({
    name: string().required("Please complete this field"),
    eventType: string().required("Please complete this field"),
    placeID: string().required("Please select private or public place"),
    eventStart: date().nullable('Please complete this field').required("Please complete this field"),
    eventEnd: date().nullable('Please complete this field').required("Please complete this field"),
    fees: number().nullable('Please complete this field')
    .min(0, 'please enter a valid fees number')
    .required("Please complete this field"),
    images: array().required('Please complete this field').min(1, 'Please complete this field')
})