import supertest from 'supertest';
import { expect } from 'chai';
import oauth2Credentials  from './constants/credentials';
import productInfo from './constants/productData';

const requestAkeneoUrl = supertest(`${akeneoBaseURL}/api/rest/v1/`);
const requestAccess = supertest(`${akeneoBaseURL}/api/oauth/v1/`);

describe.skip('Test Akeneo API creation', () => {
    let accessToken;
    it('Post access token', async () => {      
        const oauth2Data = oauth2Credentials;
        const postAccessToken = await requestAccess.post('token').send(oauth2Data);
        accessToken = postAccessToken.body.access_token;  
    })

    it('Post poduct', async () => {       
        const productData = productInfo;
        const postProd = await requestAkeneoUrl.post('products').set('Authorization', `Bearer ${accessToken}`).send(productData);
        expect(postProd.statusCode).to.eq(201);      
    })
})