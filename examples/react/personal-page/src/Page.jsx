import { useEffect, useState } from "react";

export default function Page() {
    const [contacts, setContacts] = useState([]);
    const [moods, setMoods] = useState([]);

    const getContacts = async () => {
        const url = "http://localhost:3000/api/projects/1/kv";
        const { all } = await fetch(url).then(res => res.json());
        const contacts = Object.entries(all).map(([name, phone]) => ({
            name,
            phone,
        }));
        setContacts(contacts);
    };

    const getMoods = async () => {
        const url = "http://localhost:3000/api/projects/1/log";
        const all = await fetch(url).then(res => res.json());
        setMoods(all.map(({ mood }) => mood));
    };

    const initDb = async () => {
        const url = "http://localhost:3000/api/projects/1/db";
        await fetch(url, { method: "POST" });
    };

    useEffect(() => {
        getContacts().then(() => getMoods());
    }, []);

    const uploadContact = async contact => {
        const url = "http://localhost:3000/api/projects/1/kv";
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                key: contact.name,
                val: contact.phone,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        getContacts();
    };

    const uploadMood = async text => {
        const url = "http://localhost:3000/api/projects/1/log";
        console.log(text);
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify({ mood: text }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        getMoods();
    };

    return (
        <div>
            <h1>Contact Book</h1>
            <ContactForm addContact={uploadContact} />
            {contacts.map((contact, idx) => (
                <Contact key={idx} contact={contact} />
            ))}
            <h1>Mood Log</h1>
            <MoodForm addMood={uploadMood} />
            {moods.map((mood, idx) => (
                <p key={idx}>{mood}</p>
            ))}
        </div>
    );
}

function Contact({ contact }) {
    return (
        <div>
            <b>{contact.name}</b>
            <p>{contact.phone}</p>
        </div>
    );
}

function ContactForm({ addContact }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        addContact({ name, phone });
        setName("");
        setPhone("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <button type="submit">Add Contact</button>
        </form>
    );
}

function MoodForm({ addMood }) {
    const [mood, setMood] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        addMood(mood);
        setMood("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="your mood"
                value={mood}
                onChange={e => setMood(e.target.value)}
            />
            <button type="submit">Add Mood</button>
        </form>
    );
}
