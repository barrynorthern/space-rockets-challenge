import { useLocalStorage } from "./use-local-storage";

export const useFavourites = () => {
    
  const [ favourites, setFavourites ] = useLocalStorage('favourites', { flight_numbers: [] });

  const isFavourite = (launch) => favourites.flight_numbers.includes(launch.flight_number);
  const addFavourite = (launch) => setFavourites({flight_numbers: [...favourites.flight_numbers, launch.flight_number]});
  const removeFavourite = (launch) => setFavourites({flight_numbers: favourites.flight_numbers.filter(n => n !== launch.flight_number)});
  const toggleFavourite = (launch) => (isFavourite(launch) ? removeFavourite : addFavourite)(launch);
  
  return [
    isFavourite,
    toggleFavourite
  ];
}