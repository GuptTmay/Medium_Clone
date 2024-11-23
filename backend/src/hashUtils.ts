
function generateSalt(length = 16) : Uint8Array {
    const salt = new Uint8Array(length);
    crypto.getRandomValues(salt);
    return salt;
}


async function hashingPassword(password: string, salt: Uint8Array) {
    const passwordData = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey(
        'raw',
        passwordData,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
    );

    const deriveKey = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100,
            hash: 'SHA-256',
        },
        key,
        { name: 'AES-GCM' , length: 256},
        true,
        ['encrypt', 'decrypt']
    );

    const hashBuffer = await crypto.subtle.exportKey('raw', deriveKey);
    return new Uint8Array(hashBuffer);
}

async function verifyPassword(inputPassword: string, storedHash: Uint8Array, storedSalt: Uint8Array) {
  const inputHash = await hashingPassword(inputPassword, storedSalt);
  return storedHash.every((byte, i) => byte === inputHash[i]);
}


async function hashPassword(password: string) {
    const salt = generateSalt();
    const hashedPassword = await hashingPassword(password, salt);

    // Convert hashed password and salt to Base64 for storage
    const base64HashedPassword = btoa(String.fromCharCode(...hashedPassword));
    const base64Salt = btoa(String.fromCharCode(...salt));

    return {
        hashedPassword: base64HashedPassword,
        salt: base64Salt,
    };
}

async function matchPassword(password : string, hashedPassword : string, salt : string) {
    const decodedStoredHash = Uint8Array.from(atob(hashedPassword), (c) => c.charCodeAt(0));
    const decodedStoredSalt = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));

    const inputHash = await hashingPassword(password, decodedStoredSalt);
    const isMatch = inputHash.every((byte, i) => byte === decodedStoredHash[i]);

    return isMatch;
}


export default {
    hashPassword,
    matchPassword
}