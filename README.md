# Big data, little client

## Todo:

- tidy up prepared-earlier statements
- prepare fetch statements for GZIP example
- open data in tab so that we can see data structure

# Common Frontend Performance Issues:

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
- great snippet for understanding what props changed: https://gist.github.com/sqren/780ae8ca1e2cf59050b0695c901b5aa3

## 4. Cool libraries for generating views / processing lots of data in the client:

- [date-fns](https://date-fns.org/) - fast date processing
- [crossfilter](https://square.github.io/crossfilter/) - dimensional data visualisation
- [react-virtualised](https://bvaughn.github.io/react-virtualized/#/components/Table) - render huge tables / views using virtualisation
- [d3](https://d3js.org/) - make beautiful visualisations, also has a lot of data processing utilities
- [rx.js](https://www.learnrxjs.io/) - js data streams - good for debouncing data out of websockets

## 5. Want free distributing processing?

- Use the clients browser!

# Running the example:

## Dependencies

- node
- yarn

## Running

- install dependencies `yarn install`
- start the server: `yarn server`, server available at http://localhost:3003
- start the client: `yarn client`, client available at http://localhost:1234
