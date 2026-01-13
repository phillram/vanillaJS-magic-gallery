# Magic the Gathering Card Browser

A vanilla JavaScript web application for browsing and discovering Magic the Gathering cards.

## Features

- 🎴 **Random Card Display** - Get a random Magic card with one click
- 🔍 **Card Search** - Search for cards by name
- 📚 **Set Filtering** - Filter and browse cards from specific Magic sets
- 🖼️ **High Quality Images** - Display official card artwork
- 📋 **Detailed Card Information** - View:
  - Card name and type
  - Mana cost
  - Power/Toughness (for creatures)
  - Loyalty (for planeswalkers)
  - Oracle text (card abilities)
  - Flavor text
  - Artist attribution

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No frameworks required
- **Scryfall API** - Magic card data source

## How to Use

### 1. Get a Random Card
Click the **"Get Random Card"** button to display a random Magic card from the entire database.

### 2. Search by Card Name
1. Enter a card name in the search box
2. Click the **"Search"** button (or press Enter)
3. The first matching card will be displayed

### 3. Filter by Set
1. Select a Magic set from the **"Filter by Set"** dropdown
2. A random card from that set will automatically be displayed
3. You can continue to click the random button to get different cards from the same set

## Project Structure

```
vanillajs-gallery-sentry/
├── index.html          # HTML structure
├── styles.css          # Styling with dark theme
├── script.js           # Core JavaScript logic
└── README.md           # This file
```

## API Information

This application uses the **Scryfall API** (`https://api.scryfall.com`), a free and comprehensive Magic the Gathering database API.

### Key API Endpoints Used:
- `/sets` - Get all Magic sets
- `/cards/random` - Get a random card
- `/cards/search` - Search for cards by name or other criteria

For more information, visit: [Scryfall API Documentation](https://scryfall.com/docs/api)

## Features Explained

### Random Card Button
Fetches a random card from the entire Scryfall database and displays its full information including artwork, abilities, and stats.

### Set Filter Dropdown
- Loads all official Magic sets (excluding digital-only sets)
- Sorted by release date (newest first)
- Selecting a set fetches a random card from that set
- Useful for exploring specific editions

### Search Functionality
- Search by partial or full card name
- Returns the first matching card
- Case-insensitive searching
- Shows "No results" message if card not found

### Card Display
Shows comprehensive card information:
- **Name & Type** - Card title and type line (e.g., "Legendary Creature - Dragon")
- **Mana Cost** - Colorless and colored mana requirements
- **Stats** - Power/Toughness or Loyalty values
- **Abilities** - Oracle text (official rules text)
- **Flavor** - Thematic text describing the card's story
- **Artist** - Illustrator credit

## Styling

The application features:
- **Dark Theme** - Easy on the eyes with purple and orange accents
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Fade-in effects and hover states
- **Professional Layout** - Card details displayed alongside artwork

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- Fetch API
- HTML5 Web APIs

## Running the Application

### Option 1: Direct File Access
1. Open `index.html` in your web browser
2. The application will load and be ready to use

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Error Handling

The application includes robust error handling for:
- Failed API requests
- Network errors
- Missing card images
- Invalid search queries

Error messages are displayed in a prominent error box for user guidance.

## Future Enhancement Ideas

- Save favorite cards to local storage
- Advanced filtering (by color, mana cost, rarity)
- Card comparison functionality
- Price information integration
- Deck building assistant
- Wishlist functionality

## License

This application uses data from Scryfall, which is free and open-source. Please refer to [Scryfall's terms](https://scryfall.com/docs/api#terms) for usage guidelines.

---

Enjoy exploring Magic the Gathering cards!
# vanillaJS-magic-gallery
