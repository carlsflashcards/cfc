// © Copyright 2010 Carl Olson, all rights reserved.
// 'Written by Carl Olson
// carlsflashcards.com
// This code is released as GPLv3
var t = parent.t.document;
var m = parent.m.document;
var b = document;

var field;

var fps = 1600;
var cbRO = 1;
var cbRS = 0;
parent.document.title = "Flashcards";
var font_size = ((screen.availWidth) / 10);
var strpx = "" + font_size + 'px';
var prev_num = 0;
var adjustingSettings = 0;
var timeoutID;
var timer_ctr = 0;
var autopilot = 1;

// numFcTypes should not be hardcoded
var numFcTypes = 2;


var row_height = (((screen.availHeight - 70) * 0.65) / numFcTypes);


var colHdr_1 = 'FC1';
var colHdr_2 = 'FC2';
var colHdr_3 = 'FC3';

var r = 0;
var fgColor_1 = '#E1E4FF';
var bgColor_1 = '#020542';
var fgColor_2 = '#D5FFD5';
var bgColor_2 = '#011301';
var fgColor_1 = '#E1E4FF';
var bgColor_1 = '#020542';




// #####################################################################################
// #####################################################################################
// #####################################################################################
// #####################################################################################


// NEW NEW NEW NEW





var filename = File('/home/carl/Development/wp_postings/javascript/drop.txt');
fr = new FileReader();
//fr.onload = receivedText;
var line2 = fr.readAsText(filename);

 


alert(line2)







// (new style - not yet working)
//fc = line.split("\n");
fc = line.split('\u2514');
line = '';



// #####################################################################################
// #####################################################################################
// #####################################################################################
// #####################################################################################


