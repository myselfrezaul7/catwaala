const fs = require('fs');

async function fetchOsmVets() {
    const query = `
        [out:json][timeout:25];
        area["name:en"="Bangladesh"]->.searchArea;
        (
          node["amenity"="veterinary"](area.searchArea);
          way["amenity"="veterinary"](area.searchArea);
          relation["amenity"="veterinary"](area.searchArea);
        );
        out body;
        >;
        out skel qt;
    `;

    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const clinics = [];

        for (const element of data.elements) {
            if (element.tags && element.tags.name) {
                clinics.push({
                    name: element.tags.name,
                    phone: element.tags.phone || element.tags['contact:phone'] || '',
                    address: [
                        element.tags['addr:street'],
                        element.tags['addr:city']
                    ].filter(Boolean).join(', '),
                    city: element.tags['addr:city'] || '',
                    lat: element.lat || (element.center && element.center.lat),
                    lon: element.lon || (element.center && element.center.lon)
                });
            }
        }

        fs.writeFileSync('osm_vets.json', JSON.stringify(clinics, null, 2));
        console.log(`Saved ${clinics.length} clinics to osm_vets.json`);
    } catch (e) {
        console.error('Failed to fetch:', e);
    }
}

fetchOsmVets();
