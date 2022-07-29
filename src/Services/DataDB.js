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