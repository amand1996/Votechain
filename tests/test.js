import chai from 'chai';
import chaiHttp from 'chai-http';
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

export const test = (server) => {

	describe('Test', function () {

		it('GET /', function (done) {
			chai.request(server)
				.get('/')
				.end(function (err, res) {
					res.should.have.status(200);
					done();
				});
		});

		it('GET /vote', function (done) {
			chai.request(server)
				.get('/vote')
				.end(function (err, res) {
					res.should.have.status(200);
					done();
				});
		});

		it('GET /register', function (done) {
			chai.request(server)
				.get('/register')
				.end(function (err, res) {
					res.should.have.status(200);
					done();
				});
		});

		it('GET /admin', function (done) {
			chai.request(server)
				.get('/admin')
				.end(function (err, res) {
					res.should.have.status(200);
					done();
				});
		});

		it('GET /admin/login', function (done) {
			chai.request(server)
				.get('/admin/login')
				.end(function (err, res) {
					res.should.have.status(200);
					done();
				});
		});

		it('GET /results', function (done) {
			chai.request(server)
				.get('/results')
				.end(function (err, res) {
					res.should.have.status(200);
					done();
				});
		});
	});

}