import supertest from 'supertest';
import { expect } from 'chai';
import { config } from '../config/edge/config.mjs';
import { credentials }  from '../constants/credentials.mjs';
import { product } from '../constants/productData.mjs';

const requestAkeneoUrl = supertest(`${config.akeneoBaseUrl}/api/rest/v1/`);
const requestAccess = supertest(`${config.akeneoBaseUrl}/api/oauth/v1/`);

describe.skip('Test Akeneo API creation', () => {
    let accessToken;
    it('Post access token', async () => {      
        const oauth2Data = credentials.oauth2;
        const postAccessToken = await requestAccess.post('token').send(oauth2Data);
        accessToken = postAccessToken.body.access_token;  
    })

    it('Post poduct', async () => {       
        const productData = product.info;
        const postProd = await requestAkeneoUrl.post('products').set('Authorization', `Bearer ${accessToken}`).send(productData);
        expect(postProd.statusCode).to.eq(201);      
    })
})