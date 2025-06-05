import { CONFIG } from './config.js';

export const getElements = () => {
    return CONFIG.ELEMENT_IDS.map(id => document.getElementById(id));
};

export const formatDate = (date) => {
    return date.toLocaleDateString().split(/\D+/).reverse().join('-');
};

export const createElement = (parent, tagName) => {
    const element = document.createElement(tagName);
    parent.appendChild(element);
    return element;
};

export const getCheckboxes = (container) => {
    return [...container.querySelectorAll('input[type="checkbox"]')];
};