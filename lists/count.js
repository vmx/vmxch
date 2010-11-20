function(head, req) {
    var count = 0;

    while (getRow()) {
        count++;
    }
    send('{"count": ' + count + '}\n');
}
