

# signup

 - get the data.
 - validate the data.
 - encrypt the password using bcrypt.
 - save the user.
 - generate a token.
 - set token expiry


# login

 - get the data.
 - compare email and password using bcrypt.compare
 - get the token and send the response


# logout

 - expire the token.