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

