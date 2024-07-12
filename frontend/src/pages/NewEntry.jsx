import React, { useState } from "react";
import Navbar2 from "../components/Navbar2.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/NewEntry.css";
import { proxy } from "../../utils/proxy";

const NewEntry = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [text, setText] = useState("");
  const expenseCategories = [
    "Education",
    "Food",
    "Transportation",
    "Entertainment",
    "Clothing",
    "Tuition Fees",
    "Personal Care",
    "Miscellaneous",
  ];
  const incomeCategories = [
    "Pocket money",
    "Scholarships",
    "Internship/Stipend",
    "Part-time",
  ];
  const handleNavbarSelectedItem = (number) => {
    setSelectedNumber(number);
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "income",
    category: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, type: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setText("User ID is not available");
      return;
    }

    try {
      const response = await fetch(`${proxy}/api/transactions/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setText("Transaction added successfully");
        console.log("Transaction added successfully");
        setFormData({
          title: "",
          description: "",
          date: "",
          type: "income",
          category: "other",
          amount: "",
        });
      } else {
        setText(data.message || "Transaction add failed");
        console.log("Transaction add failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-1">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Navbar2
          n1="New-Entry"
          onSelected={handleNavbarSelectedItem}
          className="navbar-settings"
        />
        <div className="new-entry-form">
          <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-2">
              <div className="our-form">
                <div className="left-form">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      value={formData.title}
                      onChange={handleInputChange}
                      type="text"
                      id="title"
                      name="title"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      name="description"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      value={formData.date}
                      onChange={handleInputChange}
                      type="datetime-local"
                      id="date"
                      name="date"
                    />
                  </div>
                </div>

                <div className="right-form">
                  <div className="radio-main">
                    <div className="form-group radio">
                      <label htmlFor="income">
                        <input
                          type="radio"
                          id="income"
                          name="type"
                          value="income"
                          checked={formData.type === "income"}
                          onChange={handleRadioChange}
                        />
                        Income
                      </label>
                    </div>
                    <div className="form-group radio">
                      <label htmlFor="expense">
                        <input
                          type="radio"
                          id="expense"
                          name="type"
                          value="expense"
                          checked={formData.type === "expense"}
                          onChange={handleRadioChange}
                        />
                        Expense
                      </label>
                    </div>
                  </div>
                  <div className="form-group category-form">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      name="category"
                    >
                      {formData.type === "expense"
                        ? expenseCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))
                        : incomeCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      value={formData.amount}
                      onChange={handleInputChange}
                      type="number"
                      id="amount"
                      name="amount"
                    />
                  </div>

                  <div className="form-group"></div>
                </div>
              </div>
              <div className="form-group ">
                <button type="submit" className="submit">
                  Submit
                </button>
              </div>
              <p className="failed-text">{text}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
