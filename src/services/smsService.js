import axios from "axios";
const url = "https://be-safetrakr.onrender.com/api/sms";

export const SendSms = (telNos, message, token) => {
  const promises = telNos.map((telNo) => {
    telNo = telNo.replace(/^0/g, "+44");

    const data = {
      to: telNo,
      body: message,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios
      .post(url, data, config)
      .then((response) => {
        // console.log("sms response: " + JSON.stringify(response));
      })
      .catch((error) => console.error("error: " + error));
  });
  return Promise.all(promises);
};
