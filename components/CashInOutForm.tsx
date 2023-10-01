import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import nodemailer from "nodemailer"; // Import nodemailer
import styles from "../styles/CashInOutForm.module.css";

const CashInOutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    uid: "", // Moved UID field above Transaction Type
    transactionType: "cashIn",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Specify the type
    e.preventDefault();


    try {
      // Validate UID format
      if (!/^0x[0-9a-fA-F]{40}$/.test(formData.uid)) {
        alert("UID is not in the correct format.");
        return;
      }

      // Send the form data to a server route
      await axios.post("/api/sendEmail", formData);

      // You can implement success handling here, e.g., show a success message or redirect
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Cash In / Cash Out Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name:</label>
          <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleInputChange} // Use handleInputChange for input elements
  required
  className={styles.input}
/>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>UID:</label>
          <input
            type="text"
            name="uid"
            value={formData.uid}
            onChange={handleInputChange}
            required
            placeholder="e.g., 0x1234567890abcdef..."
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Transaction Type:</label>
          <select
  name="transactionType"
  value={formData.transactionType}
  onChange={handleSelectChange} // Use handleSelectChange for select element
  className={styles.select}
>
  <option value="cashIn">Cash In</option>
  <option value="cashOut">Cash Out</option>
</select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CashInOutForm;
