import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleCountry() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);

        if (!response.ok) {
          throw new Error("Error fetching country details");
        }
        const countryData = await response.json();
        setCountry(countryData[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!country) return <div>No country found</div>;

  return (
    <div className="max-w-[1140px] mx-auto mt-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{country.name.common}</h1>
      <div className="mb-2">
        <strong>Population:</strong> {country.population}
      </div>
      <div className="mb-2">
        <strong>Capital:</strong> {country.capital}
      </div>
      <div>
        <img src={country.flags.png} alt={`${country.name.common} flag`} className="w-48 h-auto" />
      </div>
    </div>
  );
}

export default SingleCountry;
