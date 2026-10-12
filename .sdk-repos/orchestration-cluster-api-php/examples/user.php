<?php

/**
 * Compilable usage examples for user-management operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateUser
/**
 * Create user.
 */
function create_user(CamundaClient $client, \Camunda\Orchestration\Api\Model\UserRequest $userRequest): void
{
    $client->createUser($userRequest);
}
// endregion CreateUser

// region SearchUsers
/**
 * Search users.
 */
function search_users(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\UserSearchQueryRequest $userSearchQueryRequest = null): void
{
    $client->searchUsers($userSearchQueryRequest);
}
// endregion SearchUsers

// region GetUser
/**
 * Get user.
 */
function get_user(CamundaClient $client, string $username): void
{
    $client->getUser($username);
}
// endregion GetUser

// region UpdateUser
/**
 * Update user.
 */
function update_user(CamundaClient $client, string $username, \Camunda\Orchestration\Api\Model\UserUpdateRequest $userUpdateRequest): void
{
    $client->updateUser($username, $userUpdateRequest);
}
// endregion UpdateUser

// region DeleteUser
/**
 * Delete user.
 */
function delete_user(CamundaClient $client, string $username): void
{
    $client->deleteUser($username);
}
// endregion DeleteUser
