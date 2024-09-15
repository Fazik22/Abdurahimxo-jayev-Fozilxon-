import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { Pagination } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  Drawer,
  Button,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setCountries, setLoading, setError } from "../store/countriesSlice";
import { addCountry, removeCountry } from "../store/selectedCountriesSlice";

const customTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400 border-blue-700",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body border-blue-700",
    cell: {
      base: "border-blue-700 px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-blue-50 even:bg-blue-200 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};

export default function Countries() {
  const { countries, loading } = useSelector((store) => store.countries);
  const selectedCountries =
    useSelector((store) => store.selectedCountries) || [];
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    async function fetchCountries() {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error("Error fetching countries");
        }
        const fetchedCountries = await response.json();
        dispatch(setCountries(fetchedCountries));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchCountries();
  }, [dispatch]);

  function handleSelectCountry(country, selected) {
    if (selected) {
      dispatch(removeCountry(country.cca2));
    } else {
      const selectedCountry = {
        cca2: country.cca2,
        name: country.name.common,
        flagURL: country.flags.png,
      };
      dispatch(addCountry(selectedCountry));
    }
  }

  function isCountrySelected(cca2) {
    const selected = selectedCountries.some((country) => country.cca2 === cca2);
    return selected;
  }

  return (
    <div>
      <Header onToggleDrawer={() => setDrawerOpen(!drawerOpen)} />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="right"
      >
        <Drawer.Items>
          <h2 className="text-lg font-semibold">Selected Countries</h2>
          {selectedCountries.length === 0 ? (
            <p>No countries selected</p>
          ) : (
            <ul>
              {selectedCountries.map((country) => (
                <li key={country.cca2} className="mb-2 flex items-center">
                  <img
                    src={country.flagURL}
                    alt={`${country.name} flag`}
                    className="w-6 h-4 mr-2"
                  />
                  {country.name}
                </li>
              ))}
            </ul>
          )}
        </Drawer.Items>
      </Drawer>

      <HeroSection />

      {loading && <div>LOADING...</div>}

      <div className="max-w-[1140px] mx-auto mt-4">
        <Table striped theme={customTheme}>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Population</TableHeadCell>
            <TableHeadCell>Capital</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Select</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {countries.map((country) => {
              const selected = isCountrySelected(country.cca2);
              return (
                <Table.Row
                  key={country.cca2}
                  className="bg-white dark:border-gray-800 border-blue-700 dark:bg-gray-800"
                >
                  <Table.Cell
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white cursor-pointer"
                    onClick={() => navigate(`/country/${country.cca2}`)}
                  >
                    {country.name.common}
                  </Table.Cell>
                  <Table.Cell>{country.population}</Table.Cell>
                  <Table.Cell>{country.capital}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={selected ? "success" : "gray"}
                      onClick={() => handleSelectCountry(country, selected)}
                    >
                      {selected ? "Unselect" : "Select"}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
