import React from "react";
import { SimpleGrid, Flex } from "@chakra-ui/core";

import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";

import { FavouriteLaunches } from './favourite-launches';
import { LaunchItem } from './launch-item';

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
  return (
    <div>
      <Flex direction="horizontal" w="100vw" justify="space-between" align="center" paddingRight="40px">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <FavouriteLaunches/>
      </Flex>
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem launch={launch} key={launch.flight_number}/>
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
} 