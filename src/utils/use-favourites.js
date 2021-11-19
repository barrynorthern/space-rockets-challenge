import { useLocalStorage } from "./use-local-storage";

export const useFavourites = () => {
  const [ favourites, setFavourites ] = useLocalStorage('launch-favourites');
  return FavouritesManager(favourites, setFavourites);
}

export const FavouritesManager = (favourites, setFavourites) => {

  const isFavourite = (id) => favourites.ids && favourites.ids.includes(id);
  const addFavourite = (id) => setFavourites(previous => { return {ids: [...(previous.ids || []), id]}; });
  const removeFavourite = (id) => setFavourites(previous => { return {ids: (previous.ids || []).filter(n => n !== id)}; });
  const toggleFavourite = (id) => (isFavourite(id) ? removeFavourite : addFavourite)(id);
  
  return {
    isFavourite,
    toggleFavourite,
    favourites
  };
}