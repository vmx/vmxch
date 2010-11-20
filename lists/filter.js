function(head, req) {
    send('{"rows":[\n');
    var filter = req.query.filter;
    var doc;

    while (row = getRow()) {
      doc = row.value;
      if (eval(filter)) {
          send(JSON.stringify(row.value) + '\n');
      }
    }
    send(']}\n');
}
