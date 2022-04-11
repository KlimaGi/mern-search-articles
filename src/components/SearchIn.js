import React from "react";

export const SearchIn = ({ onClickSearchInSet }) => {
  const searchIn = [
    { key: "Title" },
    { key: "Description" },
    { key: "Content" },
  ];

  const onClickSearchIn = (event) => {
    const chosenName = searchIn.find((el) => event.target.value === el.key).key;
    onClickSearchInSet(chosenName.toLowerCase());
  };

  return (
    <div>
      <select
        className="form-select text-color mx-2 input-back"
        onChange={onClickSearchIn}
      >
        <option className="text-color">Choose search in </option>
        {searchIn.map((choosen) => {
          return <option key={choosen.key}>{choosen.key}</option>;
        })}
      </select>
    </div>
  );
};
