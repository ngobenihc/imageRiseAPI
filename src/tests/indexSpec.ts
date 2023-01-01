
import supertest from 'supertest';
import app from '../server/server';

const request = supertest(app);

describe('test image processor', () => {
  it('checks front-end page', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  
  it('checks for missing query parameters', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(400);
  });


  it('checks for invalid image dimension parameters', async () => {
    const response = await request.get('/image?f=encenadaport&x=jpeg&w=w&h=h');
    expect(response.status).toBe(400);
  });


  it('checks for unknown image asset', async () => {
    const response = await request.get('/image?f=unknown&x=PNG&w=100&h=100');
    expect(response.status).toBe(404);
  });

  it('gets resized image', async () => {
    const response = await request.get(
      '/image?f=ana&x=jpeg&w=100&h=100'
    );

    expect(response.status).toBe(200);
  });

  it('gets resized image with specified image format', async () => {
    const response = await request.get('/image?f=ana&x=jpeg&w=100&h=100');
    expect(response.status).toBe(200);
  });
});


