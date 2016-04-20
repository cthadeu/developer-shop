var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8080");


describe("DevShop", function(){
    it("should list developers from org vtex", function(done){
       server
           .get("/developer")
           .expect("Content-type",/json/)
           .expect(200)
           .end(function(err,res){
               res.body.should.not.be.empty();
               done();
           });
    });

    it("should add developer to cart", function(done){
       server
           .post("/cart")
           .send({
               baseHour: 1,
               id: 297147,
               login: 'rodrigomuniz',
               name: '',
               photo: 'https://avatars.githubusercontent.com/u/297147?v=3',
               price: 0,
               profile: ''
           })
           .expect("Content-type",/json/)
           .expect(200)
           .end(function(err, res){
               res.body.session.should.have.properties("items");
               res.body.session.items.should.not.be.empty();
               done();
        });
    });

    it("should add $10 discount cupom SHIPIT", function(done){
       server
           .post("/cupom/check")
           .send({cupom : "SHIPIT"})
           .expect("Content-type",/json/)
           .expect(200)
           .end(function(err,res){
               res.body.discount.should.be.equal(10);
               done();
           });
    });

    it("should checkout cart", function(done){
       server
           .post("/checkout")
           .send({})
           .expect("Content-type",/json/)
           .expect(200)
           .end(function(err,res){
               res.body.session.should.have.properties("items");
               res.body.session.items.should.not.be.empty();
               res.body.discount.should.be.equal(10);
               done();
           })
    });
})