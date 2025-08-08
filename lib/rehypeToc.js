export function rehypeToc() {
  return (tree, file) => {
    const toc = [];

    tree.children.forEach((node) => {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        const text = node.children
          .filter((child) => child.type === "text")
          .map((child) => child.value)
          .join("");

        toc.push({
          id: node.properties.id,
          text,
          level: parseInt(node.tagName[1]),
        });
      }
    });
    file.data.toc = toc;
  };
}
