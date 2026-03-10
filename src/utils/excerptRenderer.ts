import { createMarkdownProcessor, type MarkdownProcessor } from '@astrojs/markdown-remark';

let processor: MarkdownProcessor | null = null;

export async function renderExcerpt(markdown: string): Promise<string> {
  if (!processor) {
    processor = await createMarkdownProcessor({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'nord',
        wrap: false,
      },
    });
  }

  const result = await processor.render(markdown);
  return result.code;
}
