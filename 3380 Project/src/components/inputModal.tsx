function InputModal({ label, value, setValue, onSave, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="popup-form">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <button onClick={() => onSave(value)}>{`Save ${label}`}</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default InputModal;
