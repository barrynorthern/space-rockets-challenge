import React from "react";
import { Badge, Box, Image, Text, Flex } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/format-date";
import { Star } from 'react-feather';
import { useSpaceX } from "../utils/use-space-x";
import Error from "./error"; // might need a different error markup here
import { useFavourites } from '../utils/use-favourites';

export function LaunchItemById({ launchId }) {

    const { data: launch, error } = useSpaceX(`/launches/${launchId}`);

    const defaultLaunch = {
      flight_number: launchId, 
      links: {
        flickr_images: []
      }, 
      launch_site: {},
      rocket: {}
    };

    return (
        <>
        <LaunchItem launch={launch ?? defaultLaunch} key={launchId}/>
        {error && <Error />}
        </>
    );
}

export function LaunchItem({ launch }) {

    const { isFavourite, toggleFavourite } = useFavourites();

    const onFavourite = (e, launch) => {
      e.preventDefault();
      toggleFavourite(launch.flight_number);
    }

    return (launch &&
      <Box
        as={Link}
        to={`/launches/${launch.flight_number.toString()}`}
        boxShadow="md"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        position="relative"
      >
        <Image
          src={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          alt={`${launch.mission_name} launch`}
          height={["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
          fallbackSrc={`https://via.placeholder.com/200?text=${launch.flight_number.toString()}`}
        />
  
        <Image
          position="absolute"
          top="5"
          right="5"
          src={launch.links.mission_patch_small}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />
  
        <Box p="6">
          <Flex direction="horizontal" justify="space-between" alignItems="baseline">
            <Box>
              {launch.launch_success ? (
                <Badge px="2" variant="solid" variantColor="green">
                  Successful
                </Badge>
              ) : (
                <Badge px="2" variant="solid" variantColor="red">
                  Failed
                </Badge>
              )}
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
              </Box>
            </Box>
            <Box 
              onClick={(e) => onFavourite(e, launch)}>
              { isFavourite(launch.flight_number)
                ? <Star color='green'/>
                : <Star color='red'/>
              }
            </Box >
          </Flex>
  
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launch.mission_name}
          </Box>
          {launch.launch_date_utc && <Flex>
            <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch.launch_date_utc)}
            </Text>
          </Flex>}
        </Box>
      </Box>
    );
  }