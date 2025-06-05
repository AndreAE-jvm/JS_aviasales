// Главный скрипт

// Импорт всех необходимых модулей
import { CONFIG } from './config.js';
import { 
    getElements, 
    formatDate, 
    createElement, 
    getCheckboxes 
} from './utils.js';
import { 
    createSeatsTable, 
    createSeatCheckbox, 
    displayTickets 
} from './ui-components.js';
import { 
    getBookings, 
    saveBookings, 
    clearBookings 
} from './storage.js';

// Получение DOM-элементов
const [sel, dat, btn, tab, btk, prs, cnt, hide, frm, del] = getElements();

// Основные функции приложения
const initApp = () => {
    // Настройка формы
    frm.addEventListener('submit', (e) => e.preventDefault());
    
    // Инициализация UI
    dat.value = formatDate(new Date());
    initializeSelect();
    createSeatsTable(tab);
    
    // Настройка обработчиков событий
    btn.addEventListener('click', handleSearch);
    btk.addEventListener('click', handleBooking);
    del.addEventListener('click', handleClearStorage);
    
    // Проверка существующих бронирований
    checkExistingBookings();
};

const initializeSelect = () => {
    CONFIG.ROUTES.forEach(([price, route]) => {
        sel.append(new Option(route, price));
    });
};

const checkExistingBookings = () => {
    const bookings = getBookings();
    if (bookings.length > 0) {
        const firstBooking = bookings[0];
        dat.value = firstBooking.data;
        sel.value = CONFIG.ROUTES.find(item => item[1] === firstBooking.route)[0];
        btn.dispatchEvent(new Event('click'));
    }
};

const handleSearch = (e) => {
    if (!frm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        frm.classList.add('was-validated');
        return;
    }
    
    const bookings = getBookings();
    const selectedRoute = sel.options[sel.selectedIndex].text;
    const selectedDate = dat.value;
    
    const booking = bookings.find(b => b.data === selectedDate && b.route === selectedRoute);
    
    getCheckboxes(tab).forEach(checkbox => checkbox.checked = false);
    prs.innerText = CONFIG.DATE_FORMAT.format(0); 
    
    if (booking) {
        displayTickets(cnt, booking);
        updateCheckboxes(booking);
        prs.innerText = CONFIG.DATE_FORMAT.format(booking.price);
    } else {
        hide.classList.add('hide');
    }
};

const updateCheckboxes = (booking) => {
    if (booking && booking.checks) {
        booking.checks.forEach(seat => {
            const checkbox = document.querySelector(`input[value="${seat}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
};

const handleBooking = (e) => {
    if (!frm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        frm.classList.add('was-validated');
        return;
    }
    
    const bookings = getBookings();
    const selectedOption = sel.options[sel.selectedIndex];
    const checkboxes = getCheckboxes(tab);
    
    const selectedSeats = checkboxes
        .filter(checkbox => checkbox.checked)
        .map(checkbox => Number(checkbox.value));
    
    if (selectedSeats.length === 0) {
        alert('Пожалуйста, выберите хотя бы одно место!');
        return;
    }
    
    const existingBookingIndex = bookings.findIndex(
        b => b.data === dat.value && b.route === selectedOption.text
    );
    
    const newBooking = {
        data: dat.value,
        checks: selectedSeats,
        route: selectedOption.text,
        price: selectedOption.value * selectedSeats.length
    };
    
    if (existingBookingIndex !== -1) {
        bookings[existingBookingIndex] = newBooking;
    } else {
        bookings.push(newBooking);
    }
    
    saveBookings(bookings);
    prs.innerText = CONFIG.DATE_FORMAT.format(newBooking.price);
    displayTickets(cnt, newBooking);
    alert('Успешно забронировано!');
};

const handleClearStorage = () => {
    clearBookings();
    alert('Бронирование успешно очищено!');
    location.reload();
};

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);