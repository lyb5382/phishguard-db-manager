import fetch from 'node-fetch';
import fs from 'fs';

// 외부 정보원 주소
const PHISHTANK_URL = 'http://data.phishtank.com/data/online-valid.json';

async function fetchAndUpdateBlacklist() {
    console.log("[Phase 1] Intelligence gathering initiated from PhishTank...");
    try {
        const response = await fetch(PHISHTANK_URL, {
            headers: { 'User-Agent': 'PhishGuard-Updater-Bot/1.0 (Node.js)' }
        });

        if (!response.ok) {
            throw new Error(`Network response error: ${response.statusText}`);
        }

        const phishtankData = await response.json();
        const newBlacklist = phishtankData.map(item => item.url);

        const outputData = {
            version: new Date().getTime(), // 현재 시간을 버전으로 사용
            update_date: new Date().toISOString().split('T')[0],
            source: "PhishTank",
            blacklist: newBlacklist
        };

        // blacklist.json 파일에 보기 좋게 포맷하여 저장
        fs.writeFileSync('blacklist.json', JSON.stringify(outputData, null, 2), 'utf-8');

        console.log(`[Success] blacklist.json has been created/updated locally with ${newBlacklist.length} URLs.`);
        console.log("Proceed to Phase 2: Deploy to Central DB.");

    } catch (error) {
        console.error(`[Fatal Error] Intelligence gathering failed: ${error}`);
    }
}

fetchAndUpdateBlacklist();