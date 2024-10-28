// src/auth/auth0Client.ts

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

var access_token: string | null = null;

const getAuthToken = async (): Promise<string> => {

  const m2mDomain = process.env.M2M_URL;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const audience = process.env.AUDIENCE;

  const response = await axios.post(`${m2mDomain}`, {
    client_id: clientId,
    client_secret: clientSecret,
    audience: audience,
    grant_type: 'client_credentials',
  },{
    headers: {
      'Content-Type': 'application/json', // Set Content-Type to application/json
    }
    });

  return response.data.access_token;
};

const retrieveToken = async() => {
    if (!access_token) {
        access_token = await getAuthToken();
    }
    return access_token
}

export default retrieveToken;
