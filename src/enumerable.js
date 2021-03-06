var Enumerable = require('')
Array.prototype.asEnumerable = function () {
    var enumerable = Enumerable.from(this);
    enumerable.remove = remove.bind(this);
    enumerable.removeAll = removeAll.bind(this);
    return enumerable;
};

function remove(item) {
    var i = this.indexOf(item);
    this.splice(i, 1);
}

function removeAll() {
    var self = this;

    while (self.length != 0) {
        self.shift();
    }

    return this;
}

window.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

