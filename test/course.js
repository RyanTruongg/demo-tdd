process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Courses", () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });
  /*
   * Test the /GET route
   */
  describe("/GET courses", () => {
    it("it should GET all the courses", (done) => {
      chai
        .request(server)
        .get("/courses")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(7);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST courses", () => {
    it("it should POST a course", (done) => {
      let course = {
        name: "Bug",
        status: "detected",
      };
      chai
        .request(server)
        .post("/courses")
        .send(course)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Course successfully added!");
          res.body.course.should.have.property("id");
          res.body.course.should.have.property("name").eql(course.name);
          res.body.course.should.have.property("status").eql(course.status);
          done();
        });
    });
    it("it should not POST a book without status field", (done) => {
      let course = {
        name: "Bug",
      };
      chai
        .request(server)
        .post("/courses")
        .send(course)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Course is invalid!");
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe("/GET/:id courses", () => {
    it("it should GET a course by the given id", (done) => {
      // TODO add a model to db then get that id to take this test
      let id = 1;
      chai
        .request(server)
        .get("/courses/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("course");
          res.body.course.should.have.property("id").eql(id);
          res.body.course.should.have.property("name");
          res.body.course.should.have.property("status");
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe("/PUT/:id courses", () => {
    it("it should UPDATE a course given the id", (done) => {
      // TODO add a model to db then get that id to take this test
      let id = 1;
      chai
        .request(server)
        .put("/courses/" + id)
        .send({
          name: "Bug",
          status: "fixed",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("course");
          res.body.course.should.have.property("name").eql("Bug");
          res.body.course.should.have.property("status").eql("fixed");
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id courses", () => {
    it("it should DELETE a course given the id", (done) => {
      // TODO add a model to db then get that id to take this test
      let id = 1;
      chai
        .request(server)
        .delete("/courses/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Course successfully deleted!");
          res.body.should.have.property("result");
          res.body.result.should.have.property("roweffected").eql(1);
          done();
        });
    });
  });
});
