import { visit } from 'unist-util-visit'

export default function rehypeFixClassAttribute() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.properties?.class) {
        node.properties.className = node.properties.class
        delete node.properties.class
      }

      // Also fix class arrays (e.g., ['language-js'])
      if (Array.isArray(node.properties?.className)) {
        node.properties.className = node.properties.className.join(' ')
      }
    })
  }
}