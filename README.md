# [**News World**](https://ricadbur.github.io/world-news/)

This application allows the user to search by country, and then displays news articles for that country.  It provides a drop-down menu of countries that have available news articles.  It also tracks the user's previous searches.

## Features
- Search by list of countries that News API provides articles for
- If a valid country value is not entered, a modal will activate displaying a help message
- When a valid country is entered, 3 news articles are displayed as well as country information
- When a new country is searched that is not currently in recent searches, it will be added to the search history sidebar with a small icon of its flag and can be clicked to view again
- When an article is displayed, a brief summary of that aricle is shown in the news card, and the card can be clicked to open the full article on it's website of origin

---

![screenshot](./assets/images/NewsWorldScreenshot.png)

## License

MIT License

Copyright (c) 2023 Adam Baker, Maxwell Rice, Paul Lambert, Tor Jansson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
Powered by [REST Coutries API](https://restcountries.com/) and [NewsAPI](https://https://newsapi.org/)

Collapsable sidebar modified from design by [Dalis Chan](https://github.com/dalisc/hover-collapsible-sidebar)