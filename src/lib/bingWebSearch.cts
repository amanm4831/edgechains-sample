import axios from "axios";

interface BingWebPages {
    webPages: {
        value: any[];
    };
}
async function bingWebSearch({ query, key }: { query: string; key: string }) {
    try {
        const response = await axios.get<BingWebPages>(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`, {
            headers: { "Ocp-Apim-Subscription-Key": key },
        });
        return response.data.webPages.value;  // Return the actual object, not stringified data
    } catch (error) {
        console.error("Error during Bing Web Search:", error);
        return [];  // Return an empty array in case of error
    }
}


// Use module.exports to match the project convention
module.exports = bingWebSearch;
