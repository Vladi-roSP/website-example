const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const file = process.argv[2] || 'index.html';
    const output = process.argv[3] || 'screenshot.png';
    const filePath = path.resolve(file);
    const url = `file://${filePath}`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Wait extra for loader to finish
    await new Promise(r => setTimeout(r, 4000));
    // Scroll through the page to trigger reveal animations
    await page.evaluate(async () => {
        const total = document.body.scrollHeight;
        for (let y = 0; y < total; y += 600) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 150));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 1000));
    });
    await page.screenshot({ path: output, fullPage: true });
    console.log(`Screenshot saved: ${output}`);
    await browser.close();
})();
