var e = {
    name: "hei",
    price: 666,
    workBitch: function (stringini) {
        console.log("heh heh");
    }
};
var Customer = (function () {
    function Customer(name) {
        this.name = name;
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    return Customer;
})();
