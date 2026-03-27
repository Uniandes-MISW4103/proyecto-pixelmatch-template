import fs from "fs";
import path from "path";

const TEST_OUTPUT_DIR = "./test-results";
const PAGE_URL = "https://monitor177.github.io/color-palette";
const OUTPUT_FOLDER_PREFIX = "example-color-palette-vrt-";

function browserSection(browserName) {
  return `<div class="browser" id="browser-${browserName}">
    <h2>${browserName}</h2>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference (Before)</span>
        <img class="img2" src="before-${browserName}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test (After)</span>
        <img class="img2" src="after-${browserName}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="compare-${browserName}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(url, browserSections) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for
                 <a href="${url}"> ${url}</a>
            </h1>
            <div id="visualizer">
                ${browserSections.join("")}
            </div>
        </body>
    </html>`;
}

if (!fs.existsSync(TEST_OUTPUT_DIR)) {
  console.error(`Output directory not found: ${TEST_OUTPUT_DIR}. Run tests first.`);
  process.exit(1);
}

const browserFolders = fs
  .readdirSync(TEST_OUTPUT_DIR)
  .filter((name) => name.startsWith(OUTPUT_FOLDER_PREFIX));

if (browserFolders.length === 0) {
  console.error(`No test result folders found matching '${OUTPUT_FOLDER_PREFIX}*'. Run tests first.`);
  process.exit(1);
}

for (const folder of browserFolders) {
  const browserName = folder.replace(OUTPUT_FOLDER_PREFIX, "");
  const outputDir = path.join(TEST_OUTPUT_DIR, folder);
  const reportHtml = createReport(PAGE_URL, [browserSection(browserName)]);
  fs.writeFileSync(path.join(outputDir, "index.html"), reportHtml);
  fs.copyFileSync("./public/index.css", path.join(outputDir, "index.css"));
  console.log(`VRT report generated: ${outputDir}/index.html`);
}
