import React, { useEffect, useState } from "react";
import "./Patients.css";

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/patients")
            .then(res => res.json())
            .then(data => {
                setPatients(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-patients">
            <h1>Patients</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((p, i) => (
                        <tr key={i}>
                            <td>{p.username}</td>
                            <td>{p.lastname}</td>
                            <td>{p.firstname}</td>
                            <td>{p.middlename}</td>
                            <td>{p.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}