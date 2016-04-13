var expect = require("chai").expect;
var Developer = require("../models/developer")

describe("Developer", function(){
    describe(".findByUsername()", function(){
        it ("should get any info from a developer by username", function(done){
            var dev = new Developer();
            dev.findByUsername("brenoc", function(data) {
                expect(data.name).to.equal("Breno Calazans");
                expect(data.price).to.equal(51);
                done();
            });
        });
    });
});