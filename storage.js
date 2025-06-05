import { CONFIG } from './config.js';

export const getBookings = () => {
    const data = localStorage.getItem(CONFIG.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveBookings = (bookings) => {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(bookings));
};

export const clearBookings = () => {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
};