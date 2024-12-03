import open from 'open';

const PORT = 4000; // Default port for Next.js, update if different.
const URL = `http://localhost:${PORT}`;

(async () => {
    try {
        console.log(`Waiting for Next.js server to start...`);
        // Add a longer delay if necessary
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log(`Opening browser at ${URL}`);
        await open(URL);
    } catch (err) {
        console.error(`Failed to open browser: ${err}`);
    }
})();