import React from "react";

export default function Select({ ky, name, data, actionSelect,valueSelected }) {

  const selected= valueSelected ?? 0
  return (
    <select key={ky} name={name} onChange={actionSelect} value={selected} id={name} >
      {data.map((dat, idx) => {
        return (
          <option key={idx} value={idx} >
            {dat[name]}
          </option>
        );
      })}
    </select>
  );
}
