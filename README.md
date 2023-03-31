# Webauthn Server Demo

## Important notes

- This project is only for demo. It hasn't been reviewed for security issues. But passwords are stored properly.
- It's based on SQLite. Example database is also provided in this repo. You can start it right out of the box
- Authentication on Windows is not supported fully yet.
- Some security checks are not implemented in this project. i.e Challenge checking and secure storage of JWT secret.

# How it works?

- initially the users can be registered on the ordinary way: using swagger (localhost:5005/docs) with a basic username / password.
- After starting the frontend (https://github.com/ehog90/webauthn-client), by logging in with that username / password you can add webauthn authentication.

## Example user

- username: bela, password: aleb
- username: webauthn, password: 12345
