  var firebaseConfig = {
    apiKey: "AIzaSyDWSE17N2nRidj_VlRNedB0C3QxlibwYHE",
    authDomain: "banking-system-9c45a.firebaseapp.com",
    databaseURL: "https://banking-system-9c45a-default-rtdb.firebaseio.com",
    projectId: "banking-system-9c45a",
    storageBucket: "banking-system-9c45a.appspot.com",
    messagingSenderId: "597777499449",
    appId: "1:597777499449:web:0714abf52fe1fe844c54e8"
  };
  
  
  // Your web app's Firebase configuration
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function getData() {
    var i = 0;
    firebase.database().ref("users").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var accountId = localStorage.getItem("accountId");
            var name = localStorage.getItem("name");
            var email = localStorage.getItem("email");
            var balance = localStorage.getItem("balance");

            document.getElementById("sub-data0").innerHTML = accountId;
            document.getElementById("sub-data1").innerHTML = name;
            document.getElementById("sub-data2").innerHTML = email;
            document.getElementById("sub-data3").innerHTML = balance;
            var loader = document.getElementById("loading1").hidden = true;

            var accountId = childData['accountId'];
            var name = childData['name'];
            if (accountId != localStorage.getItem('accountId')) {
                document.getElementById("d" + i.toString()).innerHTML = "  AccountId:  " + accountId + "   Name:  " + name;
                i = i + 1;
            }
      });
    });
  }


function transferAmount(){
    var enterAmount = parseInt(document.getElementById("amount").value);
    var balance = parseInt(document.getElementById("sub-data3").textContent);
    if(enterAmount > balance)
    {
      alert("Unsufficient Amount");
  
    }
    else if (enterAmount <= 0)
    {
      alert("Invalid Entry");
    }
  else 
  {
    var senderAccountId = parseInt(document.getElementById("sub-data0").textContent);
    var receiverAccountId = parseInt((document.getElementById("transfer").value).substring(11, 21));
  
    var d = new Date();
    var time = d.toString();
    console.log(senderAccountId);
    console.log(receiverAccountId);
      firebase.database().ref('transfer').push({senderId: senderAccountId, receiverId:receiverAccountId, amount:enterAmount,time:time});
      firebase.database().ref("users").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          var childKey = childSnapshot.key;
          // console.log(childKey);
          var name = childData['name'];
          var email = childData['email'];
          var balance = childData['balance'];
          var accountId = childData['accountId'];
          if(accountId==senderAccountId){
          firebase.database().ref("users/"+childKey+"/balance").set(balance-enterAmount);
          document.getElementById("sub-data3").innerHTML = balance-enterAmount;
          localStorage.setItem("balance",balance-enterAmount);
          }
          if(accountId==receiverAccountId){
            firebase.database().ref("users/"+childKey+"/balance").set(balance+enterAmount);
          }
        });
    
      });
  
  }
  
  }
  
window.onload = getData;
