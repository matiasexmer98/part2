const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </>
  );
};

export default Persons;