var num_recs = fc.length;
var font_1 = new Array();
var fc1 = new Array();
if((numFcTypes == 2) || (numFcTypes == 3))
{
   var font_2 = new Array();
   var fc2 = new Array();
}
if(numFcTypes == 3)
{
   var font_3 = new Array();
   var fc3 = new Array();
}
for(i = 0; i < num_recs; i ++ )
{




// (new style - not yet working)
//   field = fc[i].split("\t");

   field = fc[i].split('\u2510');







   fc1[i] = field[0];
   if((numFcTypes == 2) || (numFcTypes == 3))
   {
      fc2[i] = field[1];
   }
   if(numFcTypes == 3)
   {
      fc3[i] = field[2];
   }
}
//fc = null;
setupListFC();
setupFcDisplay(0);
section = null;
field = null;
loadControlPanel();
function setupListFC()
{
   parent.document.getElementById('f').rows = '0,80,20';
   parent.m.location = parent.m.location + "?" + Math.random();
   m.write('<body bgcolor="#DCDCDC" id="m_body">');
   m.body.bgColor = '#DCDCDC';
   var m_body = m.getElementById('m_body');
   var table_1 = t.createElement("table");
   m_body.appendChild(table_1);
   table_1.style.lineHeight = '90%';
   tbody_1 = m.createElement("tbody");
   tr_th_1 = m.createElement("tr");
   tr_1 = new Array(num_recs);
   td_1 = new Array(num_recs);
   td_2 = new Array(num_recs);
   td_3 = new Array(num_recs);
   tbody_1.appendChild(tr_th_1);
   tr_th_1.style.backgroundColor = '#F3DE7B';
   th_columns = new Array(numFcTypes - 1);
   for(i = 0; i < numFcTypes; i ++ )
   {
      th_columns[i] = m.createElement("th");
      switch(i)
      {
         case 0 :
            th_columns[i].appendChild(m.createTextNode(colHdr_1));
            tr_th_1.appendChild(th_columns[0]);
            break;
         case 1 :
            th_columns[i].appendChild(m.createTextNode(colHdr_2));
            tr_th_1.appendChild(th_columns[1]);
            break;
         case 2 :
            th_columns[i].appendChild(m.createTextNode(colHdr_3));
            tr_th_1.appendChild(th_columns[2]);
            break;
      }
   }
   var nodes;
   for(i = 0; i < num_recs; i ++ )
   {
      tr_1[i] = m.createElement("tr");
      trIdName = 'tr_' + (i + 1);
      tr_1[i].setAttribute('id', trIdName);
      tbody_1.appendChild(tr_1[i]);
      td_1[i] = m.createElement("td");
      tdIdName = 'td' + (i + 1) + '_1';
      td_1[i].setAttribute('id', tdIdName);
      td_1[i].style.backgroundColor = bgColor_1;
      tr_1[i].appendChild(td_1[i]);
      font_1[i] = m.createElement('font');
      font_1[i].setAttribute('color', fgColor_1);
      fontIdName = 'font' + (i + 1) + '_1';
      font_1[i].setAttribute('id', fontIdName);
      nodes = fc1[i].split("\u2518");
      br = new Array(nodes.length - 1);
      if(nodes.length == 1)
      {
         font_1[i].appendChild(m.createTextNode(nodes[0]));
      }
      else
      {
         font_1[i].appendChild(m.createTextNode(nodes[0]));
         for(j = 1; j < nodes.length; j ++ )
         {
            br[i - 1] = t.createElement("br");
            font_1[i].appendChild(br[i - 1]);
            font_1[i].appendChild(t.createTextNode(nodes[j]));
         }
      }
      td_1[i].appendChild(font_1[i]);
      m.write('</td>');
      if((numFcTypes == 2) || (numFcTypes == 3))
      {
         td_2[i] = m.createElement("td");
         tdIdName = 'td' + (i + 1) + '_2';
         td_2[i].setAttribute('id', tdIdName);
         td_2[i].style.backgroundColor = bgColor_2;
         tr_1[i].appendChild(td_2[i]);
         font_2[i] = m.createElement('font');
         font_2[i].setAttribute('color', fgColor_2);
         fontIdName = 'font' + (i + 1) + '_2';
         font_2[i].setAttribute('id', fontIdName);
         nodes = fc2[i].split("\u2518");
         br = new Array(nodes.length - 1);
         if(nodes.length == 1)
         {
            font_2[i].appendChild(m.createTextNode(nodes[0]));
         }
         else
         {
            font_2[i].appendChild(m.createTextNode(nodes[0]));
            for(j = 1; j < nodes.length; j ++ )
            {
               br[i - 1] = t.createElement("br");
               font_2[i].appendChild(br[i - 1]);
               font_2[i].appendChild(t.createTextNode(nodes[j]));
            }
         }
         td_2[i].appendChild(font_2[i]);
         m.write('</td>');
      }
      if(numFcTypes == 3)
      {
         td_3[i] = m.createElement("td");
         tdIdName = 'td' + (i + 1) + '_3';
         td_3[i].setAttribute('id', tdIdName);
         td_3[i].style.backgroundColor = bgColor_3;
         tr_1[i].appendChild(td_3[i]);
         font_3[i] = m.createElement('font');
         font_3[i].setAttribute('color', fgColor_3);
         fontIdName = 'font' + (i + 1) + '_3';
         font_3[i].setAttribute('id', fontIdName);
         nodes = fc3[i].split("\u2518");
         br = new Array(nodes.length - 1);
         if(nodes.length == 1)
         {
            font_3[i].appendChild(m.createTextNode(nodes[0]));
         }
         else
         {
            font_3[i].appendChild(m.createTextNode(nodes[0]));
            for(j = 1; j < nodes.length; j ++ )
            {
               br[i - 1] = t.createElement("br");
               font_3[i].appendChild(br[i - 1]);
               font_3[i].appendChild(t.createTextNode(nodes[j]));
            }
         }
         td_3[i].appendChild(font_3[i]);
      }
   }
   table_1.setAttribute('width', '98%');
   table_1.appendChild(tbody_1);
   m.write('</table>');
   m.body.appendChild(table_1);
   fc1 = null;
   fc2 = null;
   fc3 = null;
   m.body.bgColor = '#DBE9E9';
}
function setupFcDisplay(st)
{
   var msg;
   switch(st)
   {
      case 1 :
      var DispFps = fps / 1000.0;
      DispFps = DispFps.toFixed(2);
      if(DispFps === 0)
      {
         DispFps = 0.01;
      }
      msg = "1 flash per " + DispFps + " sec.";
      break;
      case 2 :
      var DispFps = fps / 1000.0;
      DispFps = DispFps.toFixed(2);
      if(DispFps === 0)
      {
         DispFps = 0.01;
      }
      msg = "1 flash per " + DispFps + " sec.";
      break;
      case 3 :
      msg = "---";
      break;
      case 4 :
      msg = "+++";
      break;
      case 5 :
      msg = "---";
      break;
      case 6 :
      msg = "+++";
      break;
   }
   t.write('<table id=\"table_2\" width=\"99%\" style=\"border:1px solid black;border-collapse:collapse;table-layout:fixed;\">');
   var table_2 = t.getElementById("table_2");
   table_2.style.verticalAlign = 'middle';
   t.write('<tbody id=\"tBody_2\">');
   for(i = 0; i < numFcTypes; i ++ )
   {
      if(i === 0)
      {
         t.write('<tr id=\"tr\" align=\"center\" bgcolor=\"'+bgColor_1+'\" style=\"height:'+row_height+'px;\">');
         t.write('<td id=\"td1\" valign=\"middle\">');
         td1 = t.getElementById('td1');
         cloneFont_1 = t.createElement('font');
         cloneFont_1.setAttribute('id', 'cloneFont_1');
         td1.appendChild(cloneFont_1);
         if(st > 0)
         {
            cloneFont_1.style.fontSize = strpx;
            cloneFont_1.style.color = fgColor_1;
            cloneFont_1.style.fontWeight = 'bold';
            cloneFont_1.appendChild(t.createTextNode(msg));
         }
         t.write('</td>');
         t.write('</tr>');
      }
      if(i == 1)
      {
         t.write('<tr id=\"tr2\" align=\"center\" bgcolor=\"'+bgColor_2+'\" style=\"height:'+row_height+'px;\">');
         t.write('<td id=\"td2\" valign=\"middle\">');
         td2 = t.getElementById('td2');
         cloneFont_2 = t.createElement('font');
         cloneFont_2.setAttribute('id', 'cloneFont_2');
         td2.appendChild(cloneFont_2);
         if(st > 0)
         {
            cloneFont_2.style.fontSize = strpx;
            cloneFont_2.style.color = fgColor_2;
            cloneFont_2.style.fontWeight = 'bold';
            cloneFont_2.appendChild(t.createTextNode(msg));
         }
         t.write('</td>');
         t.write('</tr>');
      }
      if(i == 2)
      {
         t.write('<tr id=\"tr3\" align=\"center\" bgcolor=\"'+bgColor_3+'\" style=\"height:'+row_height+'px;\">');
         t.write('<td id=\"td3\" valign=\"middle\">');
         td3 = t.getElementById('td3');
         cloneFont_3 = t.createElement('font');
         cloneFont_3.setAttribute('id', 'cloneFont_3');
         td3.appendChild(cloneFont_3);
         if(st > 0)
         {
            cloneFont_3.style.fontSize = strpx;
            cloneFont_3.style.color = fgColor_3;
            cloneFont_3.style.fontWeight = 'bold';
            cloneFont_3.appendChild(t.createTextNode(msg));
         }
         t.write('</td>');
         t.write('</tr>');
      }
   }
   t.write('</tbody>');
   t.write('</table>');
}
function fcDisplay(fcRow)
{
   var fontIdName;
   if(fcRow == 1)
   {
      var td1 = t.getElementById('td1');
      fontIdName = 'font' + r + '_1';
      var font_1 = m.getElementById(fontIdName);
      var cloneFont_1 = font_1.cloneNode(true);
      cloneFont_1.setAttribute('id', 'cloneFont_1');
      td1.appendChild(cloneFont_1);
      strpx = "" + font_size + 'px';
      cloneFont_1.style.fontSize = strpx;
   }
   if(fcRow == 2)
   {
      var td2 = t.getElementById('td2');
      fontIdName = 'font' + r + '_2';
      var font_2 = m.getElementById(fontIdName);
      var cloneFont_2 = font_2.cloneNode(true);
      cloneFont_2.setAttribute('id', 'cloneFont_2');
      td2.appendChild(cloneFont_2);
      strpx = "" + font_size + 'px';
      cloneFont_2.style.fontSize = strpx;
   }
   if(fcRow == 3)
   {
      var td3 = t.getElementById('td3');
      fontIdName = 'font' + r + '_3';
      var font_3 = m.getElementById(fontIdName);
      var cloneFont_3 = font_3.cloneNode(true);
      cloneFont_3.setAttribute('id', 'cloneFont_3');
      td3.appendChild(cloneFont_3);
      strpx = "" + font_size + 'px';
      cloneFont_3.style.fontSize = strpx;
   }
}
function clearFcDisplay()
{
   for(i = 0; i < numFcTypes; i ++ )
   {
      if(i === 0)
      {
         var td1 = t.getElementById('td1');
         var cloneFont_1 = t.getElementById('cloneFont_1');
         if(t.getElementById('cloneFont_1') !== null && t.getElementById('cloneFont_1') != 'undefined')
         {
            if(cloneFont_1.hasChildNodes())
            {
               while(cloneFont_1.childNodes.length >= 1)
               {
                  cloneFont_1.removeChild(cloneFont_1.firstChild);
               }
            }
            td1.removeChild(cloneFont_1);
         }
      }
      if(i == 1)
      {
         var td2 = t.getElementById('td2');
         var cloneFont_2 = t.getElementById('cloneFont_2');
         if(t.getElementById('cloneFont_2') != null && t.getElementById('cloneFont_2') != 'undefined')
         {
            if(cloneFont_2.hasChildNodes())
            {
               while(cloneFont_2.childNodes.length >= 1)
               {
                  cloneFont_2.removeChild(cloneFont_2.firstChild);
               }
            }
            td2.removeChild(cloneFont_2);
         }
      }
      if(i == 2)
      {
         var td3 = t.getElementById('td3');
         var cloneFont_3 = t.getElementById('cloneFont_3');
         if(t.getElementById('cloneFont_3') !== null && t.getElementById('cloneFont_3') != 'undefined')
         {
            if(cloneFont_3.hasChildNodes())
            {
               while(cloneFont_3.childNodes.length >= 1)
               {
                  cloneFont_3.removeChild(cloneFont_3.firstChild);
               }
            }
            td3.removeChild(cloneFont_3);
         }
      }
   }
}
function loopFC(nextRow)
{
   if(timer_ctr === 0)
   {
      var cbROID = b.getElementById('cbROID');
      if(cbROID.checked)
      {
         r = Math.floor(Math.random() * num_recs) + 1;
         while(r == prev_num)
         {
            r = Math.floor(Math.random() * num_recs) + 1;
         }
         prev_num = r;
      }
      else
      {
         r ++ ;
         if(r > (num_recs))
         {
            r = 1;
         }
      }
      clearFcDisplay();
   }
   switch(timer_ctr)
   {
      case 0 :
      fcDisplay(1);
      break;
      case 1 :
      fcDisplay(2);
      break;
      case 2 :
      fcDisplay(3);
      break;
      default :
      fcDisplay(1);
   }
   timer_ctr ++ ;
   if(timer_ctr > (numFcTypes - 1))
   {
      timer_ctr = 0;
   }
}
function pauseFC()
{
   clearInterval(timeoutID);
   addRemoveButtons(35, 7);
}
function continueFC()
{
   var cbManualID = b.getElementById('cbManualID');
   if(cbManualID.checked)
   {
      addRemoveButtons(7, 6);
   }
   else
   {
      addRemoveButtons(83, 6);
   }
   timer_ctr = 0;
   if(autopilot == 1)
   {
      timeoutID = setInterval('loopFC(0)', fps);
   }
   else
   {
      loopFC(0);
   }
}
function autoFC()
{
   parent.document.getElementById('f').rows = '75,0,25';
   var cbManualID = b.getElementById('cbManualID');
   if(cbManualID.checked)
   {
      clearInterval(timeoutID);
      autopilot = 0;
      addRemoveButtons(23, 4);
   }
   else
   {
      autopilot = 1;
      addRemoveButtons(83, 3);
   }
   if(autopilot == 1)
   {
      timeoutID = setInterval('loopFC(1)', fps);
   }
   else
   {
      loopFC(1);
   }
}
function manualFC()
{
   clearInterval(timeoutID);
   var cbManualID = b.getElementById('cbManualID');
   if(cbManualID.checked)
   {
      autopilot = 0;
      if(adjustingSettings == 0)
      {
         setNext(1);
         setPlay(0);
         setContinue(0);
         setPause(0);
      }
   }
   else
   {
      autopilot = 1;
      if(adjustingSettings == 0)
      {
         setNext(0);
         setContinue(0);
         setPlay(1);
         setPause(0);
      }
   }
}
function listFC()
{
   parent.document.getElementById('f').rows = '0,80,20';
   clearInterval(timeoutID);
   addRemoveButtons(0, 2);
}
function showDisclaimer()
{
   var disclaimer = "This flashcard has not been verified by Carlsflashcards.com ";
   disclaimer += "for accuracy. "; disclaimer += "This flashcard is provided on an 'as is' basis. ";
   disclaimer += "Carlsflashcards.com, its owner, officers and employees will ";
   disclaimer += "not be responsible for any claims attributable to errors, "; disclaimer += "omissions, or other inaccuracies in this flashcard. ";
   disclaimer += "The entire risk for the results and performance of this "; disclaimer += "flashcard is assumed by you, the user.";
   alert(disclaimer);
}
function slowerSpeed()
{
   clearInterval(timeoutID);
   addRemoveButtons(35, 1);
   fps += 100;
   if(fps > 20000)
   {
      fps = 20000;
   }
   t.close();
   t.open();
   setupFcDisplay(1);
}
function fasterSpeed()
{
   clearInterval(timeoutID);
   addRemoveButtons(35, 1);
   if(fps < 101)
   {
      fps = 1;
   }
   else
   {
      fps -= 100;
   }
   t.close();
   t.open();
   setupFcDisplay(2);
}
function smallerFont()
{
   clearInterval(timeoutID);
   addRemoveButtons(35, 1);
   if(font_size < 3)
   {
      font_size = 2;
   }
   else
   {
      font_size -= 2;
   }
   strpx = "" + font_size + 'px';
   t.close();
   t.open();
   setupFcDisplay(3);
}
function largerFont()
{
   clearInterval(timeoutID);
   addRemoveButtons(35, 1);
   font_size += 2;
   if(font_size > 200)
   {
      font_size = 200;
   }
   strpx = "" + font_size + 'px';
   t.close();
   t.open();
   setupFcDisplay(4);
}
function shorterRow()
{
   clearInterval(timeoutID);
   addRemoveButtons(35, 1);
   if(row_height < 3)
   {
      row_height = 2
   }
   else
   {
      row_height -= 2;
   }
   t.close();
   t.open();
   setupFcDisplay(5);
}
function tallerRow()
{
   clearInterval(timeoutID);
   addRemoveButtons(35, 1);
   row_height += 2;
   t.close();
   t.open();
   setupFcDisplay(6);
}
function setPlay(onOffBit)
{
   var td_play = b.getElementById('td_play');
   var autoID = b.getElementById('autoID');
   if(onOffBit == 1)
   {
      if( ! autoID)
      {
         autoID = b.createElement('input');
         autoID.setAttribute('id', 'autoID');
         autoID.setAttribute('value', 'Play');
         autoID.setAttribute('type', 'button');
         autoID.setAttribute('onclick', 'autoFC');
         autoID.onclick = function()
         {
            autoFC();
         }
         td_play.appendChild(autoID);
      }
   }
   else
   {
      if(autoID)
      {
         td_play.removeChild(autoID);
      }
   }
}
function setNext(onOffBit)
{
   var td_play = b.getElementById('td_play');
   var nextID = b.getElementById('nextID');
   if(onOffBit == 1)
   {
      if( ! nextID)
      {
         nextID = b.createElement('input');
         nextID.setAttribute('id', 'nextID');
         nextID.setAttribute('value', 'Next');
         nextID.setAttribute('type', 'button');
         nextID.setAttribute('onclick', 'autoFC');
         nextID.onclick = function()
         {
            autoFC();
         }
         td_play.appendChild(nextID);
      }
   }
   else
   {
      if(nextID)
      {
         td_play.removeChild(nextID);
      }
   }
}
function setContinue(onOffBit)
{
   var td_play = b.getElementById('td_play');
   var continueID = b.getElementById('continueID');
   if(onOffBit == 1)
   {
      if( ! continueID)
      {
         continueID = b.createElement('input');
         continueID.setAttribute('id', 'continueID');
         continueID.setAttribute('value', 'Continue');
         continueID.setAttribute('type', 'button');
         continueID.setAttribute('onclick', 'continueFC()');
         continueID.onclick = function()
         {
            continueFC();
         }
         ;
         td_play.appendChild(continueID);
      }
   }
   else
   {
      if(continueID)
      {
         td_play.removeChild(continueID);
      }
   }
}
function setPause(onOffBit)
{
   var td_play = b.getElementById('td_play');
   var pauseID = b.getElementById('pauseID');
   if(onOffBit == 1)
   {
      if( ! pauseID)
      {
         pauseID = b.createElement('input');
         pauseID.setAttribute('id', 'pauseID');
         pauseID.setAttribute('value', 'Pause');
         pauseID.setAttribute('type', 'button');
         pauseID.setAttribute('onclick', 'pauseFC()');
         pauseID.onclick = function()
         {
            pauseFC();
         }
         ;
         td_play.appendChild(pauseID);
      }
   }
   else
   {
      if(pauseID)
      {
         td_play.removeChild(pauseID);
      }
   }
}
function addRemoveButtons(matchCode, srcCode)
{
   if(srcCode == 1)
   {
      adjustingSettings = 1;
   }
   else
   {
      adjustingSettings = 0;
   }
   var td_reset = b.getElementById('td_reset');
   var td_play = b.getElementById('td_play');
   var td_list_fc = b.getElementById('td_list_fc');
   var td_speed = b.getElementById('td_speed');
   var td_font_size = b.getElementById('td_font_size');
   var td_row_size = b.getElementById('td_row_size');
   var pauseID;
   var row_2;
   if(matchCode & 64)
   {
      setPause(1);
   }
   else
   {
      setPause(0);
   }
   if(matchCode & 32)
   {
      setContinue(1);
   }
   else
   {
      setContinue(0);
   }
   var cbManualID = b.getElementById('cbManualID');
   if((srcCode == 2) || (srcCode == 5))
   {
      if((cbManualID) && (cbManualID.checked))
      {
         matchCode = matchCode | 4;
      }
      else
      {
         matchCode = matchCode | 8;
      }
   }
   if(matchCode & 8)
   {
      setPlay(1);
   }
   else
   {
      setPlay(0);
   }
   if(matchCode & 4)
   {
      setNext(1);
   }
   else
   {
      setNext(0);
   }
   var list_fc;
   if(matchCode & 2)
   {
      list_fc = b.getElementById('list_fc');
      if( ! list_fc)
      {
         list_fc = b.createElement('input');
         list_fc.setAttribute('id', 'list_fc');
         list_fc.setAttribute('value', 'List Flashcards');
         list_fc.setAttribute('type', 'button');
         list_fc.setAttribute('onclick', 'listFC()');
         list_fc.onclick = function()
         {
            listFC();
         }
         td_list_fc.appendChild(list_fc);
      }
   }
   else
   {
      list_fc = b.getElementById('list_fc');
      if(list_fc)
      {
         td_list_fc.removeChild(list_fc);
      }
   }
   if(matchCode & 1)
   {
      row_2 = b.getElementById('slowerSpeedID');
      if( ! row_2)
      {
         slowerSpeedID = b.createElement('input');
         slowerSpeedID.setAttribute('id', 'slowerSpeedID');
         slowerSpeedID.setAttribute('value', '-');
         slowerSpeedID.setAttribute('type', 'button');
         slowerSpeedID.setAttribute('onclick', 'slowerSpeed()');
         slowerSpeedID.onclick = function()
         {
            slowerSpeed();
         }
         ;
         fasterSpeedID = b.createElement('input');
         fasterSpeedID.setAttribute('id', 'fasterSpeedID');
         fasterSpeedID.setAttribute('value', '+');
         fasterSpeedID.setAttribute('type', 'button');
         fasterSpeedID.setAttribute('onclick', 'fasterSpeed()');
         fasterSpeedID.onclick = function()
         {
            fasterSpeed();
         }
         ;
         smallerFontID = b.createElement('input');
         smallerFontID.setAttribute('id', 'smallerFontID');
         smallerFontID.setAttribute('value', '-');
         smallerFontID.setAttribute('type', 'button');
         smallerFontID.setAttribute('onclick', 'smallerFont()');
         smallerFontID.onclick = function()
         {
            smallerFont();
         }
         ;
         largerFontID = b.createElement('input');
         largerFontID.setAttribute('id', 'largerFontID');
         largerFontID.setAttribute('value', '+');
         largerFontID.setAttribute('type', 'button');
         largerFontID.setAttribute('onclick', 'largerFont()');
         largerFontID.onclick = function()
         {
            largerFont();
         }
         ;
         shorterRowID = b.createElement('input');
         shorterRowID.setAttribute('id', 'shorterRowID');
         shorterRowID.setAttribute('value', '-');
         shorterRowID.setAttribute('type', 'button');
         shorterRowID.setAttribute('onclick', 'shorterRow()');
         shorterRowID.onclick = function()
         {
            shorterRow();
         }
         tallerRowID = b.createElement('input');
         tallerRowID.setAttribute('id', 'tallerRowID');
         tallerRowID.setAttribute('value', '+');
         tallerRowID.setAttribute('type', 'button');
         tallerRowID.setAttribute('onclick', 'tallerRow()');
         tallerRowID.onclick = function()
         {
            tallerRow();
         }
         var whiteFontManually = b.createElement('font');
         whiteFontManually.setAttribute('color', 'white');
         whiteFontManually.appendChild(b.createTextNode('Speed '));
         td_speed.appendChild(whiteFontManually);
         td_speed.appendChild(slowerSpeedID);
         td_speed.appendChild(fasterSpeedID);
         var whiteFontManually = b.createElement('font');
         whiteFontManually.setAttribute('color', 'white');
         whiteFontManually.appendChild(b.createTextNode('Font Size '));
         td_font_size.appendChild(whiteFontManually);
         td_font_size.appendChild(smallerFontID);
         td_font_size.appendChild(largerFontID);
         var whiteFontManually = b.createElement('font');
         whiteFontManually.setAttribute('color', 'white');
         whiteFontManually.appendChild(b.createTextNode('Row Height '));
         td_row_size.appendChild(whiteFontManually);
         td_row_size.appendChild(shorterRowID);
         td_row_size.appendChild(tallerRowID);
      }
   }
   else
   {
      row_2 = b.getElementById('slowerSpeedID');
      if(row_2)
      {
         if(td_speed.hasChildNodes())
         {
            while(td_speed.childNodes.length >= 1)
            {
               td_speed.removeChild(td_speed.firstChild);
            }
         }
         if(td_font_size.hasChildNodes())
         {
            while(td_font_size.childNodes.length >= 1)
            {
               td_font_size.removeChild(td_font_size.firstChild);
            }
         }
         if(td_row_size.hasChildNodes())
         {
            while(td_row_size.childNodes.length >= 1)
            {
               td_row_size.removeChild(td_row_size.firstChild);
            }
         }
      }
   }
}




