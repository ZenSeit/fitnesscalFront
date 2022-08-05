export const getFood = async () => {
    const data = await fetch("http://localhost:8080/api/getFood/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await data.json();
    return await json;
  };

  export const getRelFood = async (idus,id) => {
    const data = await fetch(
      `http://localhost:8080/api/getOfooduser/${idus}?idRel=${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await data.json();
  };


  export const getFoodId = async (idus,id) => {
    const data = await fetch(
      `http://localhost:8080/api/getFood/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await data.json();
  };


  export const updateFoodId = async (updateFood) => {
    const data = await fetch(
      `http://localhost:8080/api/updateFood/${updateFood.id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updateFood
        }),
      }
    );
    return await data.text();
  };

  export const deleteFoodId = async (id) => {
    const data = await fetch(
      `http://localhost:8080/api/deleteFood/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await data.text();
  };

  export const RegisterUser = async(us)=>{
    const data = await fetch(
      `http://localhost:8080/api/registerUser`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...us
        }),
      }
    );
    return await data.text();
  }

  export const deletePhotoUser = async(id)=>{
    const data = await fetch(
      `http://localhost:8080/api/deleteImage/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await data.text();
  }

  export const updateUser = async(id,dataUpdate) =>{
    const data = await fetch(
      `http://localhost:8080/api/updateUser/${id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dataUpdate
        }),
      }
    );
    return await data.text();
  }


