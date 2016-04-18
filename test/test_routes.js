var chai = require("chai");
var chaiHttp = require('chai-http');
var expect = chai.expect();
var should = chai.should();
var server = require("../server");

chai.use(chaiHttp);

describe("DevShop", function () {
    it("should list all developers from org vtex", function () {
        chai.request(server)
            .get("/developer")
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).should.be.json;
                expect(res.body).should.be.a('array');
                done();
            });
    });

    it("should get developer by username", function () {
        chai.request(server)
            .get("/developer/brenoc")
            .end(function (err, res) {
                expect(err).to.ne.null;
                expect(res.body).to.be.not.empty;
                done();
            });
    });

    it("should add developer to cart", function(){
        chai.request(server)
            .post("/cart")
            .send({ id: '996884',
                login: 'aabreur',
                photo: 'https://avatars.githubusercontent.com/u/996884?v=3',
                name: 'Alexandre Abreu',
                price: '1',
                profile: '' })
            .end(function(err, res){
                expect(err).to.be.nul;
                expect(res).should.have.status(200);
                expect(res.body.session).should.have.property('items');
                done();
            });
    });

    it("should get cart state", function(){
        chai.request(server)
            .get("/cart-state")
            .end(function(err, res){
               expect(err).to.be.null;
               expect(res.body.session).should.have.property("items");
                done();
            });
    });
});