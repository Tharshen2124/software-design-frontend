/**
 * Formats a date as "29th December 2024"
 * @param {Date|string|number} date - A Date object, date string, or timestamp
 * @returns {string} The formatted date string
 */
export function formatDate(date) {
  // Convert to Date object if string or timestamp
  const dateObj = (date instanceof Date) ? date : new Date(date);
  
  // Get day, month, and year
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();
  
  // Add ordinal suffix to day
  const suffix = getOrdinalSuffix(day);
  
  return `${day}${suffix} ${month} ${year}`;
}

/**
 * Returns the ordinal suffix for a number (st, nd, rd, th)
 * @param {number} day - The day of the month
 * @returns {string} The ordinal suffix
 */
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Example usage
console.log(formatDate(new Date())); // Today's date
console.log(formatDate('2024-12-29')); // "29th December 2024"
console.log(formatDate('2025-05-02')); // "2nd May 2025"
console.log(formatDate('2025-05-02T14:14:28.649408+00:00')); // "2nd May 2025"