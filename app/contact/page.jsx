import fs from 'node:fs/promises'
import {compile} from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'

const compiledContent = await compile(await fs.readFile('app/contact/test.mdx'))

function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <div dangerouslySetInnerHTML={{ __html: String(compiledContent) }} />
      <p>This is a contact page example using MDX.</p>
    </div>
  );
}

export default ContactPage;