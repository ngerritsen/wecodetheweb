import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, 'source/_posts');
const destPath = path.join(__dirname, 'src/content/posts');

// Ensure destination directory exists
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, { recursive: true });
}

// Read all markdown files
const files = fs.readdirSync(sourcePath).filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} posts to migrate`);

files.forEach(file => {
  const content = fs.readFileSync(path.join(sourcePath, file), 'utf-8');

  // Split frontmatter and content
  const parts = content.split('---');
  if (parts.length < 3) {
    console.warn(`Skipping ${file} - invalid format`);
    return;
  }

  const frontmatter = parts[1];
  const postContent = parts.slice(2).join('---');

  // Parse frontmatter
  const lines = frontmatter.split('\n').filter(line => line.trim());
  const fm = {};
  let currentKey = null;
  let arrayMode = false;

  lines.forEach(line => {
    if (line.match(/^(\w+):/)) {
      const [, key, value] = line.match(/^(\w+):\s*(.*)$/);
      currentKey = key;

      if (value) {
        // Single value
        if (value.match(/^['"].*['"]$/)) {
          fm[key] = value.replace(/^['"]|['"]$/g, '');
        } else if (!isNaN(value)) {
          fm[key] = parseInt(value);
        } else {
          fm[key] = value;
        }
        arrayMode = false;
      } else {
        // Array mode
        fm[key] = [];
        arrayMode = true;
      }
    } else if (arrayMode && line.trim().startsWith('-')) {
      const value = line.trim().substring(1).trim();
      fm[currentKey].push(value);
    }
  });

  // Convert date to ISO 8601 format
  if (fm.date) {
    // Parse date like "2015-05-28 12:47:30" and convert to ISO 8601
    const dateStr = fm.date.toString();
    const [datePart, timePart = '00:00:00'] = dateStr.split(' ');
    const isoDate = `${datePart}T${timePart}Z`;
    fm.date = isoDate;
  }

  // Extract excerpt (text before <!-- more -->)
  let bodyContent = postContent;
  let excerpt = '';

  if (postContent.includes('<!-- more -->')) {
    const excerptMatch = postContent.split('<!-- more -->');
    excerpt = excerptMatch[0].trim();
    // Keep the full content including excerpt
  }

  // Add excerpt to frontmatter if it exists
  if (excerpt) {
    fm.excerpt = excerpt.replace(/\n/g, ' ').replace(/\s+/g, ' ').substring(0, 200);
  }

  // Build new frontmatter
  let newFrontmatter = '---\n';

  // Order: title, date, tags, categories, id, excerpt
  if (fm.title) newFrontmatter += `title: ${fm.title}\n`;
  if (fm.date) newFrontmatter += `date: ${fm.date}\n`;

  if (fm.tags && fm.tags.length > 0) {
    newFrontmatter += 'tags:\n';
    fm.tags.forEach(tag => {
      newFrontmatter += `  - ${tag}\n`;
    });
  }

  if (fm.categories && fm.categories.length > 0) {
    newFrontmatter += 'categories:\n';
    fm.categories.forEach(cat => {
      newFrontmatter += `  - ${cat}\n`;
    });
  }

  if (fm.id) newFrontmatter += `id: ${fm.id}\n`;

  newFrontmatter += '---';

  // Write new file
  const newContent = newFrontmatter + postContent;
  fs.writeFileSync(path.join(destPath, file), newContent, 'utf-8');

  console.log(`Migrated: ${file}`);
});

console.log('Migration complete!');
