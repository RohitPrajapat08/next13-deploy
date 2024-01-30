export const fetch2 = async (api: string, body: any) => {
  // console.log(localStorage.getItem("token"));
  if (body) {
    let entries = Object.keys(body);
    let data = new FormData();
    for (let i = 0; i < entries.length; i++) {
      data.append(entries[i], body[entries[i]]);
    }
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("UserToken") || "",
      },
      body: data,
    });
    return await res.json();
  }
};

export const fetch3 = async (api: string, type: any) => {
  // console.log(localStorage.getItem("token"));
  const res = await fetch(api, {
    method: type,
    headers: {
      Authorization: localStorage.getItem("UserToken") || "",
    },
  });
  return await res.json();
};

export const fetch4 = async (api: string, body: any, header = {}) => {
  try {
    if (body) {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASEURL}/${api}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          ...header,
        },
      });
      return await res.json();
    }
  } catch (error) {
    return await error;
  }
};

export const apiGetFetch = async (api: string, type: any, header = {}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASEURL}/${api}`, {
      method: type,
      headers: {
        Authorization: localStorage.getItem("UserToken") || "",
      },
    });
    return await res.json();
  } catch (error) {
    return await error;
  }
};
