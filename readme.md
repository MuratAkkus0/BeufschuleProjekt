- Add Item Form

  - Gerät Id
  - Gerät Typ
  - Computer Name
  - Computer Raum(wenn es ein Person ist dann brauchen wir ein Person Liste)
  - Wartungs Termin Period
  - Mac Adresse
  - Kauf Datum

  Change first the host email adress in src/api/index.js.
  Then change Api key for post request in ItemCard.jsx component and set it to http://localhost:3000/send_mail

`npm i 
npm run server
npm run dev`
