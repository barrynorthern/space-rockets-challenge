import React, { useState } from "react";
import { SimpleGrid, Flex, Select, FormControl, FormLabel } from "@chakra-ui/react";

import { useSpaceX, useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";

import { FavouriteLaunches } from './favourite-launches';
import { LaunchItem } from './launch-item';

const PAGE_SIZE = 12;

function RocketFilter({onChange}) {
  
  const { data, error } = useSpaceX(`/rockets`);

  const RocketFilterWrapper = (props) => {
    const { children } = props;
    return <FormControl id="rocket">
        <Flex w="32" direction="horizontal" padding="15">
            <FormLabel>Rocket</FormLabel>
            {children}
        </Flex>
      </FormControl>
  }

  if (error) {
    return <RocketFilterWrapper>
      <Select placeholder={error} disabled></Select>
    </RocketFilterWrapper>
  }

  if (!data) {
    return <RocketFilterWrapper>
      <Select placeholder="Rocket" disabled></Select>
    </RocketFilterWrapper>
  }

  return <RocketFilterWrapper>
    <Select placeholder="All" onChange={event => onChange(event.currentTarget.value)}>
      {data.map(r => (<option value={r.rocket_id} key={r.id}>{r.rocket_name}</option>))}
    </Select>
  </RocketFilterWrapper>
}

export default function Launches() {
  const [ filters, setFilters ] = useState({});
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
      ...filters
    }
  );
  
  const onRocketFilter = (rocket_id) => {
    console.log(rocket_id);
    if (rocket_id === 'all') {
      setFilters({});
    }
    else {
      setFilters({rocket_id: rocket_id});
    }
  }

  return (
    <div>
      <Flex direction="horizontal" w="100vw" justify="space-between" align="center" paddingRight="40px">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <FavouriteLaunches/>
      </Flex>
      <Flex direction="horizontal" w="100vw" align="center">
        <RocketFilter onChange={onRocketFilter}/>
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