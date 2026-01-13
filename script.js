// API Configuration
const API_BASE = 'https://api.scryfall.com';

// DOM Elements
const setFilterSelect = document.getElementById('setFilter');
const randomCardBtn = document.getElementById('randomCardBtn');
const searchBtn = document.getElementById('searchBtn');
const cardSearchInput = document.getElementById('cardSearch');
const cardContainer = document.getElementById('cardContainer');
const loadingSpinner = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const noResultsDiv = document.getElementById('noResults');

// State
let sets = [];
let currentCard = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadSets();
    setupEventListeners();
});

/**
 * Set up event listeners for user interactions
 */
function setupEventListeners() {
    randomCardBtn.addEventListener('click', fetchRandomCard);
    searchBtn.addEventListener('click', searchCard);
    cardSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCard();
        }
    });
    setFilterSelect.addEventListener('change', handleSetFilter);
}

/**
 * Load all Magic sets and populate the filter dropdown
 */
async function loadSets() {
    try {
        showLoading();
        const response = await fetch(`${API_BASE}/sets`);
        
        if (!response.ok) {
            throw new Error('Failed to load sets');
        }

        const data = await response.json();
        sets = data.data
            .filter(set => set.digital === false) // Only physical sets
            .sort((a, b) => new Date(b.released_at) - new Date(a.released_at));

        populateSetsDropdown();
        hideLoading();
    } catch (error) {
        showError('Failed to load Magic sets: ' + error.message);
    }
}

/**
 * Populate the set filter dropdown with available sets
 */
function populateSetsDropdown() {
    const fragment = document.createDocumentFragment();
    
    sets.forEach(set => {
        const option = document.createElement('option');
        option.value = set.code;
        option.textContent = `${set.name} (${set.released_at.split('-')[0]})`;
        fragment.appendChild(option);
    });

    setFilterSelect.appendChild(fragment);
}

/**
 * Handle set filter selection
 */
async function handleSetFilter() {
    const setCode = setFilterSelect.value;
    
    if (setCode) {
        try {
            showLoading();
            const response = await fetch(`${API_BASE}/cards/random?q=set:${setCode}`);
            
            if (!response.ok) {
                throw new Error('No cards found in this set');
            }

            const card = await response.json();
            displayCard(card);
        } catch (error) {
            showError('Failed to load card from set: ' + error.message);
        }
    } else {
        hideCard();
    }
}

/**
 * Fetch and display a random Magic card
 */
async function fetchRandomCard() {
    try {
        showLoading();
        const response = await fetch(`${API_BASE}/cards/random`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch random card');
        }

        const card = await response.json();
        displayCard(card);
    } catch (error) {
        showError('Failed to fetch random card: ' + error.message);
    }
}

/**
 * Search for a card by name
 */
async function searchCard() {
    const searchTerm = cardSearchInput.value.trim();
    
    if (!searchTerm) {
        showError('Please enter a card name');
        return;
    }

    try {
        showLoading();
        const encodedSearch = encodeURIComponent(searchTerm);
        const response = await fetch(`${API_BASE}/cards/search?q=${encodedSearch}&unique=cards`);
        
        if (!response.ok) {
            throw new Error('Failed to search for cards');
        }

        const data = await response.json();
        
        if (data.total_cards === 0) {
            showNoResults();
            return;
        }

        // Display the first result
        const card = data.data[0];
        displayCard(card);
    } catch (error) {
        showError('Failed to search for card: ' + error.message);
    }
}

/**
 * Display a Magic card in the UI
 */
function displayCard(card) {
    currentCard = card;

    // Set card name
    document.getElementById('cardName').textContent = card.name;

    // Set card type
    document.getElementById('cardType').textContent = card.type_line || 'Unknown Type';

    // Set card set
    const setInfo = sets.find(s => s.code === card.set);
    const setName = setInfo ? setInfo.name : card.set.toUpperCase();
    document.getElementById('cardSet').textContent = `Set: ${setName}`;

    // Set card image
    if (card.image_uris) {
        document.getElementById('cardImage').src = card.image_uris.normal;
        document.getElementById('cardImage').alt = card.name;
    } else if (card.card_faces) {
        // For double-faced cards, use the first face
        document.getElementById('cardImage').src = card.card_faces[0].image_uris.normal;
        document.getElementById('cardImage').alt = card.name;
    }

    // Set card stats (power/toughness)
    const statsDiv = document.getElementById('cardStats');
    statsDiv.innerHTML = '';
    
    if (card.power && card.toughness) {
        const powerToughnessDiv = document.createElement('div');
        powerToughnessDiv.className = 'stat';
        powerToughnessDiv.innerHTML = `
            <span class="stat-label">Power/Toughness</span>
            <span class="stat-value">${card.power} / ${card.toughness}</span>
        `;
        statsDiv.appendChild(powerToughnessDiv);
    }

    if (card.loyalty) {
        const loyaltyDiv = document.createElement('div');
        loyaltyDiv.className = 'stat';
        loyaltyDiv.innerHTML = `
            <span class="stat-label">Loyalty</span>
            <span class="stat-value">${card.loyalty}</span>
        `;
        statsDiv.appendChild(loyaltyDiv);
    }

    if (card.mana_cost) {
        const costDiv = document.createElement('div');
        costDiv.className = 'stat';
        costDiv.innerHTML = `
            <span class="stat-label">Mana Cost</span>
            <span class="stat-value">${card.mana_cost}</span>
        `;
        statsDiv.appendChild(costDiv);
    }

    // Set card text
    const textContent = card.oracle_text || 'No text';
    document.getElementById('cardText').textContent = textContent;

    // Set flavor text
    const flavorContent = card.flavor_text || 'No flavor text available';
    document.getElementById('cardFlavor').textContent = `"${flavorContent}"`;

    // Set artist
    const artist = card.artist || 'Unknown Artist';
    document.getElementById('cardArtist').textContent = `Illustrated by ${artist}`;

    hideLoading();
    showCard();
}

/**
 * Show the card container
 */
function showCard() {
    cardContainer.classList.remove('hidden');
    noResultsDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

/**
 * Hide the card container
 */
function hideCard() {
    cardContainer.classList.add('hidden');
}

/**
 * Show the loading spinner
 */
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    errorDiv.classList.add('hidden');
    noResultsDiv.classList.add('hidden');
}

/**
 * Hide the loading spinner
 */
function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

/**
 * Show an error message
 */
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    noResultsDiv.classList.add('hidden');
    loadingSpinner.classList.add('hidden');
}

/**
 * Show the no results message
 */
function showNoResults() {
    noResultsDiv.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingSpinner.classList.add('hidden');
}
