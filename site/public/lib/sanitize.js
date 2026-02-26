// lib/sanitize.js

/**
 * Safely escapes HTML characters from a string to prevent XSS injection
 * when rendering dynamic user data or external API content inside .innerHTML
 * 
 * @param {string} str - The raw string to sanitize
 * @returns {string} - The escaped, safe string
 */
export function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>'"`=/]/g, function (s) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;',
            '`': '&#x60;',
            '=': '&#x3D;',
            '/': '&#x2F;'
        }[s];
    });
}
