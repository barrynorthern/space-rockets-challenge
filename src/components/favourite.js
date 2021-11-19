import React from "react";
import { Box } from "@chakra-ui/react";
import { Star } from 'react-feather';
import { useFavourites } from '../utils/use-favourites';

export default function Favourite({ id }) {

    const { isFavourite, toggleFavourite } = useFavourites();
  
    const onFavourite = (e, id) => {
      e.preventDefault();
      toggleFavourite(id);
    }
  
    return (
    <Box 
      onClick={(e) => onFavourite(e, id)}>
      { isFavourite(id)
        ? <Box color="yellow.500"><Star/></Box>
        : <Box color="gray.300"><Star/></Box>
      }
    </Box >);
  }