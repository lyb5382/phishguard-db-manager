// node-fetch 라이브러리를 불러옵니다. (npm install node-fetch 필요)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

const PHISHTANK_URL = 'http://data.phishtank.com/data/online-valid.json';

async function fetchAndUpdateBlacklist() {
    console.log("[Phase 1] Fetching latest intelligence from PhishTank...");
    try {
        const response = await fetch(PHISHTANK_URL, {
            headers: { 'User-Agent': 'PhishGuard-Updater-Bot/1.0 (Node.js)' }
        });
        if (!response.ok) throw new Error(`Network error: ${response.statusText}`);

        const phishtankData = await response.json();
        const newBlacklist = phishtankData.map(item => item.url);
        
        const outputData = {
            version: parseFloat((Math.random() * (5.0 - 1.0) + 1.0).toFixed(1)),
            update_date: new Date().toISOString().split('T')[0],
            blacklist: newBlacklist
        };

        fs.writeFileSync('blacklist.json', JSON.stringify(outputData, null, 2), 'utf-8');
        console.log(`[Success] blacklist.json has been created/updated locally with ${newBlacklist.length} URLs.`);
        console.log("Proceed to Phase 2: Deploy to Central DB.");

    } catch (error) {
        console.error(`[Fatal Error] Intelligence gathering failed: ${error}`);
    }
}

fetchAndUpdateBlacklist();