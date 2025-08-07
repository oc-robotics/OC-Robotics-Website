export default function Sidebar({ toc }) {
  return (
    <nav>
      <ul>
        {toc.map(({ id, value, depth }, idx) => (
            <li key={id || idx} style={{ marginLeft: (depth - 2) * 16 }}>
                <a href={`#${id}`}>{value}</a>
            </li>
        ))}
      </ul>
    </nav>
  )
}