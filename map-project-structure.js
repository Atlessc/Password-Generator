import fs from 'fs';
import path from 'path';

function mapFiles(dir, excludedPaths = [], prefix = '', isLast = true) {
    const items = fs.readdirSync(dir);

    items.forEach((item, index) => {
        const fullPath = path.join(dir, item);
        const isExcludedPath = excludedPaths.includes(fullPath);
        const isDirectory = fs.statSync(fullPath).isDirectory();
        const isLastItem = index === items.length - 1;

        if (isExcludedPath) {
            return;
        }

        // Print the current item with tree structure
        console.log(`${prefix}${isLast ? '└─' : '├─'} ${item}`);

        if (isDirectory) {
            // Recurse into directories
            mapFiles(fullPath, excludedPaths, `${prefix}${isLast ? '   ' : '│  '}`, isLastItem);
        }
    });
}

// Define the directory to start mapping from
const projectDir = path.resolve(); // Start from the current directory

// Define the paths to exclude
const excludedPaths = [
    path.join(projectDir, 'node_modules'),
    path.join(projectDir, '.git'),
    path.join(projectDir, '.env')
];

// Start mapping the files
console.log(projectDir);
mapFiles(projectDir, excludedPaths);
