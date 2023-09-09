import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [addr, setAddr] = useState();
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" rel="noreferrer">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  const revokeaccess = async () => {
    await contract.disallow(addr);
    setAddr(null);
  }
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <input
        type="text"
        placeholder="Enter Address for revoke access"
        className="address"
        value={addr}
        onChange={e => setAddr(e.target.value)}
      ></input>
      <button className="center share button" onClick={revokeaccess}>
        revoke
      </button>
    </>
  );
};
export default Display;