function writeDataIntoTable(senderIdValue, receiverIdValue, amountValue, timeValue) {
    var table = document.getElementById("transTable");

    var length = table.length;
    var row = table.insertRow(length);

    var senderId = row.insertCell(0);
    var receiverId = row.insertCell(1);
    var amount = row.insertCell(2);
    var time = row.insertCell(3);

    senderId.innerHTML = senderIdValue;
    receiverId.innerHTML = receiverIdValue;
    amount.innerHTML = amountValue;
    time.innerHTML = timeValue;
    var loaders = document.getElementById("loadings").hidden = true;

}
  var firebaseConfig = {
    apiKey: "AIzaSyDWSE17N2nRidj_VlRNedB0C3QxlibwYHE",
    authDomain: "banking-system-9c45a.firebaseapp.com",
    databaseURL: "https://banking-system-9c45a-default-rtdb.firebaseio.com",
    projectId: "banking-system-9c45a",
    storageBucket: "banking-system-9c45a.appspot.com",
    messagingSenderId: "597777499449",
    appId: "1:597777499449:web:0714abf52fe1fe844c54e8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



function getData() {
    // firebase.database().ref('transfer').push({senderId: senderAccountId, receiverId:receiverAccountId, amount:enterAmount,time:time});

    firebase.database().ref("transfer").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var senderId = childData['senderId'];
            var receiverId = childData['receiverId'];
            var amount = childData['amount'];
            var time = childData['time'];
            writeDataIntoTable(senderId, receiverId, amount, time);
        });

    });

}
getData();
window.onload = getData;
