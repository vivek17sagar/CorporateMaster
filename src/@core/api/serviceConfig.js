import axios from "axios";
// const api = require('api.json');
let apiData = {};
export function setAPIData(val) {
  apiData = val;
}
export function getAPIData() {
  return apiData;
}
function getDecryptedValue(str) {
  const formData = new FormData();
  formData.append("encryptedvalue", str);
  formData.append("userID", process.env.REACT_APP_ENC_USER_ID);
  formData.append("pwd", process.env.REACT_APP_ENC_USER_PWD);
  let promise = new Promise((res, rej) => {
    let flag = true;
    try {
      axios
        .post(`${getAPIData().url}/getDecrypted`, formData, {
          headers: {
            "Cache-Control": false,
            "eO2-Secret-Code": process.env.REACT_APP_EO2_SECRET_CODE,
            Accept: "application/json",
          },
        })
        .then((result) => {
          str = result.data.result.decryptionValue;
          res(str);
          flag = false;
        })
        .catch((err) => {
          // console.log('---failure')
          // console.error(err)
          flag = false;
          return res(str);
        });
    } catch {
      flag = false;
      res(str);
    }
    setTimeout(() => {
      if (flag) {
        res(str);
      }
    }, 10000);
  });
  return promise;
}

// Imp
export function parseEncryptedData(data) {
  let promise;
  if (Array.isArray(data)) {
    promise = Promise.all(
      data.map((_) => {
        return parseEncryptedData(_);
      })
    );
  } else if (typeof data === "object") {
    const arr = [];
    const parsedObj = {};

    for (let key in data) {
      // const a = parseEncryptedData(data[key]);
      // a.then(_ => {
      //     if (key.indexOf('_DE') >= 0) {
      //         key = key.substring(0, key.indexOf('_DE'))
      //     }
      //     parsedObj[key] = _;
      // });
      // arr.push(a);
      const isEncryptedValue = key.indexOf("_DE") >= 0;
      const valuePromsified = isEncryptedValue
        ? getDecryptedValue(data[key])
        : parseEncryptedData(data[key]);
      // const valuePromsified =  parseEncryptedData(data[key]);
      if (isEncryptedValue) {
        key = key.substring(0, key.indexOf("_DE"));
      }
      arr.push(valuePromsified);
      valuePromsified.then((val) => {
        // console.log('===error3');
        parsedObj[key] = val;
      }),
        (val) => {
          // console.log('error2');
          return (parsedObj[key] = val);
        };
    }
    promise = Promise.all(arr)
      .then((_) => {
        // console.log('e4');
        return Promise.resolve(parsedObj);
      })
      .catch((_) => {
        // console.log('e5');
        return Promise.reject(parsedObj);
      });
  } else if (typeof data === "boolean" || typeof data === "number") {
    return Promise.resolve(data);
  } else if (typeof data === "string") {
    return Promise.resolve(data);
  }
  return promise;
}

export const apiConfig = {
  get: (path) => {
    // console.log('get call', path);
    return axios.get(`${getAPIData().url}${path}`).then((response) => {
      return parseEncryptedData(response.data);
    });
  },
  post: (path, form, header, localStorageMap, options) => {
    // console.log('post call', path);
    const formData = new FormData();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!options || !options.ignoreDefaults) {
      formData.append("userID", userData.userID);
      formData.append("corporateID", userData.corporateId);
      formData.append("tokenID", userData.tokenID);
    }

    if (localStorageMap) {
      for (const key in localStorageMap) {
        formData.append(key, userData[localStorageMap[key]]);
      }
    }
    for (const key in form) {
      formData.append(key, form[key]);
    }
    // form.append('userID', )
    return axios
      .post(`${getAPIData().url}${path}`, formData, {
        headers: {
          "Cache-Control": false,
          "eO2-Secret-Code": process.env.REACT_APP_EO2_SECRET_CODE,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (options && options.returnFull) {
          return parseEncryptedData(response.data.result).then((result) => {
            // debugger;
            return { ...response.data, result };
          });
        } else {
          if (response?.data?.totalPages) {
            return [
              parseEncryptedData(response.data.result),
              response?.data?.totalPages,
            ];
          } else {
            return parseEncryptedData(response.data.result);
          }
        }
      })
      .catch((_) => {
        return Promise.reject(_);
      });
  },
};
