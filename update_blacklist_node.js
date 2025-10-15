import fetch from 'node-fetch';
import { createClient } from 'redis';
import 'dotenv/config';

// 첩보 정보 출처 URL (수정됨)
const INTELLIGENCE_URL = 'http://data.phishtank.com/data/online-valid.json';
const REDIS_BLACKLIST_KEY = 'phishguard:blacklist:urls';

async function fetchAndUpdateBlacklist() {
    console.log('Fetching latest intelligence...');
    
    // Redis 클라이언트 설정
    const redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    try {
        await redisClient.connect();

        // 최신 피싱 URL 첩보 입수
        const response = await fetch(INTELLIGENCE_URL);
        if (!response.ok) {
            throw new Error(`Intelligence server returned an error: ${response.statusText}`);
        }
        const phishTankData = await response.json();

        // 기존 블랙리스트 삭제 (최신 정보로 갱신하기 위함)
        console.log('Clearing old blacklist...');
        await redisClient.del(REDIS_BLACKLIST_KEY);

        // 새로운 블랙리스트 구축
        const urlsToAdd = phishTankData.map(item => item.url);
        
        if (urlsToAdd.length > 0) {
            console.log(`Adding ${urlsToAdd.length} new threats to the blacklist...`);
            // SADD 명령어를 사용하여 한 번에 여러 멤버 추가
            await redisClient.sAdd(REDIS_BLACKLIST_KEY, urlsToAdd);
            console.log('Blacklist update successful.');
        } else {
            console.log('No new threats found.');
        }

    } catch (error) {
        console.error('Fatal Error:', error);
    } finally {
        await redisClient.quit();
        console.log('Operation complete. Connection closed.');
    }
}

fetchAndUpdateBlacklist();