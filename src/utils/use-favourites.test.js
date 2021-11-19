import { FavouritesManager } from "./use-favourites";

const useFavourites = () => {
  let favourites = {ids: []};
  const setFavourites = (update) => {
    favourites.ids = update(favourites).ids;
  }
  return FavouritesManager(favourites, setFavourites);
};

describe("useFavourites", () => {
  const { toggleFavourite, isFavourite, favourites } = useFavourites();
  it("toggleFavourite should add an id to the empty list of ids", () => {
    toggleFavourite("A");
    expect(favourites.ids).toEqual(["A"]);
  });
  it("toggleFavourite should append an id to the list of ids", () => {
    toggleFavourite("B");
    expect(favourites.ids).toEqual(["A", "B"]);
  });
  it("toggleFavourite should allow many ids to be added to a list of ids", () => {
    toggleFavourite("C");
    toggleFavourite("D");
    toggleFavourite("E");
    toggleFavourite("F");
    expect(favourites.ids).toEqual(["A", "B", "C", "D", "E", "F"]);
  });
  it("toggleFavourite should remove an existing id from a list of ids", () => {
    toggleFavourite("B");
    expect(favourites.ids).toEqual(["A", "C", "D", "E", "F"]);
  });
  it("isFavourite should be true for an id in the list of ids", () => {
    expect(isFavourite("A")).toEqual(true);
    expect(isFavourite("C")).toEqual(true);
    expect(isFavourite("D")).toEqual(true);
    expect(isFavourite("E")).toEqual(true);
    expect(isFavourite("F")).toEqual(true);
  });
  it("isFavourite should be false for an id not in the list of ids", () => {
    expect(isFavourite("B")).toEqual(false);
  });
});
