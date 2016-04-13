var expect = require("chai").expect;
var Organization = require("../models/organization")

describe("Organization", function(){
    describe(".listMembers()", function(){
        it ("should list members from oganization", function(done){
            var org = new Organization("vtex");
            org.listMembers(function(data) {
                expect(data).to.have.length.of.at.least(1);
                done();
            });

        })
    });
});