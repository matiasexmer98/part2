const PersonForm = ({
  addNameAndNumber,
  newName,
  handleNameChange,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addNameAndNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
