import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getSuperheroesRequest,
  updateSuperheroRequest,
  deleteSuperheroRequest,
} from "../../actions";
import SuperheroEditForm from "./SuperheroEditForm";
import { BASE_URL } from "../../config";

const SuperheroesList = ({
  superheroes,
  isFetching,
  error,
  getSuperheroesAction,
  deleteSuperheroAction,
  updateSuperheroAction,
}) => {
  const [expandedSuperheroes, setExpandedSuperheroes] = useState({});
  const [superheroToDelete, setSuperheroToDelete] = useState(null);
  const [editSuperhero, setEditSuperhero] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);

  const getSuperheroes = () => {
    getSuperheroesAction({ limit, offset });
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    getSuperheroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFullInfo = (superheroId) =>
    setExpandedSuperheroes((prevState) => ({
      ...prevState,
      [superheroId]: !prevState[superheroId],
    }));

  const handleDeleteSuperhero = (superheroId) => {
    deleteSuperheroAction(superheroId);
    setSuperheroToDelete(null);
  };

  return (
    <main>
      {superheroToDelete && (
        <aside className="confirmation-modal-window color-red mb-5">
          <p className="mb-5">
            Are you sure you want to delete this superhero?
          </p>
          <button
            className="mr-5"
            onClick={() => handleDeleteSuperhero(superheroToDelete)}
          >
            Yes
          </button>
          <button onClick={() => setSuperheroToDelete(null)}>No</button>
        </aside>
      )}

      <h1 className="mb-20">Superhero List</h1>

      {isFetching && <p className="mb-20">Loading...</p>}

      {error && <p className="color-red mb-5">{error}</p>}

      <ul>
        {superheroes.map((superhero) => (
          <li key={superhero.id} className="mb-20">
            <article>
              <h2 className="mb-5">{superhero.nickName}</h2>

              <div>
                {superhero.images.map((imageObj) => (
                  <img
                    key={imageObj.id}
                    src={`${BASE_URL}/${imageObj.image}`}
                    alt={superhero.nickName}
                    className="img-100 mr-5 mb-5"
                  />
                ))}
              </div>

              <nav className="mb-5">
                <button
                  className="mr-5"
                  onClick={() => toggleFullInfo(superhero.id)}
                >
                  Full Info
                </button>
                <button
                  className="mr-5"
                  onClick={() => setEditSuperhero(superhero)}
                >
                  Edit
                </button>
                <button onClick={() => setSuperheroToDelete(superhero.id)}>
                  Delete
                </button>
              </nav>

              {expandedSuperheroes[superhero.id] && (
                <section>
                  <p className="mb-5">
                    <strong>Real Name:</strong>&nbsp;{superhero.realName}
                  </p>
                  <p className="mb-5">
                    <strong>Origin Description:</strong>&nbsp;
                    {superhero.originDescription}
                  </p>
                  <p className="mb-5">
                    <strong>Catch Phrase:</strong>&nbsp;{superhero.catchPhrase}
                  </p>
                  <div className="mb-5">
                    <strong>Superpowers:</strong>
                    <ul>
                      {superhero.superpowers.map(({ id, superpower }) => (
                        <li key={id}>{superpower}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
         
              {editSuperhero && editSuperhero.id === superhero.id && (
                <SuperheroEditForm
                  superhero={editSuperhero}
                  onSubmit={(formData) => {
                    updateSuperheroAction(superhero.id, formData);
                    setEditSuperhero(null);
                  }}
                  onCancel={() => setEditSuperhero(null)}
                />
              )}
            </article>
          </li>
        ))}
      </ul>

      <button onClick={getSuperheroes} disabled={isFetching}>
        Load More Superheroes
      </button>
    </main>
  );
};

const mapStateToProps = ({ superheroReducer }) => {
  const { superheroes, isFetching, error } = superheroReducer || {};

  return {
    superheroes: superheroes || [],
    isFetching: isFetching || false,
    error: error || null,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSuperheroesAction: ({ limit, offset }) =>
    dispatch(getSuperheroesRequest({ limit, offset })),
  updateSuperheroAction: (id, newSuperheroData) =>
    dispatch(updateSuperheroRequest(id, newSuperheroData)),
  deleteSuperheroAction: (id) => dispatch(deleteSuperheroRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperheroesList);
