module.exports = [
  { type: "doc", id: "api/operate/swagger-petstore-yaml" },
  {
    type: "category",
    label: "Pets",
    items: [
      {
        type: "doc",
        id: "api/operate/add-pet",
        label: "Add a new pet to the store",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/update-pet",
        label: "Update an existing pet",
        className: "api-method put",
      },
      {
        type: "doc",
        id: "api/operate/get-pet-by-id",
        label: "Find pet by ID",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/update-pet-with-form",
        label: "Updates a pet in the store with form data",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/delete-pet",
        label: "Deletes a pet",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "api/operate/upload-file",
        label: "uploads an image",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/find-pets-by-status",
        label: "Finds Pets by status",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/find-pets-by-tags",
        label: "Finds Pets by tags",
        className: "menu__list-item--deprecated api-method get",
      },
      {
        type: "doc",
        id: "api/operate/new-pet",
        label: "New pet",
        className: "api-method event",
      },
    ],
  },
  {
    type: "category",
    label: "Petstore Orders",
    items: [
      {
        type: "doc",
        id: "api/operate/get-inventory",
        label: "Returns pet inventories by status",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/place-order",
        label: "Place an order for a pet",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/get-order-by-id",
        label: "Find purchase order by ID",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/delete-order",
        label: "Delete purchase order by ID",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "api/operate/subscribe-to-the-store-events",
        label: "Subscribe to the Store events",
        className: "api-method post",
      },
    ],
  },
  {
    type: "category",
    label: "Users",
    items: [
      {
        type: "doc",
        id: "api/operate/create-user",
        label: "Create user",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/get-user-by-name",
        label: "Get user by user name",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/update-user",
        label: "Updated user",
        className: "api-method put",
      },
      {
        type: "doc",
        id: "api/operate/delete-user",
        label: "Delete user",
        className: "api-method delete",
      },
      {
        type: "doc",
        id: "api/operate/create-users-with-array-input",
        label: "Creates list of users with given input array",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/create-users-with-list-input",
        label: "Creates list of users with given input list",
        className: "api-method post",
      },
      {
        type: "doc",
        id: "api/operate/login-user",
        label: "Logs user into the system",
        className: "api-method get",
      },
      {
        type: "doc",
        id: "api/operate/logout-user",
        label: "Logs out current logged in user session",
        className: "api-method get",
      },
    ],
  },
];
