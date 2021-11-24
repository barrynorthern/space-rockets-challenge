# Filtering

We will implement some basic filtering on the launches page. In the future this can be extended with more filters, and filtering could also be added to the launch-pads page, or any other pages we might add. The types of filtering we can do are limited and informed by the features of the SpaceX API.

## SpaceX API filtering

The launches are retrieved via the following endpoint

```https://api.spacexdata.com/v3/launches```

The filter parameters availabled are documented here:

https://docs.spacexdata.com/?version=latest#bc65ba60-decf-4289-bb04-4ca9df01b9c1

There are nearly 50 filters, many of which would not be appropriate for a simple search mechanism on the launches page. When searching, it makes sense for the parameters of the search to be presented in the results of the search, so let's start with what is currently displayed for each launch item and work back from there to identify the filters.

## Launch Item Fields

* Launch Success
* Rocket Name
* Launch Site Name
* Mission Name
* Launch Date

### Launch Success

This is a simple binary choice and could be represented by a checkbox or toggle control.

Query String Param | Values
---|---
launch_success | true OR false

### Rocket Name

There is a field to search by name, but the precise name must be known and entered for it to work. There is no "like" partial string text search. It would be better to have a select pulldown of rockets to choose from. Each rocket has a unique id, which can be used for our launches filter.

Query String Param | Values | Example
---|---|---
rocket_id | (id string) | falconheavy

To retrieve the list of id/name parts for each rocket we will use the following endpoint.

```https://api.spacexdata.com/v3/rockets```

The API offers no mechanism for mapping the results, so all fields will be returned in the response. The fields we are interested in for our pulldown are:

* rocket_name
* rocket_id

Currently there are only 4 rockets, so pulling all these down is not prohibitive. Ideally we would have our own API that could cache the configuration needed for the filters throughout the whole application, but this will suffice for our proof of concept.

### Launch Site Name

The same principals we applied to the rocket name search apply here.

Query String Param | Values | Example
---|---|---
site_id | (id string) | ksc_lc_39a

To retrieve the list of id/name parts for each launch site we will use the following endpoint, which is the same one used on the launch-pads page.

```https://api.spacexdata.com/v3/launchpads```

The fields we need are:

* name
* site_id

There is also a "site_name_long", but this would be too long for a pulldown select box. Perhaps it could be used in the filter summary (see below)

This endpoint is already 

### Mission Name

For the purposes of this proof of concept, we will not be adding this filter. There is a missions endpoint which we could use in the same way as the others, but since we don't have a way of setting the fields we want returned, or a single endpoint to call to get the data we need from multiple sources, this approach will not scale well and will result in ever longer initialisation times for the application.

### Launch Date

The filtering offered by the launches endpoint is simple and does not offer a way to filter by date ranges. However, there is a year filter, which might be useful. For now we will simply create the select pulldown for this manually, from 2006 to the final year in this historical data set: 2020.

The first launch year can be found like so:

```https://api.spacexdata.com/v3/launches?sort=launch_year&order=asc&limit=1```

and the last like so:

```https://api.spacexdata.com/v3/launches?sort=launch_year&order=desc&limit=1```


## Filter Summary

We are keeping the filter controls simple and visible, rather than in a hidden panel or modal. This will serve as a visual aid to the user so they know what current filters are applied. It might also be useful to have a simple summary, where selected:

* rocket name
* full launch site name

## Ordering

The only ordering that seems to be useful is on launch date. We will make a most recent / oldest toggle sort control using the following sort params

oldest ```?sort=launch_date_utc&order=asc```

most recent ```?sort=launch_date_utc&order=desc```



## Paging

The results should continue to be paged using the useSpaceXPaginated() hook.

## Implementation

The final endpoint urls are constructed in the use-space-x hooks which wrap useSWR. The filters need to be added to this hook as options. Special care needs to be taken to ensure the order of filters is always consistent so we can take advantage of SWR caching.
