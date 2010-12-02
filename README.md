vmx's Helper Functions for CouchDB
==================================

This is a small CouchApp that contains some functions for CouchDB that might
be useful for others as well.


views
-----

### all ###

A simple map function that returns all documents. It's like _all_docs, but
you can apply list functions to it

Example:

    $ curl -X GET 'http://localhost:5984/vmxch/_design/vmxch/_view/all'
    {"total_rows":3,"offset":0,"rows":[
    {"id":"doc1","key":null,"value":{"_id":"doc1","_rev":"1-fcc4a130df1a91f981a80bed05e5d2ab","color":"blue"}},
    {"id":"doc2","key":null,"value":{"_id":"doc2","_rev":"1-5f9b73300433277490f800eae6fd321d","color":"red"}},
    {"id":"doc3","key":null,"value":{"_id":"doc3","_rev":"1-5660e74843228d3f73f7f3ad7c56efcf","color":"green"}}
    ]}


lists
-----

### count.js ###

Returns the number of items within the result, instead of the result itself.

Examples:

    $ curl -X GET 'http://localhost:5984/vmxch/_design/vmxch/_list/count/all'
    {"count": 3}

    $ curl -X GET 'http://localhost:5984/vmxch/_design/vmxch/_list/count/all?limit=1'
    {"count": 1}

### filter.js ###

**WARNING**: This is really a hack and potentially insecure, **don't** use it in
production.

You can filter dynamically on attributes in a document. The value you pass in
with the filter parameter get `eval()`ed in the if statement.

Examples:

    $ curl -X GET 'http://localhost:5984/vmxch/_design/vmxch/_list/filter/all?filter=doc.color=="blue"'
    {"rows":[
    {"_id":"doc1","_rev":"1-fcc4a130df1a91f981a80bed05e5d2ab","color":"blue"}
    ]}

    $ curl -X GET 'http://localhost:5984/vmxch/_design/vmxch/_list/filter/all?filter=doc.color=="blue"||doc.color=="red"'
    {"rows":[
    {"_id":"doc1","_rev":"1-fcc4a130df1a91f981a80bed05e5d2ab","color":"blue"}
    {"_id":"doc2","_rev":"1-5f9b73300433277490f800eae6fd321d","color":"red"}
    ]}

### geojson.js ###

This function outputs a GeoJSON FeatureCollection (compatible with
OpenLayers). The geometry is stored in the `geometry` property, all
other properties in the `properties` property.

Examples:

    $ curl -X PUT -d '{"type":"Feature", "color":"orange" ,"geometry":{"type":"Point","coordinates":[11.395,48.949444]}}' 'http://localhost:5984/vmxch/myfeature'
    {"ok":true,"id":"myfeature","rev":"1-2eeb1e5eee6c8e7507b671aa7d5b0654"}

    $ curl -X GET 'http://localhost:5984/vmxch/_design/vmxch/_list/geojson/all'
    {"type": "FeatureCollection", "features":[{"type": "Feature", "geometry": {"type":"Point","coordinates":[11.395,48.949444]}, "properties": {"_id":"myfeature","_rev":"1-2eeb1e5eee6c8e7507b671aa7d5b0654","type":"Feature","color":"orange"}}
