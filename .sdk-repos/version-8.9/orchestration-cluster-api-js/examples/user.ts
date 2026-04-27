// Compilable usage examples for user management operations.
// These examples are type-checked during build to guard against API regressions.

import { createCamundaClient, type Username } from '@camunda8/orchestration-cluster-api';

//#region CreateUser
async function createUserExample(username: Username) {
  const camunda = createCamundaClient();

  const result = await camunda.createUser({
    username,
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'secure-password-123',
  });

  console.log(`Created user: ${result.username}`);
}
//#endregion CreateUser

//#region CreateAdminUser
async function createAdminUserExample(username: Username) {
  const camunda = createCamundaClient();

  const result = await camunda.createAdminUser({
    username,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin-password-123',
  });

  console.log(`Created admin user: ${result.username}`);
}
//#endregion CreateAdminUser

//#region GetUser
async function getUserExample(username: Username) {
  const camunda = createCamundaClient();

  const user = await camunda.getUser({ username }, { consistency: { waitUpToMs: 5000 } });

  console.log(`User: ${user.name} (${user.email})`);
}
//#endregion GetUser

//#region SearchUsers
async function searchUsersExample() {
  const camunda = createCamundaClient();

  const result = await camunda.searchUsers(
    {
      filter: {},
      page: { limit: 10 },
    },
    { consistency: { waitUpToMs: 5000 } }
  );

  for (const user of result.items ?? []) {
    console.log(`${user.username}: ${user.name}`);
  }
}
//#endregion SearchUsers

//#region UpdateUser
async function updateUserExample(username: Username) {
  const camunda = createCamundaClient();

  await camunda.updateUser({
    username,
    name: 'Alice Jones',
    email: 'alice.jones@example.com',
  });
}
//#endregion UpdateUser

//#region DeleteUser
async function deleteUserExample(username: Username) {
  const camunda = createCamundaClient();

  await camunda.deleteUser({ username });
}
//#endregion DeleteUser

// Suppress "declared but never read"
void createUserExample;
void createAdminUserExample;
void getUserExample;
void searchUsersExample;
void updateUserExample;
void deleteUserExample;

// Suppress "declared but never read"
void createUserExample;
void createAdminUserExample;
void getUserExample;
void searchUsersExample;
void updateUserExample;
void deleteUserExample;
