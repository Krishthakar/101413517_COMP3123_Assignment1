const request = require('supertest');
const app = require('../app'); // Adjust to your app path
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

// Example User Data for Testing
const testUser = {
  username: "johndoe",
  email: "johndoe@example.com",
  password: "password123"
};

const testEmployee = {
  first_name: "Alice",
  last_name: "Johnson",
  email: "alice.johnson@example.com",
  position: "Designer",
  salary: 85000,
  date_of_joining: "2023-08-10",
  department: "Design"
};

describe('User and Employee API Endpoints', function() {
  
  // Clean up the database after tests
  after(async function() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  // Test POST /api/v1/user/signup
  it('should create a new user (POST /api/v1/user/signup)', function(done) {
    request(app)
      .post('/api/v1/user/signup')
      .send(testUser)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'User created successfully.');
        expect(res.body).to.have.property('user_id');
        done();
      });
  });

  // Test POST /api/v1/user/login
  it('should login the user (POST /api/v1/user/login)', function(done) {
    request(app)
      .post('/api/v1/user/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Login successful');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  // Test POST /api/v1/emp/employees (Create New Employee)
  it('should create a new employee (POST /api/v1/emp/employees)', function(done) {
    request(app)
      .post('/api/v1/emp/employees')
      .send(testEmployee)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Employee created successfully.');
        expect(res.body).to.have.property('employee_id');
        done();
      });
  });

  // Test GET /api/v1/emp/employees (Get All Employees)
  it('should get a list of all employees (GET /api/v1/emp/employees)', function(done) {
    request(app)
      .get('/api/v1/emp/employees')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('first_name', 'Alice');
        done();
      });
  });
});
