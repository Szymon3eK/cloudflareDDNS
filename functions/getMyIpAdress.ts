const getMyIpAddress = async (): Promise<string> => {
    const response = await fetch('https://api.ipify.org?format=json');
    if(response.ok) {
        const data = await response.json() as {ip: string}
        return data.ip;

    }
    return response.statusText
}

export default getMyIpAddress;