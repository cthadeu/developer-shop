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

    describe(".findRepositoriesByUsername()", function(){
        it ("should get all repositories from a developer by username", function(done){
             var dev = new Developer();
             dev.findRepositoriesByUsername("brenoc", function(data){
                 expect(data).to.be.not.empty;
                 done();
             });
        });
    });

    describe(".getDeveloperSkills()", function(){
       it("should get list of developer skills", function(done){
          var dev = new Developer();
           dev.getDeveloperSkills("brenoc", function(data){
              expect(data).to.be.not.empty;
              done();
           });
       });
    });
});