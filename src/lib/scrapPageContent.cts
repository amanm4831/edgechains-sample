import { AutoPlayWriteWebPageScrapper } from "@arakoodev/edgechains.js/scraper";

// Initialize the scraper instance
const scraper = new AutoPlayWriteWebPageScrapper();

// Define the getContent function with retry logic
async function getContent(url: string): Promise<string> {
    let attempts = 0;
    const maxRetries = 3;
    
    while (attempts < maxRetries) {
        try {
            // Fetch content from the URL using the scraper
            return await scraper.getContent(url);
        } catch (error) {
            attempts++;
            // Check if error is an instance of Error
            if (error instanceof Error) {
                console.error(`Error Scraping: ${url}, Attempt ${attempts}`, error.message);
            } else {
                console.error(`Error Scraping: ${url}, Attempt ${attempts}`, error);
            }
            if (attempts === maxRetries) {
                return "Failed to scrape content after multiple attempts.";
            }
        }
    }
    return "Failed to scrape content after all retries.";  // Ensure a return value
}


// Export the getContent function using CommonJS export
module.exports = getContent;
