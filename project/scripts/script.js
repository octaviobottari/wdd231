// script.js

// ====================== CONSTANTS ======================
const CASE_STUDIES_URL = 'scripts/case-studies.json';

// ====================== DOM ELEMENTS ======================
const logosContainer = document.querySelector('.company-logos-container');
const caseStudiesContainer = document.querySelector('.case-studies');
const hamburgerMenu = document.getElementById('hamburger-menu');
const nav = document.querySelector('.nav');
const form = document.querySelector('form');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');

// ====================== FUNCTIONS ======================

/**
 * Feetches case studies data from a JSON filea nd get them displayed.
 */
async function fetchAndDisplayCaseStudies() {
    try {
        const response = await fetch(CASE_STUDIES_URL);
        if (!response.ok) throw new Error('Failed to fetch case studies');
        const caseStudies = await response.json();

        // Use array method (map) to create HTML for each case study
        const caseStudiesHTML = caseStudies
            .map(
                (study) => `
                <div class="case-study">
                    <div class="case-study-img">
                        <img src="${study.image}" alt="${study.title} Image">
                    </div>
                    <h3>${study.title}</h3>
                    <p>${study.description}</p>
                    <a href="#" data-case-study="${study.title.toLowerCase().replace(/\s+/g, '-')}">Read Case Study
                        <span aria-label="(external site)">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" class="svg-inline--fa fa-up-right-from-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path>
                            </svg>
                        </span>
                    </a>
                </div>
            `
            )
            .join('');

      
        caseStudiesContainer.innerHTML = caseStudiesHTML;

        setupModalEventListeners();
    } catch (error) {
        console.error('Error loading case studies:', error);
    }
}

/**
 * Opens a modal dialog with details about the selected case study.
 * @param {string} caseStudyId - The ID of the case study to display.
 */
function openModal(caseStudyId) {
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <h2>Case Study: ${caseStudyId.replace(/-/g, ' ')}</h2>
        <p>Details about the case study will go here.</p>
    `;
    modal.style.display = 'block';
}


function closeModal() {
    modal.style.display = 'none';
}


function setupModalEventListeners() {
    document.querySelectorAll('.case-study a').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(link.dataset.caseStudy);
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}


function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    //localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('message', message);

    window.location.href = 'thank-you.html';
}


function setupHeaderScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}



function setupHamburgerMenu() {
    if (hamburgerMenu && nav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            nav.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.hamburger-menu') && !event.target.closest('.nav')) {
                hamburgerMenu.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
}


function setupAccordion() {
    document.querySelectorAll('.accordion-item-argentina .title-argentina').forEach((title) => {
        title.addEventListener('click', () => {
            const item = title.parentElement;
            item.classList.toggle('active');
        });
    });
}

function setupFormSubmission() {
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// ====================== INITIALIZATION ======================
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCaseStudies();
    setupHeaderScrollEffects();
    setupHamburgerMenu();
    setupAccordion();
    setupFormSubmission();
});