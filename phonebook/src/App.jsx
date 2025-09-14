import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();
  const [filter, setFilter] = useState("");

  // const namesToShow = setShowAll ? persons : persons.filter(person => person.name === )

  const addNameAndNumber = (e) => {
    e.preventDefault();
    const nameAndNumberObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === nameAndNumberObject.name)) {
      alert(`${newName} is already added to the ponebook`);
    } else {
      setPersons(persons.concat(nameAndNumberObject));

      setNewName(" ");
      setNewNumber(" ");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  console.log(filteredPersons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      {/* <form onSubmit={addNameAndNumber}>
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
      </form> */}
      <PersonForm
        addNameAndNumber={addNameAndNumber}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
