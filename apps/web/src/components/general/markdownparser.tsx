import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { remarkMark } from '@/lib/utils/remarkMark';

const MarkdownParser = ({
  text,
  className,
  style,
  dontRenderLinks = false,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  dontRenderLinks?: boolean;
}) => {
  const components: Components = {
    a: ({ href, children }) =>
      dontRenderLinks || !href ? (
        <>{children}</>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
          {children}
        </a>
      ),
    mark: ({ children }) => <mark className="bg-yellow-200/70 rounded px-0.5 shadow-[inset_0_-0.15em_0_rgba(253,224,71,0.6)]">{children}</mark>,
  };

  return (
    <span className={`markdown_content ${className || ''}`} style={style}>
      <ReactMarkdown remarkPlugins={[remarkMark]} components={components}>
        {text}
      </ReactMarkdown>
    </span>
  );
};

export default MarkdownParser;
