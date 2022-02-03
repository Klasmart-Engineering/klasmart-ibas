import ReactMarkdown from 'react-markdown'

import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'

import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkFootnotes, remarkMath]}
      rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeKatex]}
      components={{
        a: (props) => (
          <a {...props} className="text-blue-400 hover:text-blue-600 underline">
            {props.children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
