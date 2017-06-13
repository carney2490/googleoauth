function refreshToken(data) {
    var querystring = require('querystring'); //This Node module puts the data in a URL format to refresh the access_token
    var request = require('request'); // Request Node module for making HTTP requests easier.
    var refresh_token = GoogleRefreshToken //Your refresh token that is received after getting permission from the user - should have received an access and refresh token.
    var googleClientId = GoogleClientId //Google Client ID received from created app.      
    var googleSecret = GoogleSecret //Google Secret also received from app creation screen.
    var redirect_uri = "http://localhost:8080" //One of the redirect URI's given permission at app creation screen.



    var info = {}; //Create hash for Query String to post in URL bar.
    info['client_id'] = googleClientId;
    info['client_secret'] = googleSecret; //Add 3 of the variables from above into the hash.
    info['refresh_token'] = refresh_token;
    info['grant_type'] = 'refresh_token'; //Using refresh_token string to request access_token

    var queryinfo = querystring.stringify(info); //Turns hash above into URL string like below
    //&client_id=googleClientId&client_secret=googleSecret&refresh_token=usersRefreshToken&grant_type=refresh_token

    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded' //encoded to a URL post.
    };

    var options = {
        url: 'https://accounts.google.com/o/oauth2/token', //Base URL
        method: 'POST', //Method Type - Post, not Get.
        headers: headers, //encoding type
        body: queryinfo //querystrings URL string
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) { //If no error and success statusCode
            console.log(body); // Pre-Parsed - I always like to see what is being pulled back before and after parsing.
            var information = JSON.parse(body);
            console.log(information); //In case you want to see what is pulled back.
            access_token = information.access_token;
            nextFunction(access_token); //With most things that use any part of Google, the refresh token will need used everytime.
            //The access_token expires every hour, so you will need to make sure refresh_token
            //is in a safe place for you to store and get to.
        } else {
            console.log(error);
            console.log(response.statusCode);
        }
    }
    request(options, callback);
}