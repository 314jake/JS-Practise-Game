export function readCookie(cName) {
    const requestedC = document.cookie
        .split("; ")
        .find((c) => c.startsWith(cName));
    
    if (requestedC) {
        return requestedC.split("=")[1];
    } else {
        console.log(`Cookie \'${cName}\' not found.`)
        return null;
    }
}