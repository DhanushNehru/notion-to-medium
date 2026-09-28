const test = require('node:test');
const assert = require('node:assert/strict');
const { NotionToMediumConverter } = require('./converter.js');

test('NotionToMediumConverter Tests', async (t) => {
  // Initialize the converter
  const converter = new NotionToMediumConverter();

  await t.test('Toggle expansion: extracts readable content from <details> and <summary>', () => {
    const input = '<details><summary>Click here</summary>Hidden content</details>';
    const result = converter.convert(input);
    
    assert.ok(!result.includes('<details>'), 'Should remove <details> tag');
    assert.ok(!result.includes('<summary>'), 'Should remove <summary> tag');
    assert.ok(result.includes('<strong>Click here</strong>'), 'Summary should be bolded');
    assert.ok(result.includes('Hidden content'), 'Content should be preserved');
  });

  await t.test('Image conversion: converts images to <figure> with <figcaption>', () => {
    const input = '![My Image](https://example.com/image.png "Image Title")';
    const result = converter.convert(input);
    
    assert.ok(result.includes('<figure>'), 'Should wrap in <figure>');
    assert.ok(result.includes('<img src="https://example.com/image.png" alt="My Image" title="Image Title" />'), 'Should contain formatted img');
    assert.ok(result.includes('<figcaption>My Image</figcaption>'), 'Should include figcaption with alt text');
  });

  await t.test('Code blocks: keeps language-* class and HTML-escapes the code', () => {
    const input = '```javascript\nif (a < b && c > d) { console.log("hi"); }\n```';
    const result = converter.convert(input);
    
    assert.ok(result.includes('<code class="language-javascript">'), 'Should keep language class');
    assert.ok(result.includes('if (a &lt; b &amp;&amp; c &gt; d)'), 'Should escape HTML characters like < and >');
    assert.ok(result.includes('&quot;hi&quot;'), 'Should escape quotes');
  });

  await t.test('getWordCount: correctly counts words in a known HTML snippet', () => {
    const htmlSnippet = '<p>This is a <strong>simple</strong> word count test!</p>';
    const count = converter.getWordCount(htmlSnippet);
    assert.strictEqual(count, 7, 'Should count exactly 7 words');
  });
});