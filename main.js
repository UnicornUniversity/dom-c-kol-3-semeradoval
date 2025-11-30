import fs from "fs";
/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {
  // Načtení JSON souboru
  const namesData = JSON.parse(fs.readFileSync('jmena.json', 'utf-8'));

  // --- Počet záznamů ---
  const count = dtoIn.count;
  const dtoOutArray = [];

  const now = new Date();
  const minAge = dtoIn.age.min;
  const maxAge = dtoIn.age.max;

  for (let i = 0; i < count; i++) {
      // --- Pohlaví ---
      const gender = nahodnecislo(2) ? 'muz' : 'zena';

      // --- Jméno a příjmení ---
      let firstName, surname;
      if (gender === 'muz') {
          firstName = namesData.jmenamuzi[nahodnecislo(namesData.jmenamuzi.length)];
          surname = namesData.prijmenimuzi[nahodnecislo(namesData.prijmenimuzi.length)];
      } else {
          firstName = namesData.jmenazeny[nahodnecislo(namesData.jmenazeny.length)];
          surname = namesData.prijmenizeny[nahodnecislo(namesData.prijmenizeny.length)];
      }

      // --- Datum narození náhodně ---
      const totalDays = (maxAge - minAge) * 365.25; // rozsah
      const dayOffset = nahodnecislo(totalDays); // náhodný den + zaokrouhlení
      const birthDate = new Date(now.getFullYear() - minAge - 1, now.getMonth(), now.getDate());
      birthDate.setDate(birthDate.getDate() - dayOffset);
      const isoBirthDate = birthDate.toISOString();

      // --- Úvazek ---
      const uvazekOptions = [10, 20, 30, 40];
      const uvazek = uvazekOptions[nahodnecislo(uvazekOptions.length)];

      // --- Sestavení záznamu ---
      const dtoOut = {
          pohlavi: gender,
          jmeno: firstName,
          prijmeni: surname,
          datumNarozeni: isoBirthDate,
          uvazek: uvazek
      };

      dtoOutArray.push(dtoOut);
  }

  // --- Výpis výsledků ---
  return dtoOutArray;
}

function nahodnecislo(max) {
  return Math.floor(Math.random() * max);
}
// const dtoIn = {
//   count: 5,
//   age: {
//     min: 19,
//     max: 35
//   }
// }
// console.log(main (dtoIn));
