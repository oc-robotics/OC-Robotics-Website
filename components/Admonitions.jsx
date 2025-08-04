import '@/styles/Admonitions.css'

function Admonitions({ type, children}){
  return (
    <div className={`admonition-${type.toLowerCase()}`}>
      <strong>{type}:</strong>
      <p className="admonition-message">{children}</p>
    </div>
  )
}

export default Admonitions;