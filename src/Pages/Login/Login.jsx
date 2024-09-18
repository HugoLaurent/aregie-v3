import React from "react";
import { ButtonIconText } from "../../Components/Buttons";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log("username:", username);
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
      });
  };
  return (
    <section>
      <h1>Login Page</h1>
      <article>
        <form onSubmit={handleLogin}>
          {/* <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' /> */}
          <ButtonIconText
            icon="fa fa-user"
            text="Username"
            type="text"
            id="username"
            name="username"
          />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Login</button>
        </form>
      </article>
    </section>
  );
}
