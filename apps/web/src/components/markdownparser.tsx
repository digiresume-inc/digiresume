import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

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
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {children}
        </a>
      ),
  };

  return (
    <span className={`markdown_content ${className || ""}`} style={style}>
      <ReactMarkdown components={components}>{text}</ReactMarkdown>
    </span>
  );
};

export default MarkdownParser;
