import ReactMarkdown from 'react-markdown';

const Page = () => {
  const markdown = `
# Hello, world!

This is a simple markdown example.

- Item 1
- Item 2
- Item 3
`;

  return (
    <div>
      <h1>My Page</h1>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default Page;
