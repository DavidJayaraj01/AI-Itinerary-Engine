const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Cache for cities data
let citiesCache = null;

const cityService = {
  // Load cities from file
  loadCities: async () => {
    if (citiesCache) return citiesCache;

    const cities = [];
    const filePath = path.join(__dirname, '../../data/cities.txt');

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      const parts = line.split('\t');
      if (parts.length >= 5) {
        cities.push({
          id: parts[0],
          name: parts[1],
          asciiName: parts[2],
          alternateNames: parts[3],
          latitude: parseFloat(parts[4]),
          longitude: parseFloat(parts[5]),
          country: parts[8],
          population: parseInt(parts[14]) || 0
        });
      }
    }

    citiesCache = cities;
    console.log(`✅ Loaded ${cities.length} cities`);
    return cities;
  },

  // Search cities by name
  searchCities: async (query, limit = 10) => {
    const cities = await cityService.loadCities();
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) return [];

    // Filter cities that match the search term
    const results = cities.filter(city => {
      const nameMatch = city.name.toLowerCase().includes(searchTerm);
      const asciiMatch = city.asciiName.toLowerCase().includes(searchTerm);
      const altNames = city.alternateNames.toLowerCase();
      
      return nameMatch || asciiMatch || altNames.includes(searchTerm);
    });

    // Sort by population (descending) and take top results
    return results
      .sort((a, b) => b.population - a.population)
      .slice(0, limit)
      .map(city => ({
        id: city.id,
        name: city.name,
        displayName: `${city.name}, ${city.country}`,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
        population: city.population
      }));
  }
};

module.exports = cityService;
