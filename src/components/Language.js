import React from "react";

export const Language = ({ onClickLanguage }) => {
  const languages = [
    { key: "Arabic", name: "ar" },
    { key: "German", name: "de" },
    { key: "Greek", name: "el" },
    { key: "English", name: "en" },
    { key: "Spanish", name: "es" },
    { key: "French", name: "fr" },
    { key: "Hebrew", name: "he" },
    { key: "Hindi", name: "hi" },
    { key: "Italian", name: "it" },
    { key: "Japanese", name: "ja" },
    { key: "Malayalam", name: "ml" },
    { key: "Marathi", name: "mr" },
    { key: "Dutch", name: "nl" },
    { key: "Norwegian", name: "no" },
    { key: "Portuguese", name: "pt" },
    { key: "Romanian", name: "ro" },
    { key: "Russian", name: "ru" },
    { key: "Swedish", name: "sv" },
    { key: "Tamil", name: "ta" },
    { key: "Telugu", name: "te" },
    { key: "Ukrainian", name: "uk" },
    { key: "Chinese", name: "zh" },
  ];

  const onClickLang = (event) => {
    const langName = languages.find((el) => event.target.value === el.key).name;

    onClickLanguage(langName);
  };

  return (
    <div>
      <select
        className="form-select text-color mx-2 input-back"
        onChange={onClickLang}
      >
        <option className="text-color">Select Language</option>
        {languages.map((lang) => {
          return <option key={lang.key}>{lang.key}</option>;
        })}
      </select>
    </div>
  );
};
