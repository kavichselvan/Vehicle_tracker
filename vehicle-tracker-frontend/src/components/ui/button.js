export function Button({ children, onClick, variant }) {
  return (
    <button onClick={onClick} className={`btn ${variant}`}>
      {children}
    </button>
  )
}