// #####################################################################################
// #####################################################################################
// #####################################################################################
// #####################################################################################


// NEW NEW NEW NEW




function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /image.*/;
    
    if (!file.type.match(imageType)) {
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img);
    
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

function onDrop(e)
{
  var data = e.dataTransfer.getData("text/plain");
  e.target.textContent = data;
  e.preventDefault();
}


// #####################################################################################
// #####################################################################################
// #####################################################################################
// #####################################################################################



function loadControlPanel()
{
   b.write('</head>');
   b.write('<body bgcolor="#000" id="b_body">');
   b.body.bgColor = '#000';
   var b_body = b.body;
   var b_form = b.createElement('form'); b_form.setAttribute('id', 'b_form'); b_body.appendChild(b_form); var ctrl_table = b.createElement('table');
   ctrl_table.setAttribute('id', 'ctrl_table');
   ctrl_table.setAttribute('width', '99%');
   ctrl_table.setAttribute('bgcolor', '#000');
   b_form.appendChild(ctrl_table); var ctrl_tbody = b.createElement('tbody');
   ctrl_tbody.setAttribute('id', 'ctrl_tbody');
   ctrl_table.appendChild(ctrl_tbody);
   var m_tr_1 = b.createElement('tr');
   m_tr_1.setAttribute('id', 'm_tr_1');
   m_tr_1.setAttribute('align', 'center');
   ctrl_tbody.appendChild(m_tr_1);
   var m_tr_2 = b.createElement('tr');
   m_tr_2.setAttribute('id', 'm_tr_2');
   m_tr_2.setAttribute('align', 'center');
   ctrl_tbody.appendChild(m_tr_2);
   var m_tr_3 = b.createElement('tr');
   m_tr_3.setAttribute('id', 'm_tr_3');
   m_tr_3.setAttribute('align', 'center');
   ctrl_tbody.appendChild(m_tr_3);
   var m_tr_4 = b.createElement('tr');
   m_tr_4.setAttribute('id', 'm_tr_4');
   m_tr_4.setAttribute('align', 'center');
   ctrl_tbody.appendChild(m_tr_4);
   var td_reset = b.createElement('td');
   td_reset.setAttribute('id', 'td_reset');
   m_tr_1.appendChild(td_reset);
   var whiteFontRandom = b.createElement('font');
   whiteFontRandom.setAttribute('color', 'white');
   whiteFontRandom.appendChild(b.createTextNode('Random '));
   td_reset.appendChild(whiteFontRandom);
   var cbROID = b.createElement('input');
   cbROID.setAttribute('id', 'cbROID');
   cbROID.setAttribute('type', 'checkbox');
   td_reset.appendChild(cbROID);
   if(cbRO == '1')
   {
      cbROID.setAttribute('checked', true);
   }
   var td_play = b.createElement('td');
   td_play.setAttribute('id', 'td_play');
   m_tr_1.appendChild(td_play);
   var autoID = b.createElement('input');
   autoID.setAttribute('id', 'autoID');
   autoID.setAttribute('value', 'Play');
   autoID.setAttribute('type', 'button');
   autoID.setAttribute('onclick', 'autoFC()')
   autoID.onclick = function()
   {
      autoFC();
   }
   var cbManualID = b.createElement('input');
   cbManualID.setAttribute('id', 'cbManualID');
   cbManualID.setAttribute('type', 'checkbox');
   cbManualID.setAttribute('onchange', 'manualFC()')
   cbManualID.onclick = function()
   {
      manualFC();
   }
   var whiteFontManually = b.createElement('font');
   whiteFontManually.setAttribute('color', 'white');
   whiteFontManually.appendChild(b.createTextNode('Run manually '));
   td_play.appendChild(whiteFontManually);
   td_play.appendChild(cbManualID);
   td_play.appendChild(b.createTextNode(' '));
   td_play.appendChild(autoID);
   var td_list_fc = b.createElement('td');
   td_list_fc.setAttribute('id', 'td_list_fc');
   m_tr_1.appendChild(td_list_fc);
   var td_speed = b.createElement('td');
   td_speed.setAttribute('id', 'td_speed');
   m_tr_2.appendChild(td_speed);
   var td_font_size = b.createElement('td');
   td_font_size.setAttribute('id', 'td_font_size');
   m_tr_2.appendChild(td_font_size);
   var td_row_size = b.createElement('td');
   td_row_size.setAttribute('id', 'td_row_size');
   m_tr_2.appendChild(td_row_size);
   var td_loop_settings = b.createElement('td');
   td_loop_settings.setAttribute('id', 'td_loop_settings');
   m_tr_3.appendChild(td_loop_settings);
   var homeAnchor = b.createElement("a");
   homeAnchor.setAttribute("name", "homeAnchor");
   homeAnchor.setAttribute("id", "homeAnchor");
   homeAnchor.setAttribute("target", "self");
   homeAnchor.href = "http://carlsflashcards.com/index.php";
   td_loop_settings.appendChild(homeAnchor);
   var lightBlueFont = b.createElement('font');
   lightBlueFont.appendChild(b.createTextNode("carlsflashcards.com"));
   lightBlueFont.setAttribute('color', '#AEB2FE');
   homeAnchor.appendChild(lightBlueFont);
   var td_vote;
   td_vote = b.createElement('td');
   td_vote.setAttribute('id', 'td_vote');
   m_tr_3.appendChild(td_vote);
   var selVote = b.createElement('select');
   selVote.setAttribute('id', 'selVote');
   if((hostname == "localhost") || (hostname == "carlsflashcards.com") || (hostname == "www.carlsflashcards.com"))
   {
      var optBlank = b.createElement('option');
      optBlank.value = '0';
      optBlank.appendChild(b.createTextNode('Rate This'));
      selVote.appendChild(optBlank);
      var optExcellent = b.createElement('option');
      optExcellent.value = '4';
      optExcellent.appendChild(b.createTextNode('Excellent'));
      selVote.appendChild(optExcellent);
      var optGood = b.createElement('option');
      optGood.value = '3';
      optGood.appendChild(b.createTextNode('Good'));
      selVote.appendChild(optGood);
      var optOK = b.createElement('option');
      optOK.value = '2';
      optOK.appendChild(b.createTextNode('OK'));
      selVote.appendChild(optOK);
      var optBad = b.createElement('option');
      optBad.value = '1';
      optBad.appendChild(b.createTextNode('Bad'));
      selVote.appendChild(optBad);
      var optOffensive = b.createElement('option');
      optOffensive.value = '-3';
      optOffensive.appendChild(b.createTextNode('Offensive'));
      selVote.appendChild(optOffensive);
      var optSpam = b.createElement('option');
      optSpam.value = '-2';
      optSpam.appendChild(b.createTextNode('Spam'));
      selVote.appendChild(optSpam);
      var optWrongCat = b.createElement('option');
      optWrongCat.value = '-1';
      optWrongCat.appendChild(b.createTextNode('Wrong Category'));
      selVote.appendChild(optWrongCat);
      td_vote.appendChild(selVote);
      var sendID = b.createElement('input');
      sendID.setAttribute('name', 'sendID');
      sendID.setAttribute('id', 'sendID');
      sendID.setAttribute('value', 'Send');
      sendID.setAttribute('type', 'button');
      sendID.setAttribute('onclick', 'sendVote()')
      sendID.onclick = function()
      {
         sendVote();
      }
      td_vote.appendChild(sendID);
   }
   var td_links = b.createElement('td');
   td_links.setAttribute('id', 'td_links');
   m_tr_3.appendChild(td_links);
   var mailAnchor = b.createElement("a");
   mailAnchor.setAttribute("name", "mailAnchor");
   mailAnchor.setAttribute("id", "mailAnchor");
   mailAnchor.setAttribute("target", "_blank");
   mailAnchor.href = "mailto://?subject=Flashcard&body=http://carlsflashcards.com/f/f" + file_id  + ".html";
   td_links.appendChild(mailAnchor);
   var fontSend = b.createElement('font');
   fontSend.setAttribute('color', '#AEB2FE');
   mailAnchor.appendChild(fontSend);
   fontSend.appendChild(b.createTextNode('Send to a Friend '));
   td_links.appendChild(b.createTextNode(" "));
   var helpAnchor = b.createElement("a");
   helpAnchor.setAttribute("name", "helpAnchor");
   helpAnchor.setAttribute("id", "helpAnchor");
   helpAnchor.setAttribute("target", "_blank");
   helpAnchor.href = "http://carlsflashcards.com/h/hdf.html";
   td_links.appendChild(helpAnchor);
   var lightBlueFont = b.createElement('font');
   lightBlueFont.setAttribute('color', '#AEB2FE');
   helpAnchor.appendChild(lightBlueFont);
   lightBlueFont.appendChild(b.createTextNode(' Help'));
   var td_copyright = b.createElement('td');
   td_copyright.setAttribute('id', 'td_copyright');
   m_tr_4.appendChild(td_copyright);
   var whiteFontCr = b.createElement('font');
   whiteFontCr.setAttribute('color', 'white');
   whiteFontCr.style.fontSize = 10;
   whiteFontCr.appendChild(b.createTextNode('\u00a9 Copyright 2010 Carl Olson, all rights reserved.'));
   td_copyright.appendChild(whiteFontCr);
   var td_disclaimer = b.createElement('td');
   td_disclaimer.setAttribute('id', 'td_disclaimer');
   m_tr_4.appendChild(td_disclaimer);
   var discAnchor = b.createElement("a");
   discAnchor.setAttribute("name", "discAnchor");
   discAnchor.setAttribute("id", "discAnchor");
   discAnchor.setAttribute("target", "_blank");
   discAnchor.setAttribute('onclick', 'showDisclaimer()')
   discAnchor.onclick = function()
   {
      showDisclaimer();
   }
   td_disclaimer.appendChild(discAnchor);
   var lightBlueFont2 = b.createElement('font');
   lightBlueFont2.style.textDecoration = "underline";
   lightBlueFont2.style.cursor = "pointer";
   lightBlueFont2.setAttribute('color', '#AEB2FE');
   lightBlueFont2.style.fontSize = 10;
   discAnchor.appendChild(lightBlueFont2);
   lightBlueFont2.appendChild(b.createTextNode(' Disclaimer'));
}
