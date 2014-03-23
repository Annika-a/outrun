function startf(){
readFileHttp("tree.txt")
}

var numbs = [[]];
var seednumber;

function FindTheBestRoute(){
var  routes = []; //Tähän tallenetaan löydetyt reitit
//Luodaan ensimmäiset reitit alareunan joka solusta oma:
for(var x = 0; x <numbs.length-1; x++){
routes.push([x]);
}

var round = 0;
var currentwidth = numbs.length-2;
//Käydään läpi ruudukkoa alakerroksesta ylöspäin
while(round<numbs.length-2){
for(var y = 0; y < currentwidth+1; y++){
   //Reittien seuraavien askelien lisääminen
   if(routes[y][round] == 0){
    //Edellinen indeksi 0:lla reunassa
      routes[y].push(routes[y][round]);
    }
     else if(routes[y][round] == currentwidth){
      //Edellinen indeksi toisessa ulkoreunassa
    routes[y].push(routes[y][round]-1);
     }else{
     //Luodaan uusi reitti keskimmäisiin 
    var tempa = routes[y].slice(0);
    tempa.push(routes[y][round]-1);
    routes.push(tempa);  
    //Jatketaan jo olemassa olevaa
    routes[y].push(routes[y][round]);
   }
   }

//Eliminointi, Säilytetään kohtaavista reiteistä isompi:
var deletable = [];//deletoitavien reittien indeksit tähän
for(var x = 0; x <= currentwidth; x++){
var tempsave =[]; 
for(var v = 0; v <routes.length; v++){
        if(routes[v][round+1] == x)tempsave.push(v);      
   }
    if(tempsave.length>1) {
              if(RouteSum(routes[tempsave[0]]) > RouteSum(routes[tempsave[1]])){
                deletable.push(tempsave[1]);
              }else{
                 deletable.push(tempsave[0]);
              }
          }   
 } 

//Poistetaan routesta valitut
deletable.sort(function(a,b){return a-b});
var numberofdeleted=0;
for(f in deletable){
routes.splice(deletable[f]-numberofdeleted, 1);
numberofdeleted++;
}
currentwidth--;
round++;
}
//Näytetään jäljelle jäänyt reitti: 
PrintRoute(routes[0]); 
}

function RouteSum(count){
//Saa reitin indekseinä palauttaa reitin summan
var row = numbs.length-2;
var sum = 0;
      for(var x = 0; x < count.length; x++){
           sum += numbs[row][count[x]];
           row--;
      }
      return sum;
}

function PrintRoute(route){
//Piirtää reittipuuhun valitun reitin punaisella.
document.write("<h2>"+seednumber+"</br>");
document.write("Reitin summa:"+RouteSum(route)+"</h2>");
route.reverse();
var printable = "<center><span style=\"font-size:9px\">";
      for(var x = 0; x < numbs.length; x++){
          for(var y = 0; y<numbs[x].length; y++) {
            var p ="";
            if(numbs[x][y]<10)p= "0";//Näyttää paremmalta tämän kanssa
            if(route[x] == y){
              printable += "<span style=\"color:red\">"+p+""+numbs[x][y]+"</span>  ";
            }
            else{
              printable +=  p+""+numbs[x][y]+"  ";
            }
          }
      printable += "<br>";
      }
document.write( printable+"</span></center>");
}


function formatlines(t){
//Hakee numerot arrayhin
var numbers;
var lines;
lines = t.split('\n');
for(var i = 0;i < lines.length;i++){
    numbs[i] = [];
    numbers = lines[i].split(' ');
     if(i==0){
     seednumber = lines[i];
    }
 else{
  for(var x = 0; x < numbers.length; x++){
     numbs[i-1][x]=parseInt(numbers[x]);
    }
  }
} 
FindTheBestRoute();
}

function readFileHttp(fname) {
//Lukee filen
    xmlhttp = getXmlHttp();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4) {
        formatlines(xmlhttp.responseText);
      }
    }
    xmlhttp.open("GET", fname, true);
    xmlhttp.send(null);
  }
 function getXmlHttp() {
    if (window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp == null) {
      alert("Your browser does not support XMLHTTP.");
    }
    return xmlhttp;
  }