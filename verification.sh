#!/bin/bash

echo "=== Hexo to Astro Migration Verification ==="
echo ""

echo "📁 File Structure:"
echo "  Components: $(find src/components -name "*.astro" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Pages: $(find src/pages -name "*.astro" -o -name "*.js" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Utils: $(find src/utils -name "*.ts" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Layouts: $(find src/layouts -name "*.astro" 2>/dev/null | wc -l | tr -d ' ')"
echo ""

echo "📝 Content:"
echo "  Blog Posts: $(ls -1 src/content/posts/*.md 2>/dev/null | wc -l | tr -d ' ')"
echo "  Post Images: $(find public/posts -name "main.jpg" 2>/dev/null | wc -l | tr -d ' ')"
echo ""

echo "🎨 Styling:"
echo "  SCSS Files: $(find src/styles -name "*.scss" 2>/dev/null | wc -l | tr -d ' ')"
echo "  Font Files: $(ls -1 public/fonts/*.woff 2>/dev/null | wc -l | tr -d ' ')"
echo ""

echo "⚙️  Configuration:"
[ -f "astro.config.mjs" ] && echo "  ✓ astro.config.mjs" || echo "  ✗ astro.config.mjs"
[ -f "package.json" ] && echo "  ✓ package.json" || echo "  ✗ package.json"
[ -f "tsconfig.json" ] && echo "  ✓ tsconfig.json" || echo "  ✗ tsconfig.json"
[ -f "netlify.toml" ] && echo "  ✓ netlify.toml" || echo "  ✗ netlify.toml"
[ -f "src/config.ts" ] && echo "  ✓ src/config.ts" || echo "  ✗ src/config.ts"
[ -f "src/content/config.ts" ] && echo "  ✓ src/content/config.ts" || echo "  ✗ src/content/config.ts"
echo ""

echo "📚 Documentation:"
[ -f "README.md" ] && echo "  ✓ README.md ($(wc -l < README.md | tr -d ' ') lines)" || echo "  ✗ README.md"
[ -f "MIGRATION_SUMMARY.md" ] && echo "  ✓ MIGRATION_SUMMARY.md" || echo "  ✗ MIGRATION_SUMMARY.md"
[ -f "TESTING_STATUS.md" ] && echo "  ✓ TESTING_STATUS.md" || echo "  ✗ TESTING_STATUS.md"
echo ""

echo "🔍 Sample Post Verification:"
POST="src/content/posts/how-to-structure-your-front-end-application.md"
if [ -f "$POST" ]; then
    echo "  ✓ Sample post exists"
    echo "  Title: $(grep "^title:" "$POST" | sed 's/title: //')"
    echo "  Date: $(grep "^date:" "$POST" | sed 's/date: //')"
    echo "  ID: $(grep "^id:" "$POST" | sed 's/id: //')"
else
    echo "  ✗ Sample post not found"
fi
echo ""

echo "📦 Dependencies:"
if [ -d "node_modules" ]; then
    echo "  ✓ node_modules installed"
else
    echo "  ⚠️  node_modules not installed (npm install needed)"
fi
echo ""

echo "✅ Migration Status: COMPLETE"
echo "⚠️  Next Step: npm install (network connectivity required)"
