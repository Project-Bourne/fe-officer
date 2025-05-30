import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { InputModel, DropdownModel } from '../../models/ui/components.models';
import { useOnClickOutside } from '../custom-hooks';
import hide from '../../../public/icons/hide.svg'

const countries = require('../../utils/countries.json');
const languages = require('../../utils/languages.json');

function Input(props: InputModel) {
  const { type, value, onChange, placeholder, classNameStyle, isDisabled } =
    props;
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(prevState => !prevState);
  };

  return (
    <>
      {type === 'password' ? ( // add toggle button, if input type is password
        <div className="flex w-full">
          <input
            className={`w-[90%] py-2 px-3 font-light rounded-l border-y-2 border-l-2 border-r-0 border-y-gray-100 border-l-gray-100 focus:border-gray-100 outline-none ${classNameStyle}`}
            value={value}
            placeholder={placeholder}
            type={toggle ? 'text' : 'password'}
            readOnly={isDisabled}
            onChange={onChange}
          />
          <div
            className="w-[10%] rounded-r border-y-2 border-r-2 border-l-0 border-y-gray-100 border-r-gray-100 focus:border-gray-100 outline-none flex justify-center"
            onClick={handleToggle}
          >
            {!toggle ? (
              <Image
                src={hide}
                alt="Filter"
                width={20}
                height={20}
                className=""
                priority
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <input
          className={`w-full py-2 px-3 rounded-md border-[1px] font-light border-gray-100 focus:border-gray-100 outline-none ${classNameStyle}`}
          value={value}
          placeholder={placeholder}
          type={type}
          readOnly={isDisabled}
          onChange={onChange}
        />
      )}
    </>
  );
}

// drop down component
function Dropdown(props: DropdownModel) {
  const { data, onChange, className } = props;

  return (
    <>
      <select
        className={`w-full py-2 px-3 rounded-md border-[1px] border-gray-100 focus:border-gray-100 outline-none ${className}`}
        onChange={onChange}
      >
        {data?.map((item: { id: number; role: string }) => (
          <option key={item?.id} value={item?.role} className="text-[12px]">
            {item?.role}
          </option>
        ))}
      </select>
    </>
  );
}

// dropdown component of countries and flag
function DropdownWithFlag(props: DropdownModel) {
  const { onClick, selectItem, className, style, isDisabled } = props;
  const [dropdown, setDropdown] = useState(false);
  const [country, setCountry] = useState({
    name: "Nigeria",
    flag: "https://flagcdn.com/ng.svg",
  });
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [countrySearch, setCountrySearch] = useState("");
  const searchInput = useRef();

  const dropdownRef = useRef<HTMLDivElement | null>(null);;
  useOnClickOutside(dropdownRef, () => {
    setDropdown(false);
    setCountrySearch("");
  });

  // toggle dropdown if component is not disabled
  const handleDropdown = () => {
    if(!isDisabled){
      setDropdown(!dropdown);
    }
    else{ return }
    // if (dropdown) {
    //     document.getElementById('country-search').addEventListener('click', () => {
    //         document.getElementById('country-search').focus()
    //     })
    // }
  };
  // add a selected country from dropdown
  const handleItemSelect = (country, flag) => {
    setCountry({ name: country, flag });
    setDropdown(false);
    selectItem(country);
    setFilteredCountries(countries);
    setCountrySearch("");
  };

  const filterCountries = (event) => {
    // event.preventDefault();
    // setCountrySearch(event.target.value);
    // console.log("Filtering", event.target.value);
    let filteredCountries = countries.filter((country) => {
      if (
        country.name
          .toLowerCase()
          .startsWith(event.target.value.toLocaleLowerCase())
      ) {
        return country;
      }
    });
    setFilteredCountries(filteredCountries);
    // searchInput.current.focues();
    // document.getElementById('country-search').focus();
  };

  // dropdwon compoent
  const Menu = () => {
    // close dropdown menu when outside is clicked
    const menuRef = useRef();
    useOnClickOutside(menuRef, () => {
      setDropdown(false);
      setCountrySearch("");
    });

    return (
      <div
        // ref={menuRef}
        className={`h-[170px] hover:cursor-pointer w-full shadow-md overflow-scroll bg-white absolute z-7`}
      >
        {/* <input 
                  className="static w-[400px] mx-auto px-4 mb-2 border-b-2 h-[40px] text-black" 
                  id="country-search"
                  placeholder="Search"
                  type="text"
                  onChange={(event: any) => {
                      event.preventDefault();
                      setCountrySearch(event.target.value);
                      filterCountries(event);
                  }}
                  key={'search-input'}
                  // ref={searchInput}
                  value={countrySearch}
              /> */}
        <div className="">
          {filteredCountries
            .sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
            })
            .map((item: any, index: number) => (
              <div
                key={index}
                className={`flex gap-2 px-2 py-1 hover:bg-gray-200 cursor-pointer items-center`}
                onClick={() => handleItemSelect(item.name, item.image)}
              >
                <Image
                  src={item.image}
                  alt="Filter"
                  height={20}
                  width={20}
                  className="rounded-full h-[20px] w-[20px]"
                  priority
                />
                <div className="text-[15px] font-light">{item.name}</div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className={`relative ${style}`}>
      <div
        className={`flex justify-between items-center py-2 px-3 rounded-md border-[1px] border-gray-100 hover:cursor-pointer`}
        onClick={handleDropdown}
      >
        <div className="flex gap-2 items-center">
          <Image
            src={country.flag}
            alt="Filter"
            height={20}
            width={20}
            className="rounded-full h-[20px] w-[20px]"
            priority
          />
          <div className="text-[15px] font-light">{country.name}</div>
        </div>
        <div>&#8964; </div>
      </div>
      {dropdown && (
        <>
          <input
            className="static w-[100%] mx-auto px-4 mb-2 border-b-2 h-[40px] text-black"
            id="country-search"
            placeholder="Search"
            type="text"
            onChange={(event: any) => {
              event.preventDefault();
              setCountrySearch(event.target.value);
              filterCountries(event);
            }}
            key={"search-input"}
            // ref={searchInput}
            value={countrySearch}
          />
          <Menu />
        </>
      )}
    </div>
  );
}

// dropdown component of countries and flag
function LanguagesDropdown(props: DropdownModel) {
  const { onClick, selectItem, className, style, isDisabled } = props;
  const [dropdown, setDropdown] = useState(false);
  const [country, setCountry] = useState({
    name: 'English'
  });
  // toggle dropdown if component is not disabled
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  // add a selected country from dropdown
  const handleItemSelect = country => {
    setCountry({ name: country });
    setDropdown(false);
    selectItem(country);
  };

  // dropdwon compoent
  const Menu = () => {
    // close dropdown menu when outside is clicked
    const menuRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(menuRef, () => setDropdown(false));

    return (
      <div
        ref={menuRef}
        className={`h-[170px] hover:cursor-pointer w-full shadow-md overflow-scroll bg-white absolute  mt-[150%] z-10`}
      >
        {languages.map((item: any, index: number) => (
          <div
            key={index}
            className={`flex gap-2 px-2 py-1 hover:bg-gray-200 cursor-pointer items-center`}
            onClick={() => handleItemSelect(item.name)}
          >
            <div className="text-[15px] font-light">{item.name}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative flex flex-row flex-wrap items-center border-b-2 border-sirp-primary mb-[-2px] cursor-pointer ${style}`}
    >
      <div
        className={`flex justify-between items-center my-2 w-[150px] px-1 rounded-md border-gray-100 hover:cursor-pointer`}
        onClick={handleDropdown}
      >
        <div className="flex gap-2 items-center">
          <div className="text-[15px] font-normal text-gray-700">
            {country.name}
          </div>
        </div>
        <div className="text-gray-500 ">&#8964; </div>
      </div>
      {dropdown && <Menu />}
    </div>
  );
}

export { Input, Dropdown, DropdownWithFlag, LanguagesDropdown };
