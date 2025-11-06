import '../../public/overlay.css'

function Overlay({ isOpen, onClose,children}) {

    if (!isOpen) return null;

  return (
    <div className="overlay__background" onClick={onClose}>
      <div className="overlay__container" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="overlay__close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  )
}

export default Overlay