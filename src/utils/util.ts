export function formatPubKey(pubkey: string): string {
    if (pubkey.length <= 8) return pubkey;
    return `${pubkey.substring(0, 4)}...${pubkey.substring(pubkey.length - 4)}`;
}

export function timeSince(timestamp: number): string {
    const now = Date.now(); // Current time in Unix timestamp (milliseconds)
    let elapsed = now - timestamp; // Time elapsed in milliseconds

    if (elapsed < 0) {
        return `in the future (${new Date(timestamp).toISOString()})`;
    }

    let interval = Math.floor(elapsed / 31536000000); // Years
    if (interval >= 1) {
        return interval + (interval === 1 ? " year ago" : " years ago");
    }

    interval = Math.floor(elapsed / 2592000000); // Months
    if (interval >= 1) {
        return interval + (interval === 1 ? " month ago" : " months ago");
    }

    interval = Math.floor(elapsed / 86400000); // Days
    if (interval >= 1) {
        return interval + (interval === 1 ? " day ago" : " days ago");
    }

    interval = Math.floor(elapsed / 3600000); // Hours
    if (interval >= 1) {
        return interval + (interval === 1 ? " hour ago" : " hours ago");
    }

    interval = Math.floor(elapsed / 60000); // Minutes
    if (interval >= 1) {
        return interval + (interval === 1 ? " minute ago" : " minutes ago");
    }

    return Math.floor(elapsed / 1000) + " seconds ago"; // Seconds
}

import { ClipboardCopyIcon } from '@heroicons/react/solid'; // You can use any icon library
import { notify } from './notifications';

export const handleCopy = (textToCopy: string, item: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
        notify({ type: 'success', message: `Copied ${item} to clipbpard!` })
    }).catch(() => {
        notify({ type: 'error', message: `Could not copy ${item} to clipbpard` })
    });
}