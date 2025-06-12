const getAllDNSfromZone = async (): Promise<Array<any>> => {
    const url = `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Email": process.env.CLOUDFLARE_EMAIL || '',
                "X-Auth-Key": process.env.CLOUDFLARE_API_KEY || ''
            }
        });

        if (!response.ok) {
            throw new Error(`Cloudflare API error: ${response.status} ${await response.text()}`);
        }

        const data = await response.json() as { result: Array<any> };
        return data.result;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
};

export default getAllDNSfromZone; 