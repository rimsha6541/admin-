import axios from "axios";
const userObj = JSON.parse(localStorage.getItem('user'));
const user_id = userObj ? userObj.id : null;

export const sellerSignup = async (name, email, pass, contact) => {
  let data = JSON.stringify({
    username: name,
    password: pass,
    phone_no: contact,
    email: email,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/seller_signup/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllUsers = async () => {
  let res;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/all_users/",
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
   
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const getAllCustomers = async () => {
  let res;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/all_users/",
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const getAllProducts = async () => {
  let res;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/products/product_display/",
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const getAllOrders = async () => {
  let res;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/order_details/order/",
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};



export const UpdateOrderStatus = async (id,status) => {
  
  let data = JSON.stringify({
    o_id: id,
    o_status: status,
  });
  let res;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/order_details/update_status/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response)
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const deleteOrder = async (id) => {
  
  let data = JSON.stringify({
    order_id: id,
  });
  let res;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/order_details/delete_order/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      alert(response.data.msg)
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const getAdminDetail = async () => {
  let res;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/admin/"+user_id+"/",
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
export const UpdateAdminDetail = async (admin) => {
  
  let data = JSON.stringify({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    phone_no: admin.phone_no,
  });
  let res;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/admin/"+user_id+"/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(response)
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
export const AddProductApi = async (product,user_id) => {
  
  const formdata = new FormData();

  // Append user data
  formdata.append('user_data', user_id);

  // Append common product attributes
  // console.log(product.ac_capacity)
  formdata.append('p_name', product.p_name);
  formdata.append('p_image', product.p_image);
  formdata.append('p_brand', product.p_brand);
  formdata.append('p_status', product.p_status);
  formdata.append('p_des', product.p_des);
  formdata.append('p_price', product.p_price);
  formdata.append('disc_price', product.disc_price);
  formdata.append('discount', product.discount);
  formdata.append('category', product.category);
  // formdata.append('sub_category', product.sub_category);

  // Append attributes based on the category
  formdata.append('mobile_processor', product.mobile_processor);
  formdata.append('mobile_battery', product.mobile_battery);
  formdata.append('mobile_memory', product.mobile_memory);
  formdata.append('mobile_display', product.mobile_display);
  formdata.append('mobile_camera', product.mobile_camera);
  formdata.append('laptop_processor', product.laptop_processor);
  formdata.append('laptop_battery', product.laptop_battery);
  formdata.append('laptop_memory', product.laptop_memory);
  formdata.append('laptop_display', product.laptop_display);
  formdata.append('laptop_generation', product.laptop_generation);
  formdata.append('lcd_display', product.lcd_display);
  formdata.append('lcd_power_consumption', product.lcd_power_consumption);
  formdata.append('lcd_audio', product.lcd_audio);
  formdata.append('lcd_chip', product.lcd_chip);
  formdata.append('ac_capacity', product.ac_capacity);
  formdata.append('ac_type', product.ac_type);
  formdata.append('ac_inverter', product.ac_inverter);
  formdata.append('ac_warranty', product.ac_warranty);
  formdata.append('ac_energy_efficiency', product.ac_energy_efficiency);

  // Append other common attributes
  formdata.append('color', product.color);
  formdata.append('quantity', product.quantity);

  // let data = JSON.stringify(product);
  let res;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/products/add_product/",
    headers: {
      'Content-Type': 'multipart/form-data', // Important header for file upload
    },
    data: formdata,
  };

  await axios
    .request(config)
    .then((response) => {
      alert(response.data.msg)
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const getDashboard = async () => {
  let res;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/dashboard/"+user_id,
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const getCategory = async () => {
  let res;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/products/add_category/",
    headers: {},
  };

  await axios
    .request(config)
    .then((response) => {
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
export const deleteCustomer = async (id) => {
    
  let data = JSON.stringify({
    id: id,
  });
  let res;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/user/delete/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      alert(response.data.msg)
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

export const deleteProduct = async (id) => {
  
  let data = JSON.stringify({
    p_id: id,
  });
  let res;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://127.0.0.1:8000/products/delete_product/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      alert(response.data.msg)
      res = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};