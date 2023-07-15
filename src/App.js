import styles from "./App.module.scss";
import SignUpForm from "./components/signUpForm/SignUpForm";
import LeftSideDecoration from "./images/decorations/topDecoration/LeftSideDecoration";
import RightSideDecoration from "./images/decorations/topDecoration/RightSideDecoration";
import BottomDecoration from "./images/decorations/bottomDecoration/BottomDecoration";
import { useEffect, useState } from "react";
import Logo from "./images/logo/Logo";

function App() {
  const { backgroundPicture, container, logo } = styles;
  const [countries, setCountries] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all").then(
        (res) => res.json()
      );
      const countriesData = response.map(({ name, idd }) => {
        if (idd.suffixes) {
          if (idd.suffixes.length === 1) {
            return {
              name: name.official,
              countryCode: [idd.root + idd.suffixes[0]],
            };
          } else {
            const allCodes = idd.suffixes.map((el) => idd.root + el);
            return { name: name.official, countryCode: allCodes };
          }
        }
      });
      // Прибрати фільтрацію массиву
      // Якщо роблю перевірку на undefind або !idd.suffixes то код вище все одно записує undefined у значення. Подивитися в чому справа
      const filterArr = countriesData.filter((el) => el !== undefined);
      setCountries(filterArr);
    };
    fetchData();
  }, []);
  return (
    <>
      {countries && (
        <section className={backgroundPicture}>
          <div className={container}>
            <LeftSideDecoration />
            <RightSideDecoration />
            <div className={logo}>
              <Logo />
            </div>
            <p>
              <span>Sign Up</span> and find the best place to rest while
              traveling
            </p>
            <SignUpForm countries={countries} />
            <BottomDecoration />
          </div>
        </section>
      )}
      {""}
    </>
  );
}

export default App;
