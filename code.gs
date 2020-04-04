/**
* Edit the script's manifest to include the additional scopes that the API requires
* When the user authorizes your script they will also be asked to approve those additional scopes
* Use the method ScriptApp.getOAuthToken() in your code to access the OAuth2 access token the script has acquired
* Pass the token in the Authorization header of a UrlFetchApp.fetch() call.
*/

function getVerificationTxt() {

  // getOAuthToken handles the authorization flow with Google
  var txt = getRecord(ScriptApp.getOAuthToken());

  // Log response
  Logger.log(JSON.stringify(txt.method));
  Logger.log(JSON.stringify(txt.token));
}

function getRecord(accessToken) {

  // URL used to invoke the API
  var url = "https://www.googleapis.com/siteVerification/v1/token";

  // Requested properties 
  var data = {
    'site': {
      'type': 'INET_DOMAIN',
      'identifier': 'cloudif.com.mx'
    },
    'verificationMethod': 'DNS_TXT'
  };

  // POST options sent to URL
  var options = {
    'headers': {
      'Authorization': 'Bearer ' + accessToken
    },
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data),
  };

  // UrlFetchApp.fetch calls the API in the URL with parameters
  var response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText());
}