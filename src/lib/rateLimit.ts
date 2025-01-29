import { MAX_REQUESTS, WINDOW_HOURS } from './constants';

export function checkRateLimit(): boolean {
  const now = Date.now();
  const requests = JSON.parse(localStorage.getItem('requests') || '[]') as number[];
  
  // Remove requests older than WINDOW_HOURS
  const validRequests = requests.filter(
    timestamp => now - timestamp < WINDOW_HOURS * 60 * 60 * 1000
  );
  
  // Check if we're under the limit
  const underLimit = validRequests.length < MAX_REQUESTS;
  
  // If under limit, add new request
  if (underLimit) {
    validRequests.push(now);
    localStorage.setItem('requests', JSON.stringify(validRequests));
  }
  
  return underLimit;
}