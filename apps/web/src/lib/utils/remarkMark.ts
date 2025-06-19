import { visit } from 'unist-util-visit';

export function remarkMark() {
  return (tree: any) => {
    visit(tree, 'text', (node, index, parent) => {
      const regex = /==(.+?)==/g;
      const matches = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(node.value)) !== null) {
        const [fullMatch, highlightText] = match;
        const start = match.index;

        // Push normal text before match
        if (start > lastIndex) {
          matches.push({
            type: 'text',
            value: node.value.slice(lastIndex, start),
          });
        }

        // Push mark node (must be inline-safe)
        matches.push({
          type: 'inlineMark', // use a custom type name
          data: { hName: 'mark' }, // tell ReactMarkdown to render as <mark>
          children: [{ type: 'text', value: highlightText }],
        });

        lastIndex = start + fullMatch.length;
      }

      if (lastIndex < node.value.length) {
        matches.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        });
      }

      if (matches.length > 0 && parent?.children) {
        parent.children.splice(index, 1, ...matches);
      }
    });
  };
}
