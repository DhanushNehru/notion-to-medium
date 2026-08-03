# Notion → Medium Converter

Convert your Notion pages into Medium-ready HTML with one command. No Medium API token needed — uses a **copy-paste workflow** that preserves all formatting.

<img width="1114" height="741" alt="image" src="https://github.com/user-attachments/assets/4e2d3537-da9e-4d51-8a8f-a782cd0e3cb5" />

## How It Works

```
Notion Page → Notion API → Markdown → Medium-Optimized HTML → Browser Preview → Copy → Paste into Medium
```

1. Fetches your Notion page content via the official Notion API
2. Converts to clean, Medium-compatible HTML (headings, images, code blocks, lists, etc.)
3. Opens a beautiful preview in your browser with a **"Copy Article"** button
4. You paste directly into Medium's editor — formatting transfers perfectly

## Setup

### 1. Install Dependencies

```bash
cd notion-to-medium
npm install
```

### 2. Create a Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Give it a name (e.g., "Medium Exporter")
4. Set **Capabilities** → ✅ Read content
5. Copy the **Internal Integration Token**

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env and paste your Notion token
```

### 4. Share Pages with Your Integration

In Notion, open the page (or database) you want to export:
- Click **⋯** (top-right menu) → **Connections** → **Connect to** → Select your integration

## Usage

### Export a Single Page

```bash
# Find the page ID from the Notion URL:
# https://notion.so/My-Page-Title-abc123def456
#                                  ^^^^^^^^^^^^^^ this is the page ID

node src/cli.js <page-id>
```

This will:
- Generate `./output/my-page-title.html`
- Auto-open in your browser
- Click **"Copy Article"** → go to Medium → **Write** → **Cmd+V**

### Batch Export from a Database

```bash
# Export all pages from a database
node src/cli.js batch <database-id>

# Export only pages with status "Ready to Publish"
node src/cli.js batch <database-id> --status "Ready to Publish"

# Specify output directory
node src/cli.js batch <database-id> -o ./medium-drafts
```

### Verify Your Token

```bash
node src/cli.js verify
```

## Content Mapping

| Notion Block | Medium Output |
|:---|:---|
| Headings (H1-H3) | `<h1>` – `<h3>` |
| Paragraphs | `<p>` |
| Bold / Italic | `<strong>` / `<em>` |
| Inline Code | `<code>` |
| Code Blocks | `<pre><code>` with syntax highlighting |
| Images | `<figure>` with `<figcaption>` |
| Bulleted Lists | `<ul>` / `<li>` |
| Numbered Lists | `<ol>` / `<li>` |
| Blockquotes | `<blockquote>` |
| Callouts | Styled blockquote with emoji |
| Toggle Blocks | Expanded content (Medium doesn't support toggles) |
| Two-Column Layout | Flattened to sequential content |
| Dividers | `<hr>` (Medium's three-dot divider) |
| Tables | `<table>` |
| Links | `<a>` |

## Important Notes

- **Images**: Notion image URLs are temporary (expire in ~1 hour). Export and paste into Medium promptly so Medium can download and re-host them.
- **Two-column layouts**: Medium doesn't support columns, so they're flattened to sequential sections.
- **Toggle blocks**: Expanded inline since Medium has no collapsible sections.
- **Database views / Embeds**: Not supported in Medium — they'll appear as links or be omitted.

## Troubleshooting

**"Unauthorized" error**: Make sure you've shared the Notion page/database with your integration (Connections → Connect to).

**Empty content**: Check that your integration has "Read content" capability enabled.

**Images not loading on Medium**: Paste into Medium within 1 hour of exporting. Notion's image URLs expire.
