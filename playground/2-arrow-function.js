const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Kyle', 'Alicea'],
    printGuestParty() {
        // Set a reference to the scope of printGuestParty
        // const self = this;

        // or use an arrow function
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
        });
    }
}

event.printGuestParty();