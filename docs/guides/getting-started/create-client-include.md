---
---

To create a new client you have to navigate into the API tab:

![cluster-details](./img/cluster-detail-clients.png)

Click **Create New Client** to create a new client and name your client accordingly. Select **Zeebe** so the newly created client can access your Zeebe instance.

![create-client](./img/cluster-details-create-client.png)

Make sure you keep the generated client credentials in a safe place - the **Client Secret** will not be shown again. For your convenience, you can also download the client information to your computer.

![created-client](./img/cluster-details-created-client.png)

The downloaded file contains all necessary information to later on communicate with your zeebe instance:

- `ZEEBE_ADDRESS`: Address where your cluster can be reached.
- `ZEEBE_AUTHORITY`: TODO
- `ZEEBE_CLIENT_ID` and `ZEEBE_CLIENT_SECRET`: Credentials to request a new access token.
- `ZEEBE_AUTHORIZATION_SERVER_URL`: A new token can be requested at this address, using the credentials.
