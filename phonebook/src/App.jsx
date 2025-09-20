import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // const namesToShow = setShowAll ? persons : persons.filter(person => person.name === )

  const addNameAndNumber = (e) => {
    e.preventDefault();
    const nameAndNumberObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === nameAndNumberObject.name)) {
      if (
        window.confirm(
          `${newName} is already added to the ponebook, do you want to update the number?`
        )
      ) {
        const personToUpdateId = persons.find(
          (person) => person.name === newName
        ).id;
        personService
          .update(personToUpdateId, nameAndNumberObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === personToUpdateId ? response.data : person
              )
            );
          });
      }
    } else {
      personService.create(nameAndNumberObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePersonM(id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
