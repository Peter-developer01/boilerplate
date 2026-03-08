import { program } from "commander";
import fs from "fs";
import prompts from "prompts";

program.option("-y, --yes")
        .option("-n, --no")
        .option("--dry-run")
        .option("--force")
        .argument("<dirname>");

program.parse();
const opts = program.opts();
const args = program.args;
let [dirname] = args;
if (!dirname.startsWith("/") && !dirname.startsWith("./")) {
    dirname = "./" + dirname;
}
if (fs.existsSync(dirname)) {
    if (opts.force) {
        if (opts.dryRun) console.log("Would remove directory", dirname);
        else fs.rmSync(dirname, { recursive: true, force: true });
    } else {
        console.log("Directory exists (use --force to override)");
        process.exit(1);
    }
}

if (opts.dryRun) console.log("Would create directory", dirname);
else fs.mkdirSync(dirname);
const includeCSS = await getBool("Include CSS?");
const includeJS = await getBool("Include JS?");

if (includeCSS) {
    if (opts.dryRun) console.log("Would create file", dirname + "/style.css");
    else fs.writeFileSync(dirname + "/style.css", "");
}
if (includeJS) {
    if (opts.dryRun) console.log("Would create file", dirname + "/script.js");
    else fs.writeFileSync(dirname + "/script.js", "");
}

let indexHTML = "";
let tabs = 0;
const tab = () => tabs++;
const untab = () => tabs--;
const append = (x, includeNewline = true) => indexHTML += "\t".repeat(tabs) + x + (includeNewline ? "\n" : "");

append(`<!DOCTYPE html>`);
append(`<html lang="en">`);
append(`<head>`);
tab();
append(`<meta charset="UTF-8">`);
append(`<meta http-equiv="X-UA-Compatible" content="IE=edge">`);
append(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
append(`<title>Document</title>`);
if (includeCSS) append(`<link rel="stylesheet" href="./style.css">`);
untab();
append(`</head>`);
append(`<body>`);
tab();
append(``);
if (includeJS) append(`<script src="./script.js"></script>`);
untab();
append(`</body>`);
append(`</html>`, false);

if (opts.dryRun) console.log("Would create file", dirname + "/index.html", "with content", indexHTML);
else fs.writeFileSync(dirname + "/index.html", indexHTML);

if (!opts.dryRun) console.log(`All done! \`code ${dirname}\``);

async function getBool(prompt) {
    if (opts.yes) {
        return true;
    }
    if (opts.no) {
        return false;
    }
    return (await prompts({
        type: "confirm",
        name: "value",
        message: prompt
    })).value;
}

process.exit(0);