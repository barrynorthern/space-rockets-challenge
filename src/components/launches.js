import React, { useState } from "react";
import { SimpleGrid, Flex, Select, FormControl, FormLabel, Switch } from "@chakra-ui/react";

import { useSpaceX, useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";

import { FavouriteLaunches } from './favourite-launches';
import { LaunchItem } from './launch-item';
import { updateFilter } from '../utils/update-filter';

const PAGE_SIZE = 12;

function SelectFilter(props) {
  const { param, label, labelField, data, error, onChange } = props;
  const [ value, setValue ] = useState("All");

  const onSelectChange = (event) => {
      setValue(event.target.value);
      onChange(event.target.value);
  }

  const SelectFilterWrapper = (props) => {
    const { children } = props;

    return <FormControl marginLeft="30px" display="flex" alignItems="center" id={param} w="300px">
          <FormLabel style={{whiteSpace: "nowrap"}}>{label}</FormLabel>
          {children}
      </FormControl>
  }

  if (error) {
    return <SelectFilterWrapper>
      <Select placeholder={error} disabled></Select>
    </SelectFilterWrapper>
  }

  if (!data) {
    return <SelectFilterWrapper>
      <Select disabled></Select>
    </SelectFilterWrapper>
  }

  return <SelectFilterWrapper>
    <Select placeholder="All" value={value} onChange={onSelectChange}>
      {data.map(r => (<option value={r[param]} key={r[param]}>{r[labelField]}</option>))}
    </Select>
  </SelectFilterWrapper>
}

function RocketFilter({onChange}) {
  const { data, error } = useSpaceX("/rockets");
  return  <SelectFilter 
  param="rocket_id"
    label="Rocket"
    labelField="rocket_name"
    data={data}
    error={error}
    onChange={onChange}/>
}

function LaunchSiteFilter({onChange}) {
  const { data, error } = useSpaceX("/launchpads");
  return  <SelectFilter 
    param="site_id"
    label="Launch Site"
    labelField="name"
    data={data}
    error={error}
    onChange={onChange}/>
}

function LaunchYearFilter({onChange}) {
  const start = 2006;
  const years = Array.from(Array(15).keys()).map(x => ({launch_year: `${x + start}`, name: `${x + start}`}));
  const error = null;
  return  <SelectFilter 
    param="launch_year"
    label="Launch Year"
    labelField="name"
    data={years}
    error={error}
    onChange={onChange}/>
}

function OrderSwitch({checked, onChange}) {
  const onChecked = event => onChange(event.target.checked);
  
  return <FormControl marginLeft="30px" display="flex" alignItems="center">
    <FormLabel htmlFor="order" mb="0">
      Most Recent?
    </FormLabel>
    <Switch id="order" isChecked={checked} onChange={onChecked} />
  </FormControl>
}

export default function Launches() {
  const [ filters, setFilters ] = useState({});
  const [ desc, setDesc ] = useState(true);
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: desc ? "desc" : "asc",
      sort: "launch_date_utc",
      ...filters
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
      <Flex direction="horizontal" w="100vw" alignItems="center" justify="space-between">
        <Flex direction="horizontal" alignItems="center">
          <RocketFilter onChange={value => updateFilter("rocket_id", value, setFilters)}/>
          <LaunchSiteFilter onChange={value => updateFilter("site_id", value, setFilters)}/>
          <LaunchYearFilter onChange={value => updateFilter("launch_year", value, setFilters)}/>
        </Flex>
        <OrderSwitch checked={desc} onChange={setDesc}/>
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