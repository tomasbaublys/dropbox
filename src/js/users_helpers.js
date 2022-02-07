// CRUD = Create Read Update Delete

const API_URL = 'https://jsonplaceholder.typicode.com';

export function getUsersAsync() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fetch(`${API_URL}/users`);
      return resolve(data.json());
    } catch (error) {
      reject(error);
    }
  });
}

export function getUserAsync(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fetch(`${API_URL}/users/${id}`);
      return resolve(data.json());
    } catch (error) {
      reject(error);
    }
  });
}

// Read
export function getUsers() {
  return fetch(`${API_URL}/users`)
    .then(data => data.json());
}

export function getUser(id) {
  return fetch(`${API_URL}/users/${id}`)
    .then(data => data.json());
}

// Create
export function createPost(data) {
  return fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}

// Update
export function patchUser(id, data) {
  return fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}

// Delete
export function deletePost(id, data) {
  return fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}