const getData = async (url: string) => {
  const res = await fetch(url); // wait for fetch to resolve

  if (!res.ok) {
    throw new Error("Request was not successful!");
  }

  const data = await res.json(); // wait for JSON-parsing

  return data;
};

getData("http://www.bortakvall.se/api/v2/products");

console.log(getData);
