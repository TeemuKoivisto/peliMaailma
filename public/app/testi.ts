interface Rajapinta {
	name: string;
	price: number;
	workBitch(value: string): void; 
}

var e: Rajapinta = {
	name: "hei",
	price: 666,
	workBitch: function(stringini) {
		console.log("heh heh");
	}
}

class Customer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}