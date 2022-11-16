export default function constructBody(data) {
    let parsed;
    console.log(data);
    return data.map((row) => {
        return {
            email: row.email || `email${Math.floor(Math.random() * 1000)}`,
            password: row.Nachname + row.Vorname,
            firstname: row.Vorname || null,
            lastname: row.Nachname || null,
            address: {
                street: row.Strasse || null,
                number: row.Nr || null,
                city: row.Ort || null,
                postcode: row.PLZ || null,
                country: row.Land || null,
            },
            role: row.Rolle,
        };
    });
}
