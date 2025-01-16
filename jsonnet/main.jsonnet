local PromptTemplate = |||
  {researchSummary} Based on the above information, generate a study guide for the following question or topic: "{question}". 
  The report should provide a detailed analysis of each recommended resource, explaining how each source can contribute to answering the study question. 
  Focus on the relevance, reliability, and significance of each source. Ensure that the report is well-structured, informative, in-depth, and follows Markdown syntax. 
  Include relevant facts, figures, and numbers whenever available. The report should have a minimum length of 5,200 words.
|||;

local bingKey = std.extVar("BingKey");
local openAIkey = std.extVar("openAIkey");

local generatePrompt() =
  local query = std.extVar("query");

  // Perform a Bing web search based on the user's query and parse JSON response
  local getWebSearch = std.parseJson(arakoo.native("bingWebSearch")({ query: query, key: bingKey }));

  // Initialize data variable for accumulating content
  local data = "";
  local range = std.range(0, std.length(getWebSearch) - 1);

  // Accumulate content from the search results, excluding PDF URLs
  local finalData = std.foldl(
    function(acc, i)
      local url = getWebSearch[i].url;
      if !std.endsWith(url, ".pdf") then
        // Scrape the content and add it to the accumulated data
        local getPageContent = arakoo.native("webScraper")(url);
        acc + std.slice(getPageContent, 0, 3000, 1)
      else
        // Skip PDF URLs
        acc,
    range,
    data
  );

  // Replace placeholders in the prompt template
  local updatedPromptTemplateWithQuery = std.strReplace(PromptTemplate, "{question}", query);
  local updatedPromptTemplateWithSummary = std.strReplace(updatedPromptTemplateWithQuery, "{researchSummary}", finalData);

  // Call OpenAI API with the constructed prompt
  arakoo.native("openAICall")({ prompt: updatedPromptTemplateWithSummary, openAIApiKey: openAIkey });

// Execute the prompt generation function
generatePrompt()
