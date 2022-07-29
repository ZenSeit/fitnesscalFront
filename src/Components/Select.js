import React from "react";

export default function Select({ name, data, actionSelect,valueSelected }) {

  const selected= valueSelected ?? 0
  return (
    <select name={name} onChange={(e) => actionSelect(e.target.value)} value={selected} >
      {data.map((dat, idx) => {
        return (
          <option key={idx} value={idx} >
            {dat.name}
          </option>
        );
      })}
    </select>
  );
}
