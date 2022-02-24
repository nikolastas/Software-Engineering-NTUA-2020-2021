# Front-end
Front-end παρουσίασης δεδομένων σε περιβάλλον web.

`Περιεχόμενα:`
- [Building from source](#Building-from-source)
- [Αρχική Σελίδα](#Αρχική-Σελίδα)
- [Σύνδεση και Αποσύνδεση Χρήστη](#Σύνδεση-Χρήστη)
- [Εγγραφή Χρήστη](#Εγγραφή-Χρήστη)
- [Διελεύσεις](#Διελεύσεις)

## `Building from source`
Στον φάκελο `frontend` καλείται το script 
```shell
	npm run build
```
και τοποθετείται στον φάκελο `frontend/build` απ'όπου το βρίσκει ο backend express server και το κάνει serve στο endpoint [https://localhost:9103/](https://localhost:9103/) 

## `Αρχική Σελίδα`
Περιέχει πληροφορίες για το έργο λογισμικού E-Pass όπου πας. Οι πληροφορίες παρουσιάζονται στην μορφή :
```html
	<h1>Αρχική</h1>
	<p>...</p>
```

## `Σύνδεση Χρήστη`
Σελίδα όπου γίνεται η σύνδεση των χρηστών για την προβολή δεδομένων. Η σελίδα περιέχει ένα form της μορφής
```javascript 
	<h2>Σύνδεση Χρήστη</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type="text" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        { !isPending && <button>Σύνδεση</button>}
        { isPending && <button disabled>Αναμονή...</button>}
```
Κατά το πάτημα του button στέλνεται ένα  **https POST request**
στο endpoint https://localhost:9103/interoperability/api/login με τα κατάλληλα δεδομένα από το form 
```javascript
	fetch('https://localhost:9103/interoperability/api/login', {
		method: 'POST',
		...
	})
```
✔️ Σε περίπτωση επιτυχίας κρατείται το cookie με το jwt από τον browser για τις επόμενες κλήσεις στο api μέσω του browser και ο χρήστης ανακατευθύνεται στην προηγούμενη σελίδα. 

Επιπλέον εμφανίζεται στο navbar ένα πεδίο `Logout` για την αποσύνδεση του χρήστη. 
Το πάτημα αυτού μεταφράζεται στο αντίστοιχο **https POST request** https://localhost:9103/interoperability/api/logout που αποδεσμεύει το access token του χρήστη που χρησιμοποιείται από το backend.

❌ Σε περίπτωση αποτυχίας κατάλληλο μήνυμα εμφανίζεται που δηλώνει τον λόγο αποτυχίας (Username not found, Wrong Password, ...)

## `Εγγραφή Χρήστη`
Σελίδα όπου γίνεται η εγγραφή νέων χρηστών για την προβολή των δεδομένων. Οι χρήστες μπορούν να εγγραφούν είτε ως admin είτε απλοί users. Οι admin χρήστες έχουν μετέπειτα πλήρη πρόσβαση στο api και τα admin endpoints.

Η σελίδα περιλαμβάνει ένα form της μορφής 
```js
	<h2>Δημιουργία Χρήστη</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type="text" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Εγγράψου ως:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
        { !isPending && <button>Εγγραφή</button>}
        { isPending && <button disabled>Αναμονή...</button>}
      </form>
```

Κατά το πάτημα του button στέλνεται ένα  **https POST request**
στο endpoint https://localhost:9103/interoperability/api/signup με τα κατάλληλα δεδομένα από το form 
```javascript
	fetch('https://localhost:9103/interoperability/api/signup', {
		method: 'POST',
		...
	})
```
✔️ Σε περίπτωση επιτυχίας κρατείται το cookie με το jwt από τον browser για τις επόμενες κλήσεις στο api μέσω του browser και ο χρήστης ανακατευθύνεται στην προηγούμενη σελίδα.

❌ Σε περίπτωση αποτυχίας κατάλληλο message εμφανίζεται που δηλώνει τον λόγο αποτυχίας (Username already exists, Password too short, ...)


## `Διελεύσεις`
*Αυτή η σελίδα μπορεί να προβληθεί μόνο από συνδεδεμένους χρήστες.* 

Περιλαμβάνει έναν selector όπου ο χρήστης μπορεί να επιλέξει για προβολή :
- ## **Διελέυσεις μεταξύ Operators**
		
	Μπορεί από κατάλληλo form να επιλεγούν
	- Home Operator
	- Visiting Operator 
	- Date from
	- Date to
	
	Αυτό μεταφράζεται σε δύο **https GET requests** στο api. Συγκεκριμένα στα 
	
	https://localhost:9103/interoperability/api/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to, 

	https://localhost:9103/interoperability/api/PassesAnalysis/:op1_ID/:op2_ID/:date_from/date_to. 
	Στην συνέχεια εμφανίζονται τα εξής δεδομένα :
	- Το πλήθος των διελεύσεων για την ζητούμενη περίοδο
	- Το συνολικό κόστος αυτών
	- Ένας πίνακας με συγκεκριμένες πληροφορίες για την κάθε διέλευση όπως αυτές επιστρέφονται από το api

- ## **Διελέυσεις από συγκεκριμένους σταθμούς**
	
	Μπορεί από κατάλληλο form να επιλεγεί 
	- Station 
	
		(Πρώτα καλείται ένα **https GET request** στο endpoint https://localhost:9103/interoperability/api/Stations από όπου λαμβάνεται η λίστα με τους διαθέσιμους σταθμούς)
	- Date from
	- Date to

	Αυτό μεταφράζεται σε ένα **https GET request** στο api. Συγκεκριμένα στο 
	https://localhost:9103/interoperability/api/PassesPerStation/:stationID/:date_from/:date_to

	Στην συνέχεια εμφανίζονται τα εξής δεδομένα :
	- Ο σταθμός που επιλέχθηκε
	- Το συνολικό κέρδος από τις διελεύσεις του σταθμού
	- Ένας πίνακας με συγκεκριμένες πληροφορίες για την κάθε διέλευση όπως αυτές επιστρέφονται από το api
- ## **Κέρδη των Operator**

	Μπορεί από κατάλληλο form να επιλεγεί :
	- Operator
	- Date from
	- Date to

	Αυτό μεταφράζεται σε ένα **https GET request** στο api. Συγκεκριμένα στο 
	https://localhost:9103/interoperability/api/ChargesBy/:op_ID/:date_from/:date_to

	Στην συνέχεια εμφανίζονται τα εξής δεδομένα :
	- Το συνολικό κέρδος από τις διελεύσεις οχημάτων άλλων operators σε σταθμούς του operator που επιλέχθηκε.
	- Ένας πίνακας με το πλήθος των διελεύσεων από οχήματα του κάθε operator και το συνολικό κέρδος από αυτές.
	
✔️ Σε περίπτωση επιτυχίας επικοινωνίας με τον backend server εμφανίζονται όπως αναμένονται τα δεδομένα που ζητήθηκαν.

❌ Αλλιώς δεν εμφανίζονται καθόλου δεδομένα