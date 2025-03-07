const URL = 'https://travelcardserver20200516041039.azurewebsites.net';

export const sendData = async (order) => {
  let succes = {
    status: true,
    unique: true
  };

  await fetch(`${URL}/newOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order)
  }).then(response => {
    if (response.status != 200) {
      succes.status = false;
    }
    if (response.status === 205) {
      succes.status= false;
      succes.unique= false;
    }
  }).catch(err => {
    console.log(err)
    succes.status = false;
  });
  return succes;
}

export const sendApproval = async (approval) => {
  let succes = true;
  await fetch(`${URL}/approveOrder`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(approval)
  }).then(response =>{
    
    if (response.status != 200) {
    succes=false;
    }
  }).catch(err => {
    console.log(err)
    succes=false;
  });
  return succes;
}

export const checkOrders = async (ordersArray) => {
  let data = null;

  await fetch(`${URL}/checkOrder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ordersArray)
  }).then(async (response) => {
    if (response.status === 200) {
      console.log("DATA FROM CHECK");
      console.log(response);
    await response.json().then(json=>{
      console.log(json);
      data=  JSON.parse(JSON.stringify(json));
      }).catch(err=>{
        console.log(err);
      });
      
    }
  }).catch(err => {
      console.log(err)
      console.log(err);
    });
  return data;
}



export const getPrices = async () => {
  let data = null;

  await fetch(`${URL}/price`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.status === 200) {
    await response.json().then(json=>{
       data= JSON.parse(JSON.stringify(json));
      }).catch(err=>{
        console.log(err);
      });
    }
  }).catch(err => {
      console.log(err);
    });
  return data;
}

export const getInfo = async (ordersArray) => {
  let data = null;
  await fetch(`${URL}/info`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ordersArray)
  }).then(async (response) => {
    if (response.status === 200) {
      console.log("DATA FROM CHECK");
    await response.json().then(json=>{
      data=  JSON.parse(JSON.stringify(json));
      }).catch(err=>{
        console.log(err);
      });   
    }
  }).catch(err => {
      console.log(err);
    });
  return data;
}




