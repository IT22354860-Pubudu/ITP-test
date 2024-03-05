import React, { useEffect } from 'react';
import './singup.css';

export default function Singup() {
    useEffect(() => {
        // Selecting form and input elements
        const form = document.querySelector("form");
        const passwordInput = document.getElementById("password");
        const passToggleBtn = document.getElementById("pass-toggle-btn");

        // Function to display error messages
        const showError = (field, errorText) => {
            field.classList.add("error");
            const errorElement = document.createElement("small");
            errorElement.classList.add("error-text");
            errorElement.innerText = errorText;
            field.closest(".form-group").appendChild(errorElement);
        };

        // Function to handle form submission
        const handleFormData = (e) => {
            e.preventDefault();

            // Retrieving input elements
            const fullnameInput = document.getElementById("fullname");
            const emailInput = document.getElementById("email");
            const dateInput = document.getElementById("date");
            const genderInput = document.getElementById("gender");

            // Getting trimmed values from input fields
            const fullname = fullnameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const date = dateInput.value;
            const gender = genderInput.value;

            // Regular expression pattern for email validation
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

            // Clearing previous error messages
            document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
            document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

            // Performing validation checks
            if (fullname === "") {
                showError(fullnameInput, "Enter your full name");
            }
            if (!emailPattern.test(email)) {
                showError(emailInput, "Enter a valid email address");
            }
            if (password === "") {
                showError(passwordInput, "Enter your password");
            }
            if (date === "") {
                showError(dateInput, "Select your date of birth");
            }
            if (gender === "") {
                showError(genderInput, "Select your gender");
            }

            // Checking for any remaining errors before form submission
            const errorInputs = document.querySelectorAll(".form-group .error");
            if (errorInputs.length > 0) return;

            // Submitting the form
            form.submit();
        };

        // Toggling password visibility
        passToggleBtn.addEventListener('click', () => {
            passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        });

        // Handling form submission event
        form.addEventListener("submit", handleFormData);

        // Cleanup function to remove event listeners
        return () => {
            form.removeEventListener("submit", handleFormData);
            passToggleBtn.removeEventListener('click', () => {});
        };
    }, []);

    return (
        <div className="form">
            <form action="thank-you.html">
                <h2>Form Validation</h2>
                <div className="form-group fullname">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" placeholder="Enter your full name"/>
                </div>
                <div className="form-group email">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" placeholder="Enter your email address"/>
                </div>
                <div className="form-group password">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password"/>
                    <i id="pass-toggle-btn" className="fa-solid fa-eye"></i>
                </div>
                <div className="form-group date">
                    <label htmlFor="date">Birth Date</label>
                    <input type="date" id="date" placeholder="Select your date"/>
                </div>
                <div className="form-group gender">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender">
                        <option value="" disabled>Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group submit-btn">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    );
}
