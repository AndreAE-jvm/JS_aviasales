import { createElement } from './utils.js';

export const createSeatsTable = (container) => {
    container.innerHTML = '';
    
    // Создаем 28 мест с увеличенными иконками
    for(let i = 1; i <= 28; i++) {
        const seatItem = document.createElement('div');
        seatItem.className = 'seat-item';
        seatItem.innerHTML = `
            <div class="seat-checkbox">
                <input type="checkbox" value="${i}" id="seat-${i}">
                <label for="seat-${i}">${i}</label>
            </div>
        `;
        container.appendChild(seatItem);
    }
};


export const createSeatCheckbox = (container, seatNumber) => {
    container.insertAdjacentHTML(
        'beforeEnd',
        `<div class="seat-checkbox form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="${seatNumber}" id="seat-${seatNumber}">
        <label class="form-check-label" for="seat-${seatNumber}">${seatNumber}</label>
        </div>`
    );
};

export const displayTickets = (container, booking) => {
    container.innerHTML = '';
    
    if (booking && booking.checks && booking.checks.length) {
        booking.checks.forEach(seat => {
            container.insertAdjacentHTML(
                'beforeEnd',
                `<tr><td>${booking.route}</td><td>${booking.data}</td><td>${seat}</td></tr>`
            );
        });
        container.closest('.table-container').classList.remove('hide');
    } else {
        container.closest('.table-container').classList.add('hide');
    }
};

