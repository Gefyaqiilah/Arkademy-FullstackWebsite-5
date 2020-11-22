# ZWALLET BACK-END

repo ini berisi project zwallet back-end, yang mana di Zwallet back-end ini telah saya buat beberapa EndPoint API, diantaranya :

1. <b>users</b>
2. <b>transfers</b>
3. <b>topup</b>

## Penjelasan EndPoint API

1.  <b>users</b> <br>
    Berisi data identitas yang dikhusus kan untuk user yang mendaftar dizwallet, Di endpoint ini server menerima beberapa method request, Diantaranya :<br>
    <b>GET, GET BY ID, GET BY FIRSTNAME & PHONE NUMBER & LIMIT, DELETE, PATCH, INSERT.</b>
2.  <b>transfers</b><br>
    Berisi data transfer user yang mana ketika user mengirim sebuah data transfer ke endpoint ini harus memerhatikan id pengirim dan id penerima, juga di endpoint ini saldo "si pengirim" akan dicek terlebih dahulu sebelum sipengirim mentransfer uang digital nya.
    Di endpoint ini server menerima beberapa method request, Diantaranya :<br>
    <b>GET, GET BY ID, GET DATA TRANSFER BY FIRSTNAME (User), TYPE (Receiver or Transfer) & LIMIT (Default = 10), INSERT, DELETE.</b>
3.  <b>top up</b><br>
    Berisi data topup, yang mana di endpoint ini memungkinkan mengirim uang selain dari user ke user, tapi dari nama pengirim (misalkan nama Bank) ke user, ketika ditambahkan data topup itu artinya saldo si user yang menerima akan ditambah.
    Di endpoint ini server menerima beberapa method request, Diantaranya :<br>
    <b>GET, GET BY ID, GET BY FIRSTNAME (user) & LIMIT(Default=10), INSERT, DELETE.</b>

## Request Example

https://explore.postman.com/templates/14484/zwallet-back-end
