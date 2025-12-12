// Countries and States Configuration
// Scalable structure for future expansion

export const countries = [
  {
    name: "Pakistan",
    code: "PK"
  }
  // Add more countries here in the future
];

export const statesByCountry = {
  PK: [
    { name: "Islamabad", code: "IS" },
    { name: "Gilgit-Baltistan", code: "GB" },
    { name: "Khyber Pakhtunkhwa", code: "KP" },
    { name: "Azad Kashmir", code: "JK" },
    { name: "Federally Administered Tribal Areas", code: "TA" },
    { name: "Balochistan", code: "BA" },
    { name: "Sindh", code: "SD" },
    { name: "Punjab", code: "PB" }
  ]
  // Add more countries' states here in the future
};

// State name mapping for location picker matching
// Maps common variations of state names to our state codes
export const stateNameMapping = {
  PK: {
    "islamabad": "IS",
    "islamabad capital territory": "IS",
    "ict": "IS",
    "gilgit-baltistan": "GB",
    "gilgit baltistan": "GB",
    "gb": "GB",
    "khyber pakhtunkhwa": "KP",
    "khyber-pakhtunkhwa": "KP",
    "kp": "KP",
    "nwfp": "KP",
    "north west frontier province": "KP",
    "azad kashmir": "JK",
    "azad-jammu-kashmir": "JK",
    "ajk": "JK",
    "jk": "JK",
    "federally administered tribal areas": "TA",
    "fata": "TA",
    "ta": "TA",
    "balochistan": "BA",
    "ba": "BA",
    "sindh": "SD",
    "sd": "SD",
    "punjab": "PB",
    "pb": "PB"
  }
};

// Get states for a country
export const getStatesByCountry = (countryCode) => {
  return statesByCountry[countryCode] || [];
};

// Match state name from location picker to our state code
export const matchStateName = (countryCode, stateName) => {
  if (!stateName || !countryCode) return null;
  
  const mapping = stateNameMapping[countryCode];
  if (!mapping) return null;
  
  const normalizedName = stateName.toLowerCase().trim();
  return mapping[normalizedName] || null;
};

