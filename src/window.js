window.getKeys = function (obj) {
    var keys = [];
    for (key in obj) {
        keys.push(key);
    }

    return keys;
};

window.isNumeric = function (input) {
    return (input - 0) == input && (input + '').replace(/^\s+|\s+$/g, "").length > 0;
};