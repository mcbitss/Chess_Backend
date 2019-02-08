import countries from '../countries/model';
import languages from '../languages/model';
import CountriesJson from './countries.json';
import LanguagesJson from './languages.json';
import { findIndex } from 'lodash';

export const masterUpload = (req, res, next) => {
    countries.deleteMany({}, (countryErr, countryResp) => {
        languages.deleteMany({}, (languageErr, languageResp) => {
          if (!countryErr && !languageErr) {
            const countriesData = [];
            Object.keys(CountriesJson).forEach((key) => {
               const countryObj = {
                sortname: key,
                country: CountriesJson[key].name,
                native: CountriesJson[key].native,
                phone: CountriesJson[key].phone
               }
               countriesData.push(countryObj);
            });
            countries.insertMany(countriesData, (countryInsertErr, countryInsert) => {
                const languagesData = [];
                countryInsert.map((each) => {
                    const languageObj = {};
                    languageObj.country = each.sortname;
                    languageObj.languages = [];
                    CountriesJson[each.sortname].languages.map((eachLanguage) => {
                        if (LanguagesJson[eachLanguage]) {
                            languageObj.languages.push({ sortname: eachLanguage, language: LanguagesJson[eachLanguage].name, native: LanguagesJson[eachLanguage].native });
                        }
                    });
                    if(findIndex(languageObj.languages, function(o) { return o.sortname == 'en'; }) === -1) {
                        const eachLanguage = 'en';
                        languageObj.languages.push({ sortname: eachLanguage, language: LanguagesJson[eachLanguage].name, native: LanguagesJson[eachLanguage].native });
                    }
                    languagesData.push(languageObj);
                });
                languages.insertMany(languagesData, (languagesInsert, languagesInsertErr) => {
                    res.send(languagesData);
                })
            });
          }
        });
    })
}