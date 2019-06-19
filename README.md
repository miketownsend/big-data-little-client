# Big data, little client

## Todo:
- get render timer working
- crossfilter
- react-virtualised

- tidy up prepared-earlier statements
- prepare fetch statements for GZIP example
- open data in tab so that we can see data structure
- clean up hooks issues
- have another curried function within the mapping function
- use the profiler


# Talk
## 0. Fluidly
  - we help SME business owners sleep at night by cashflow forecasting using transactional data from general ledgers
  - our approach to providing a good UI for users on the front end?
    - *load all the data*
  - currently for a large organisation, we load ~100k data points in our main view allowing us to pivot
    - multiple views (pivot on account / customer / date)
    - balances per day
    - balances per month
    - per day balance chart
    - fast pagination
  - there are obviously some limitations
    - we have 2 levels of data aggregation out of our API so far, one for high level analyisis, one for detail
    - mobile
    - 

## 1. GZIP
  - chances are you're probably all using this anyway
  - more duplication in text = better GZIP'ing
    - json character data: >4x compression
    - json with random keys: ~2x compression
  - good explanation of GZIPing => https://2014.jsconf.eu/speakers/raul-fraile-how-gzip-compression-works.html

## 2. Processing data in JS
  - use date-fns if parsing dates instead of moment
  - take care with FP and currying
  - spread operator is faster than object.assign

## 3. Use reselect/memoize-one/memo/purecomponents for calculations
  - the efficiency of a view layer like react is all about filtering out unnecessary changes
  - common gotcha - mapping/filtering/reducing data sets and creating new arrays
  - instead use reselect or memoize-one
    - memoize-one => good for use within render component, needs to be initialized within each component
    - reselect => good for use in a connected component

## 4. Cool librarys for generating views on lots of data in the client:
  - [crossfilter](https://square.github.io/crossfilter/) - dimensional data visualisation
  - [react-virtualised](https://bvaughn.github.io/react-virtualized/#/components/Table) - render huge tables / views using virtualisation
  - [d3](https://d3js.org/) - make beautiful visualisations, also has a lot of data processing utilities
  - [rx.js](https://www.learnrxjs.io/) - js data streams - good for debouncing data out of websockets

## 5. best distributing processing? the clients browser
  - tensorflow js (just need to send your data science models to the clients!)
  - /s

# Running the example:

## Dependencies
- node
- yarn
- parcel

## Running

- start the server: `node server`, server available at http://localhost:3003
- start the client: `parcel client/index.html`, client available at http://localhost:1234  
