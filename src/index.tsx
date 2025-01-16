import { ArakooServer } from "@arakoodev/edgechains.js/arakooserver";
import { createSyncRPC } from "@arakoodev/edgechains.js/sync-rpc";
import Jsonnet from "@arakoodev/jsonnet";
import fileURLToPath from "file-uri-to-path";
import path from "path";
import Home from "./pages/Home.js";
const server = new ArakooServer();
const jsonnet = new Jsonnet();
const app = server.createApp();

const __dirname = fileURLToPath(import.meta.url);

const secretsPath = path.join(__dirname, "../../jsonnet/secrets.jsonnet");

let key: string, openAIkey: string;

// Try reading secrets from Jsonnet file
try {
  const jsonnetData = jsonnet.evaluateFile(secretsPath);
  console.log("Jsonnet Data:", jsonnetData);
  const secrets = JSON.parse(jsonnetData);
  key = secrets.bing_api_key || "";
  openAIkey = secrets.openai_api_key || "";
} catch (error) {
  console.error("Error evaluating Jsonnet file:", error);
  key = "";
  openAIkey = "";
}

console.log("Bing API Key:", key);
console.log("OpenAI API Key:", openAIkey);

// Use createSyncRPC to load modules
const openAICall = createSyncRPC(
  path.join(__dirname, "../lib/generateResponse.cjs")
);
console.log("openAICall:", openAICall);

const bingWebSearch = createSyncRPC(
  path.join(__dirname, "../lib/bingWebSearch.cjs")
);
console.log("bingWebSearch:", bingWebSearch);

const WebScraper = createSyncRPC(
  path.join(__dirname, "../lib/scrapPageContent.cjs")
);
console.log("WebScraper:", WebScraper);

app.get("/", (c: any) => {
  return c.html(<Home />);
});
// app.post("/research", async (c: any) => {

app.post("/research", async (c: any) => {
  console.time("Research Time");
  try {
    // Parse JSON body explicitly to ensure the query is received properly
    // const rawBody = await c.req.text();
    // console.log("Raw Body:", rawBody);

    const formData = await c.req.formData(); // Await the form data
    // const query = formData.query;

    const query = formData.get("query");

    // const body = JSON.parse(rawBody);
    // console.log("Parsed Body:", body);

    // const { query } = body;
    console.log("Received query:", query);

    if (!query || query.trim() === "") {
      throw new Error("Query parameter is missing or empty.");
    }

    jsonnet.extString("query", query);
    jsonnet.extString("BingKey", key || "");
    jsonnet.extString("openAIkey", openAIkey || "");
    jsonnet.javascriptCallback("openAICall", openAICall);
    jsonnet.javascriptCallback("bingWebSearch", bingWebSearch);
    jsonnet.javascriptCallback("webScraper", WebScraper);

    let data = "";
    try {
      data = jsonnet.evaluateFile(
        path.join(__dirname, "../../jsonnet/main.jsonnet")
      );
    } catch (parseError) {
      if (parseError instanceof Error) {
        console.error("Error parsing Jsonnet output:", parseError.message);
      } else {
        console.error("An unknown error occurred during JSON parsing.");
      }
      console.timeEnd("Research Time");
      return c.json({ error: "Invalid JSON format received from Jsonnet" });
    }

    const response = data
      .replace(/\\n/g, "<br/>")
      .replace(/\\\\/g, "")
      .replace(/\\"/g, '"')
      .replace(/\"\"/g, "")
      .replace(/\\([^\n])/g, "$1")
      .replace(/##\s/g, "<h2>")
      .replace(/###\s/g, "<h3>")
      .replace(/#\s/g, "<h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return c.json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during research request:", error.message);
      console.timeEnd("Research Time");
      return c.json({ error: error.message });
    } else {
      console.error("An unknown error occurred:", error);
      console.timeEnd("Research Time");
      return c.json({ error: "An unknown error occurred" });
    }
  }
});
server.listen(5000);
