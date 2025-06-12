import dotenv from 'dotenv';
import cron from 'node-cron';
import existingDNStoUpdate from './dns.json';

import sendTelegramMessage from './functions/telegram/sendTelegramMessage';
import getMyIpAddress from './functions/getMyIpAdress';
import getAllDNSfromZone from './functions/cloudflare/getAllDNSfromZone';
import changeDNSRecord from './functions/cloudflare/changeDNSRecord';

dotenv.config();
sendTelegramMessage(`DDNS Zostal uruchomiony o ${new Date().toLocaleTimeString()}`);
console.log(`DDNS Zostal uruchomiony o ${new Date().toLocaleTimeString()}`);

const main = async () => {
    const ipAdress = await getMyIpAddress();
    const dns = await getAllDNSfromZone() || [];
    console.log(`${new Date().toLocaleTimeString()} - Aktualny adres IP: ${ipAdress}`);
    for (const dnsRecord of dns) {
        for (const existingDNS of existingDNStoUpdate) {

            if( dnsRecord.name != existingDNS ) continue;
            if( dnsRecord.content === ipAdress ) continue;


            await changeDNSRecord(dnsRecord.id, ipAdress, dnsRecord.name, dnsRecord.type, dnsRecord.ttl, dnsRecord.proxied, dnsRecord.content);

        }
    }
}

cron.schedule('* * * * *', async () => {
    main();
})

main();