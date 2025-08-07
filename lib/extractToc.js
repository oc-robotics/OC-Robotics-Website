import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import { toc } from 'mdast-util-toc'

export function extractToc(markdown) {
  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .parse(markdown)

  const result = toc(tree)

  const flatten = (node) => {
    if (!node) return []
    if (node.type === 'list') {
      return node.children.flatMap(flatten)
    }
    if (node.type === 'listItem') {
      const heading = node.children.find((n) => n.type === 'paragraph')
      const link = heading?.children.find((n) => n.type === 'link')
      return [
        {
          id: link?.url?.replace(/^#/, ''),
          value: link?.children?.[0]?.value,
          depth: link?.data?.hProperties?.depth || 2,
        },
        ...flatten(node.children.find((n) => n.type === 'list')),
      ]
    }
    return []
  }

  return flatten(result.map)
}