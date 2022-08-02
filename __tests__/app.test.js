const app = require("../app.js");
const db = require("../db/connection");
const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/")

beforeEach(() => {
    return seed(testData);
})

   
   afterAll(() => { db.end()});
   describe('Returns 404 for unknown endpoint', () => {
test('Returns 404', () => {
    return request(app)
    .get('/test')
    .expect(404)
})
   })


describe('GET api/topics', () => {
test('Returns a 200 status code', () => {
return request(app)
.get('/api/topics/')
.expect(200)

})

test('Returns an Array with a length of 3 as expected.', () => {
    return request(app)
    .get('/api/topics/')
    .expect(200)
    .then(({ body: {topics} }) => {
        expect(topics).toBeInstanceOf(Array)
        expect(topics).toHaveLength(3);
  
    })
   
    })

    test('Returns an object with a key of slug and a key of description', () => {
        return request(app)
        .get('/api/topics/')
        .expect(200)
        .then(({ body: {topics} }) => {
            topics.forEach((topic) => {
                expect(topic.slug).not.toBe(undefined)
                expect(topic.description).not.toBe(undefined)
            })
           
        })
        })
})
