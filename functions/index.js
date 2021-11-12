const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// scrape search result
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/", async (req, res) => {
  console.log("started readProfiles");
  const results = {};
  results.cookieUserId = "dunno yet"; // will hold id of the user whose cookies we're using
  results.profiles = []; // will hold the profile scrapes
  let errorMessage = "Unauthorised";
  try {
    const { page, cookieUserId } = await setup(req.body.cookies);
    results.cookieUserId = cookieUserId;
    for (const profileUserName of req.body.profiles) {
      results.profiles.push(await readProfile(page, profileUserName)); // add scraped profile info to results
    }
    await page.browser().close();
    console.log(results);
    res.status(200).send(JSON.stringify(results));
  } catch (error) {
    console.error(error);
    if (!req.body.cookies) {
      errorMessage = "No Cookies";
    } else if (!req.body.profiles) {
      errorMessage = "Profile IDs are missing";
    }
    res.status(401).send(JSON.stringify(errorMessage));
  }
});

// set up puppeteer using cookies saved with chome plugin "Export cookie JSON file for Puppeteer"
const setup = async (cookies) => {
  console.log("setting up puppeteer with supplied cookies");
  const browser = await puppeteer.launch({
    args: ["--lang=en-au,en", "--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 2048, height: 1300 });
  await page.setDefaultTimeout(0);
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"
  );
  await page.setCookie(...cookies);

  // Navigate to feeds page for the supplied user (from their cookies)
  await page.goto("https://www.linkedin.com/feed/", {
    waitUntil: "networkidle2",
  });

  // Scrape the profile ID for the user whose cookies we have
  const cookieUserURL = await page.$eval(".feed-identity-module a", (a) =>
    a.getAttribute("href")
  );
  const cookieUserId = cookieUserURL.split("/")[2];

  return { page, cookieUserId };
};

// read first page of the search result
const readProfile = async (page, profileUserName) => {
  console.log(`reading ${profileUserName}`);
  await page.goto(
    `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
      profileUserName
    )}`,
    { waitUntil: "networkidle2" }
  );

  let searchResults;
  try {
    searchResults = await page.$$eval(".entity-result__content", (snippets) =>
      snippets.map((snippet) => {
        const rawProfileInfo = snippet.innerText.split("\n");
        const profileUrlWithHref = snippet.innerHTML
          .match(/href=(?:\'.*?\'|\".*?\")/)
          .toString()
          .slice(6, -1);
        return [
          rawProfileInfo[0],
          ...rawProfileInfo.slice(4, -1).filter(Boolean),
          profileUrlWithHref,
        ];
      })
    );
  } catch (error) {
    searchResults = [];
  }
  return { searchResults };
};


exports.scrapeResults = functions.https.onRequest(app);
