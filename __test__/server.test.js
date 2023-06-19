'use strict';

require('dotenv').config();
const { app } = require('../src/server');
const supertest = require('supertest');
const req = supertest(app);

const { db } = require('../src/models/index');


beforeAll(async () => {
    await db.sync();
})
  
  afterAll(async () => {
    await db.drop();
})

describe('Server test', () => {
    it('Handle the root path', async () => {
      const res = await req.get('/');
      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual('Welcome to Home page :)');
    })
})

describe('Page not Found', ()=>{
    it('Handle not foound page route', async ()=> {
        const res = await req.get('/about');
        expect(res.status).toEqual(404);
    });

    it('Handle not found page method', async ()=> {
        const res = await req.patch('/game');
        expect(res.status).toEqual(404);
    });
});

describe('server error', ()=>{
    it('Handle not foound page method', async ()=> {
        const res = await req.get('/intentionalError');
        expect(res.status).toEqual(500);
    });
});

describe('music endoints test', () => {
  it('Create a record using POST', async () => {
    const res = await req.post('/music').send({
        name: "Hello",
        author: "Adele"
    });
    const music = JSON.parse(res.text);
    expect(res.status).toBe(201);
    expect(music.name).toEqual('Hello');
    expect(music.author).toEqual('Adele');
  });

  it('Read a list of records using GET', async () => {
    const res = await req.get('/music');
    expect(res.status).toBe(200);
  })

  it('Read a record using GET', async () => {
    const res = await req.get('/music/2');
    expect(res.status).toBe(200);
  })

  it('Update a record using PUT', async () => {
    const res = await req.put('/music/1');
    expect(res.status).toBe(202);
  })

  it('Destroy a record using DELETE', async () => {
    const res = await req.delete('/music/2');
    expect(res.status).toBe(204);
  })

});


describe('game endoints test', () => {
    it('Create a record using POST', async () => {
      const res = await req.post('/game').send({
          name: "Halo",
          company: "Xbox"
      });
      const game = JSON.parse(res.text);
      expect(res.status).toBe(201);
      expect(game.name).toEqual('Halo');
      expect(game.company).toEqual('Xbox');
    });
  
    it('Read a list of records using GET', async () => {
      const res = await req.get('/game');
      expect(res.status).toBe(200);
    })
  
    it('Read a record using GET', async () => {
      const res = await req.get('/game/2');
      expect(res.status).toBe(200);
    })
  
    it('Update a record using PUT', async () => {
      const res = await req.put('/game/1');
      expect(res.status).toBe(202);
    })
  
    it('Destroy a record using DELETE', async () => {
      const res = await req.delete('/game/2');
      expect(res.status).toBe(204);
    })
  
  })