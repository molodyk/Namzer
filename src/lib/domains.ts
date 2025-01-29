import axios from 'axios';

const WHOIS_API = 'https://whois.freeaiapi.xyz/check';
const COMMON_TLDS = ['.com', '.net', '.org', '.io', '.co', '.app'];

interface WhoisResponse {
  available: boolean;
  domain: string;
}

export async function checkDomainAvailability(name: string, zone: string): Promise<boolean> {
  try {
    // Remove spaces and special characters, convert to lowercase
    const domain = `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}${zone}`;
    
    const response = await axios.post<WhoisResponse>(WHOIS_API, {
      domain: domain
    }, {
      timeout: 5000,
    });

    return response.data.available;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Domain check error:', error.message);
    }
    return false;
  }
}

export async function checkMultipleDomains(name: string): Promise<Array<{ zone: string, available: boolean }>> {
  // Check domains in parallel
  const checks = COMMON_TLDS.map(async (tld) => {
    // Add a small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
      const available = await checkDomainAvailability(name, tld);
      return { zone: tld, available };
    } catch {
      return { zone: tld, available: false };
    }
  }).slice(0, 3); // Only check first 3 TLDs to reduce load

  try {
    const allResults = await Promise.all(checks);
    
    // Filter available domains
    const availableDomains = allResults.filter(result => result.available);
    
    return availableDomains;
  } catch {
    return [];
  }
}