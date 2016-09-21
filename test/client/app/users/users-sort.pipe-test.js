describe('user-sort pipe test', function () {
    var sortPipe;

    beforeEach(function () {
        sortPipe = new app.UserSortPipe();
    });

    it('should have the pipe`s name set to sort', function () {
        var annotations = Reflect.getMetadata('annotations', app.UserSortPipe)[0];

        expect(annotations.name).to.be.eql('userSort');
    });

    it('should sort users based on first name', function () {
        var user1 = {first: 'Karthikk', last: 'Dhandapani', active: true};
        var user2 = {first: 'Gaarthick', last: 'Ravichandran', active: true};

        var sorted = sortPipe.transform([user1,user2]);
        expect(sorted).to.be.eql([user2, user1]);
    });

    it('should sort users based on last name is first name is equal', function () {
        var user1 = {first: 'John', last: 'Diggle', active:true};
        var user2 = {first: 'John', last: 'Smoth', active:true};
        var user3 = {first: 'Andy', last: 'Diggle', active:true};

        var sorted = sortPipe.transform([user1, user2, user3]);
        expect(sorted).to.be.eql([user3, user1, user2]);
    });

    it('should not mutate the given input', function () {
        var user1 = {first: 'Karthikk', last: 'Dhandapani', active: true};
        var user2 = {first: 'Gaarthick', last: 'Ravichandran', active: true};

        var input=[ user1, user2];

        sortPipe.transform(input);
        expect(input[0]).to.be.eql(user1);
    });
})