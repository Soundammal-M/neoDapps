const url = 'http://139.59.67.102:30333';
const neoscan_url = 'http://139.59.67.102:4000/api/main_net/';

var _Neon = Neon.default;

const config = {
  name: 'PrivateNet',
  extra: {
    neoscan: neoscan_url
  }
}

const client = _Neon.create.rpcClient(url, '2.3.2');

// GET BALANCE
const privateNet = new Neon.rpc.Network(config)
_Neon.add.network(privateNet);
var contractScriptHash = "4a47ec2e78356ee40f1d54116da237c6cc5b29d9";//"a8416fed6b0e8d0efdcd6918e7ac06a50606319a";//"073ea943a3e7863926167bd538eb5b1a548f6f8e";//"787d9e4e6a4b6e5b17c34db13e817ac52f94e245";//"e9ebb9de31d558768e1d9969a310bc9ff886bdfe";//"08a3b248d9e1078bc47a5abddcbd8e1b1dbffda9";
var WIF_KEY = "L1an26ne4JUSxMTMW1FAfKcpMXe8DStgGCecumGcL4jMsxzVDiX9";//"Kxj6PtoPZ1UmEUmv2Y2XwqSWBqGUj3PS3Nog8mtrSQLRCfDL4j6H";
//var contractScriptHash = "18be2c8c94318bfc33154cd42fa002d283877465";
//var WIF_KEY = "L3xZs7uhpseXNmgEXy5f4nBDjDPRFWD61ELoNSTuTpTr6pQeKvHH";//New
//var WIF_KEY_2 = "";//New2
//var WIF_KEY_3 = "KzMfgp6hrBC79FXY71LYxpZiMaM4hbVo8rS3Fg3MXJRCtV5UFAQe";//"L4D1vNSeD5GkiituHQRsnFnnD9GoAtaiLCvrrSqGLpj7uEuQ9xeu";//New1
//var WIF_KEY_4="L4D1vNSeD5GkiituHQRsnFnnD9GoAtaiLCvrrSqGLpj7uEuQ9xeu";
let account = new Neon.wallet.Account(WIF_KEY);
//let sellAcc = new Neon.wallet.Account(WIF_KEY_2);
//let buyAcc = new Neon.wallet.Account(WIF_KEY_3);
//let buyerAccount =new Neon.wallet.Account(WIF_KEY_4);

let sh1 = "";
let sh2 = "";
let sh3 = "";

//const ActiveBasketOrder = Neon.u.str2hexstring("activeBasketOrder");
//const InActiveBasketOrder = Neon.u.str2hexstring("inActiveBasketOrder");

function signTx(tx, publicKey) {
  console.log(account.privateKey);
  return Promise.resolve(tx.sign(account.privateKey));
}

//const NEO_ASSET_ID = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
//const NEO_GAS_ASSET_ID = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";

const DDT1 = "";
const DDT2 = "";
const DDT3 = "";

function getConfigCreator(operation, args) {
  return stateConfig = {
    scriptHash: contractScriptHash,
    operation: operation,
    args: args
  }
}


function deploy() {
  const config = {
    net: neoscan_url,
    script: _Neon.create.script({
      scriptHash: contractScriptHash,
      operation: 'deploy',
      args: []
    }),
    address: account.address,
    privateKey: account.privateKey,
    gas: 0,
    fees: 0.001
  }

  _Neon.doInvoke(config)
  .then(res => {
    console.log("doInvoke", res);
  })
  .catch(function (err) {
    console.log("doInvoke Error", err);
  });
}
function Addbooks(){
  //alert("hi");
  var Isbn1=parseInt(document.getElementById("isbn").value.trim());
  var Bk_name=document.getElementById("bk_name").value.trim();
  var Bk_avail=parseInt(document.getElementById("bk_avail").value.trim());
  

   Isbn1 = Neon.u.int2hex(Isbn1);
   Bk_name = Neon.u.str2hexstring( Bk_name);
   Bk_avail = Neon.u.int2hex(Bk_avail);

const Config1 = {
  net: neoscan_url,
  script: _Neon.create.script({
    scriptHash: contractScriptHash,
    operation: 'addBooks',
    args: [Isbn1,Bk_name,Bk_avail]
  }),
  address: account.address,
  privateKey: account.privateKey,
  gas: 0,
  fees: 0.001
}

_Neon.doInvoke(Config1)
.then(res => {
  console.log("doInvoke", res);
  alert("books added");
})
.catch(function (err) {
  console.log("doInvoke Error", err);
});
}

function searchBooks() {

  var argss2=parseInt(document.getElementById("isbn1").value);
  argssw2=Neon.u.int2hex(argss2);
  const script = _Neon.create.script(getConfigCreator("search",[argssw2]));

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    console.log(res);
    var sa=(res.result.stack[0].value)[0];
    console.log(sa);
    if(sa==1)
    {
    alert("searched book is available");
    }
    else
    alert("searched book is not available");
  
  });
}


