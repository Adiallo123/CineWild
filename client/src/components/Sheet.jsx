/* eslint-disable import/no-duplicates */
import { useLoaderData } from "react-router-dom";
import { frenchDate } from "../utils/functions";
import { hourMin } from "../utils/functions";
import "../styles/dataSheet.css";

function Sheet() {
  const { moviePeople, movieDetails, movieCountries } = useLoaderData();
  console.info(moviePeople, movieCountries);

  function nativeName() {
    return movieDetails.origin_country
      .map((iso) => {
        const foundIndex = movieCountries.findIndex(
          (country) => country.iso_3166_1 === iso
        );
        return movieCountries[foundIndex].native_name;
      })
      .join(", ");
  }
  const movieCasting = moviePeople.cast;
  const renderCasting = movieCasting.map((cast) => `${cast.name} `);

  return (
    <>
      <h1>Fiche technique</h1>
      <section className="sheet">
        <div className="head-sheet">
          <img
            className="film-img"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
            alt="titre du film"
          />
          <h2>{movieDetails.title}</h2>
        </div>

        <div className="dataSheet">
          <ul>
            <li>
              <span className="blue-Font">Titre Original : </span>
              <span>{movieDetails.original_title}</span>
            </li>
            <li>
              <span className="blue-Font">Langue d'origine : </span>
              <span>{movieDetails.original_language} </span>
            </li>
            <li>
              <span className="blue-Font">Pays d'origine : </span>
              <span>{nativeName()} </span>
            </li>
            <li>
              <span className="blue-Font">Genre : </span>
              <span>{movieDetails.genres.map((genre) => genre.name)}</span>
            </li>
            <li>
              <span className="blue-Font">Date de sortie : </span>
              <span>{frenchDate(movieDetails.release_date)} </span>
            </li>
            <li>
              <span className="blue-Font">Durée : </span>
              <span> {hourMin(movieDetails.runtime)}</span>
            </li>
            <li>
              <span className="blue-Font">Studio : </span>
              <span>
                {" "}
                {movieDetails.production_companies.map(
                  (production) => production.name
                )}
              </span>
            </li>
            <li>
              <span className="blue-Font">Synopsis : </span>
              <span>{movieDetails.overview} </span>
            </li>
            <li>
              <span className="blue-Font">Casting : </span>
              <span>
                {renderCasting}{" "}
                <img src={`${movieCasting.profile_path}`} alt="" />{" "}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
export default Sheet;
