import { getUsersAsync, getUserAsync, patchUser} from './users_helpers.js';

let data = [];


getUsersAsync().then((res) => {
  data = res;
  renderUsersData(res)
});


function renderUsersData(arr) {
  document.getElementById('users').innerHTML = '';
  const table = document.getElementById('users');
  arr.forEach(element => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const icon1 = document.createElement('i');
    const icon2 = document.createElement('i');
    const icon3 = document.createElement('i');
    icon1.setAttribute('class', 'far fa-eye')
    icon2.setAttribute('class', 'far fa-edit')
    icon3.setAttribute('class', 'far fa-trash-alt')
    icon1.addEventListener('click', function () {
      document.getElementById('popup').style.display = 'block';
      userEvent('view', element.id);
    })
    icon2.addEventListener('click', function () {
      document.getElementById('popup').style.display = 'block';
      userEvent('edit', element.id);
    })
    icon3.addEventListener('click', function () {
      console.log('trash', element.id)
    })
    td1.innerHTML = element.id;
    td2.innerHTML = element.name;
    td3.innerHTML= element.username;
    td4.innerHTML = element.email;
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    td5.appendChild(icon1);
    td5.appendChild(icon2);
    td5.appendChild(icon3);
  });  
}



function userEvent(type, id) {
  switch (type) {
    case 'view': 
      getUserAsync(id)
      .then(res => renderUserData(res))
    break;
    case 'edit':
      getUserAsync(id)
        .then(res => updateUserData(res))
      break;
    case 'delete':
      break;
    default:
      break;
  }
}


function renderUserData({
  id,
  name,
  username,
  email,
  phone,
  website,
  address: {
    street,
    suite,
    city,
    zipcode,
  }, 
  company: {
    name: companyName,
    catchPhrase,
    bs,
  } 
}) {

  document.getElementById('user-data').innerHTML = `
  <h1>Personal information</h1>
  <table>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Website</th>
    </tr>
    <tr>
      <td>${id}</td>
      <td>${name}</td>
      <td>${username}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${website}</td>
    </tr>
  </table>
  <h1>Address information</h1>
  <table>
    <tr>
      <th>Suite</th>
      <th>Street</th>
      <th>Zipcode</th>
      <th>City</th>
    </tr>
    <tr>
      <td>${suite}</td>
      <td>${street}</td>
      <td>${zipcode}</td>
      <td>${city}</td>
    </tr>
  </table>
  <h1>Company information</h1>
  <table>
    <tr>
      <th>Comapny Name</th>
      <th>Catch Phrase</th>
      <th>BS</th>
    </tr>
    <tr>
      <td>${companyName}</td>
      <td>${catchPhrase}</td>
      <td>${bs}</td>
    </tr>
  </table>`;
}


function updateUserData({
  id,
  name,
  username,
  email,
  phone,
  website,
  address: {
    street,
    suite,
    city,
    zipcode,
  },
  company: {
    name: companyName,
    catchPhrase,
    bs,
  }  

}) {
  document.getElementById('user-data').innerHTML = `
  <h1>Personal information</h1>
  <table>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Website</th>
    </tr>
    <tr>
      <td id="user-id">${id}</td>
      <td><input id="user-name" type="text" value="${name}" /></td>
      <td><input id="user-username" type="text" value="${username}" /></td>
      <td><input id="user-email" type="email" value="${email}" /></td>
      <td><input id="user-phone" type="text" value="${phone}" /></td>
      <td><input id="user-website" type="text" value="${website}" /></td>
    </tr>
  </table>
  <h1>Address information</h1>
  <table>
    <tr>
      <th>Suite</th>
      <th>Street</th>
      <th>Zipcode</th>
      <th>City</th>
    </tr>
    <tr>
      <td><input id="address-suite" type="text" value="${suite}" /></td>
      <td><input id="address-street" type="email" value="${street}" /></td>
      <td><input id="address-zipcode" type="text" value="${zipcode}" /></td>
      <td><input id="address-city" type="text" value="${city}" /></td>
    </tr>
  </table>
  <h1>Company information</h1>
  <table>
    <tr>
      <th>Comapny Name</th>
      <th>Catch Phrase</th>
      <th>BS</th>
    </tr>
    <tr>
      <td><input id="company-name" type="text" value="${companyName}" /></td>
      <td><input id="company-catchPhrase" type="email" value="${catchPhrase}" /></td>
      <td><input id="company-bs" type="text" value="${bs}" /></td>
    </tr>
  </table>
  <button id="btn" class="btn">Update</button>`;

document.getElementById('btn').addEventListener('click', function () {

    const newData = {
      id: document.getElementById('user-id').value,
      name: document.getElementById('user-name').value,
      username: document.getElementById('user-username').value,
      email: document.getElementById('user-email').value,
      phone: document.getElementById('user-phone').value,
      website: document.getElementById('user-website').value,
      suite: document.getElementById('address-suite').value,
      street: document.getElementById('address-street').value,
      zipcode: document.getElementById('address-zipcode').value,
      city: document.getElementById('address-city').value,
      companyName: document.getElementById('company-name').value,
      catchPhrase: document.getElementById('company-catchPhrase').value,
      bs: document.getElementById('company-bs').value,     
  };

  patchUser(id, newData).then((res) => {
    const updateData = data.map(item => item.id === res.id ? res : item);
    renderUsersData(updateData)
    console.log(updateData)
  });

  document.getElementById('popup').style.display = 'none';
  
  })                                                  
}

document.getElementById('closePopup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('user-data').innerHTML = '';
})


