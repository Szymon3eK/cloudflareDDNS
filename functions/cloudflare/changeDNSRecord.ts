import sendTelegramMessage from "../telegram/sendTelegramMessage";

const changeDNSRecord = async (recordID: string, ipAddress: string, name: string, type: string, ttl: string, proxied: string, oldIpAdress: string) => {
await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${recordID}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "X-Auth-Email": process.env.CLOUDFLARE_EMAIL || "",
        "X-Auth-Key": process.env.CLOUDFLARE_API_KEY || ""
    },
    body: JSON.stringify({
        type: type,
        name: name,
        content: ipAddress,
        ttl: ttl,
        proxied: proxied
    })
})
.then(async (res) => {
    if (!res.ok) {
        sendTelegramMessage(`Błąd podczas zmiany rekordu DNS: ${res.status} ${await res.text()}`);
    }
    sendTelegramMessage(`Rekord dns zostal zmieniony z ${oldIpAdress} na ${ipAddress} (${proxied ? 'z uzyciem proxy' : 'bez uzycia proxy'})`);
})
.catch((error) => {
    console.error('Fetch error:', error);
});
}

export default changeDNSRecord;
