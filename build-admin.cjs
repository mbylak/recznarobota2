const fs = require("node:fs");
const path = require("node:path");
const Babel = require("./assets/admin/babel.min.js");

const root = __dirname;
const sourcePath = path.join(root, "cms.js");
const outputPath = path.join(root, "assets", "admin", "cms.bundle.js");

let source = fs.readFileSync(sourcePath, "utf8");

source = source
  .replace(/import React, \{ useState, useEffect \} from 'react';/, "")
  .replace(
    /import \{([\s\S]*?)\} from 'lucide-react';/,
    (_, names) => `const {${names.replace(/\bas\b/g, ":")}} = window.LucideReact;`,
  )
  .replace(
    "export default function CMSAdminApp()",
    "function CMSAdminApp()",
  );

source = `
const { useState, useEffect } = window.React;
${source}
window.CMSAdminApp = CMSAdminApp;
`;

const result = Babel.transform(source, {
  presets: ["react"],
  sourceType: "script",
  comments: false,
  compact: true,
});

fs.writeFileSync(outputPath, result.code, "utf8");
console.log(`Built ${path.relative(root, outputPath)}`);