function viewBooks() { 
 	

  var args2=parseInt(document.getElementById("isbn2").value);
  args2=Neon.u.int2hex(args2);
  const script = _Neon.create.script(getConfigCreator("view_bk",[args2]));

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    console.log(res);
  
  
   var k=Neon.u.hexstring2str(res.result.stack[0].value);
   var k1=k.split("-");
   var k2 =Neon.u.str2hexstring(k1[0]);
   var k21 =Neon.u.str2hexstring(k1[2]);
   //var k3 =Neon.u.hexstring2str(k1[2]);
   var k5=Neon.u.hexstring2ab(k2);
   var k6=Neon.u.hexstring2ab(k21);


   console.log( "isbn",k5);
console.log("bkN",k1[1]);
console.log("avail",k6);
document.getElementById('view1').innerHTML=("isbn " +k5+ ","+"bk_name " +k1[1]+ ","+"avail "+k6);
    //console.log((res.result.stack[0].value));
    //console.log(Neon.u.hexstring2ab(res.result.stack[0].value));
    //console.log(Neon.u.int2hex)
   // document.getElementById('view_bk').innerHTML=Neon.u.hexstring2ab(res.result.stack[0].value)[0];  
  });
}
function TotalBkcount() {
 
  const script = _Neon.create.script(getConfigCreator("total_bkCount"));

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    alert("total_bkCount:"+Neon.u.hexstring2ab(res.result.stack[0].value)[0]);
    console.log((res.result.stack[0].value));
    console.log(Neon.u.hexstring2ab(res.result.stack[0].value)[0]);
   // document.getElementById('total_bkCount').innerHTML=Neon.u.hexstring2ab(res.result.stack[0].value)[0];  
  });
}

function AddStudents(){
  //alert("hi");
  var stuName=document.getElementById("stu").value.trim();
  var stu1_roll=parseInt(document.getElementById("stu_roll2").value.trim());
  

  stuName = Neon.u.str2hexstring(stuName);
  stu1_roll = Neon.u.int2hex( stu1_roll);
   

const Config3 = {
  net: neoscan_url,
  script: _Neon.create.script({
    scriptHash: contractScriptHash,
    operation: 'addstudent_details',
    args: [stuName,stu1_roll]
  }),
  address: account.address,
  privateKey: account.privateKey,
  gas: 0,
  fees: 0.001
}

_Neon.doInvoke(Config3)
.then(res => {
  console.log("doInvoke", res);
  alert("student details added");
})

.catch(function (err) {
  console.log("doInvoke Error", err);
 
});
}

function viewStudent() { 
 	
  
  var args3=parseInt(document.getElementById("roll6").value);
  const script = _Neon.create.script(getConfigCreator("viewStudent_detail",[args3]));

  Neon.rpc.Query.invokeScript(script)
  .execute(url)
  .then(res => {
    console.log(res);
    var p=Neon.u.hexstring2str(res.result.stack[0].value);
    var p1=p.split("-");
   // var k2 =Neon.u.str2hexstring(k1[0]);
    var p2 =Neon.u.str2hexstring(p1[1]);
    //var k3 =Neon.u.hexstring2str(k1[2]);
   // var k5=Neon.u.hexstring2ab(k2);
    var p6=Neon.u.hexstring2ab(p2);
    console.log(p1[0]);
    console.log(p6);
    console.log( "stu_name",p1[0]);
    console.log("roll",p6);
    
    document.getElementById('view2').innerHTML=("stu_name " +p1[0]+ ","+"roll  " +p6);

   
  });
}

function getBooks(){
  //alert("hi");

  var ROll=parseInt(document.getElementById("roll1").value.trim());
  var Isbn5=parseInt(document.getElementById("isbn3").value.trim());
  var Bkk3_name=document.getElementById("bkkk_name").value.trim();
  

  ROll = Neon.u.int2hex(ROll);
   Isbn5 = Neon.u.int2hex(Isbn5);
   Bkk3_name = Neon.u.str2hexstring(Bkk3_name);

const Config4 = {
  net: neoscan_url,
  script: _Neon.create.script({
    scriptHash: contractScriptHash,
    operation: 'getbooks',
    args: [ROll,Isbn5,Bkk3_name]
  }),
  address: account.address,
  privateKey: account.privateKey,
  gas: 0,
  fees: 0.001
}

_Neon.doInvoke(Config4)
.then(res => {
  console.log("doInvoke", res);
  alert("get book success");
})
.catch(function (err) {
  console.log("doInvoke Error", err);
});
}

function returnBooks(){
  //alert("hi");

  var ROll1=parseInt(document.getElementById("roll2").value.trim());
  var Isbn6=parseInt(document.getElementById("isbn4").value.trim());
  var Bkk4_name=document.getElementById("bOOk_name").value.trim();
  

  ROll1 = Neon.u.int2hex(ROll1);
   Isbn6 = Neon.u.int2hex( Isbn6);
   Bkk4_name = Neon.u.str2hexstring(Bkk4_name);

const Config5 = {
  net: neoscan_url,
  script: _Neon.create.script({
    scriptHash: contractScriptHash,
    operation: 'returnbook',
    args: [ROll1,Isbn6,Bkk4_name]
  }),
  address: account.address,
  privateKey: account.privateKey,
  gas: 0,
  fees: 0.001
}

_Neon.doInvoke(Config5)
.then(res => {
  console.log("doInvoke", res);
  alert("book returned");
})
.catch(function (err) {
  console.log("doInvoke Error", err);
});
}
function login()
{
  var username="sandhiya";
  var psw=12345;
  var w=document.getElementById("use").value;
  var w1=parseInt(document.getElementById("psw").value);
  if(username==w && psw==w1 )
  {
    
   window.location="library.html";
   alert("Welcome to library");
  }
  else
  alert("Sorry!!! Username or Password is invalid");
}






















