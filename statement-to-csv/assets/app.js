(function(){
"use strict";

/* ============================================================
   CONFIG — the two values you edit after setting up Stripe
   ============================================================ */
var CONFIG = {
  // ---- EDIT THESE TWO, THEN YOU CAN SELL ----------------------------------
  // 1. Your hosted checkout. Stripe Payment Link, Gumroad, Lemon Squeezy — any
  //    URL that takes a card. No API key and no server involved.
  buyUrl: "https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK",
  // 2. Where a buyer with a problem reaches you. A real inbox you read.
  supportEmail: "REPLACE_WITH_YOUR_EMAIL",
  // -------------------------------------------------------------------------
  // Generated once for this install. tools/genkey.mjs reads it from this file,
  // so there is nothing to keep in sync. Change it and every key you have
  // already sold stops working.
  salt: "siq-m4Rtzx56ieZO",
  freeRowLimit: 25
};

/* ============================================================
   Licence — deterrence-grade, see README before you rely on it
   ============================================================ */
function h32(s){
  var h1=0x811c9dc5>>>0, h2=0x01000193>>>0, i;
  for(i=0;i<s.length;i++){
    h1 = (h1 ^ s.charCodeAt(i))>>>0;
    h1 = Math.imul(h1,16777619)>>>0;
    h2 = (Math.imul(h2 ^ s.charCodeAt(i), 2246822519) + i)>>>0;
  }
  var A="0123456789ABCDEFGHJKMNPQRSTVWXYZ", out="", v=(BigInt(h1)<<32n)|BigInt(h2);
  for(i=0;i<5;i++){ out = A[Number(v & 31n)] + out; v >>= 5n; }
  return out;
}
function keyValid(k){
  var m=/^SIQ-([0-9A-HJKMNP-TV-Z]{5})-([0-9A-HJKMNP-TV-Z]{5})-([0-9A-HJKMNP-TV-Z]{5})$/.exec(String(k||"").trim().toUpperCase());
  return !!m && h32(m[1]+m[2]+CONFIG.salt) === m[3];
}
var store = {
  get:function(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
};
var PRO = keyValid(store.get("siq.key"));

/* ============================================================
   Parsing
   ============================================================ */
// Accepts both 1,234.56 and 1.234,56 — which one this document means is
// decided once, by majority, in detectNumFmt().
var AMOUNT_RE = /^[(\-−+]?\s*[$€£¥]?\s*(?:\d{1,3}(?:[.,  ]\d{3})*[.,]\d{2}|\d+[.,]\d{2})\s*\)?\s*(?:CR|DR|EUR|USD|GBP)?[\-−]?$/i;
var AMOUNT_RE_ALT = AMOUNT_RE;
var NUMFMT = "us"; // or "eu"
var MON = "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec";
var DATE_RES = [
  new RegExp("^\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}$"),
  new RegExp("^\\d{1,2}[-/.]\\d{1,2}(?:[-/.]\\d{2,4})?$"),
  new RegExp("^(?:"+MON+")[a-z]*\\.?\\s*\\d{1,2}(?:,?\\s*\\d{2,4})?$","i"),
  new RegExp("^\\d{1,2}\\s*(?:"+MON+")[a-z]*\\.?(?:\\s*\\d{2,4})?$","i")
];
function isAmount(s){ s=s.trim(); return AMOUNT_RE.test(s)||AMOUNT_RE_ALT.test(s); }
function isDate(s){
  s=s.trim().replace(/\s+/g," ");
  for(var i=0;i<DATE_RES.length;i++) if(DATE_RES[i].test(s)) return true;
  return false;
}

// Which separator is the decimal point? Whichever one sits before the final
// two digits more often across the whole document.
function detectNumFmt(strings){
  var us=0, eu=0;
  for(var i=0;i<strings.length;i++){
    var s=strings[i];
    if(/,\d{2}\s*\)?\s*(?:CR|DR)?[\-−]?$/i.test(s) && /[.  ]\d{3}|^\D*\d{1,3},\d{2}/.test(s)) eu++;
    if(/\.\d{2}\s*\)?\s*(?:CR|DR)?[\-−]?$/i.test(s)) us++;
    else if(/,\d{2}\s*\)?\s*(?:CR|DR)?[\-−]?$/i.test(s)) eu++;
  }
  return eu>us ? "eu" : "us";
}

function parseAmount(s){
  var t=String(s).trim(), neg=false;
  if(/^\(.*\)$/.test(t)){ neg=true; t=t.slice(1,-1); }
  if(/^[-−]/.test(t)){ neg=true; t=t.replace(/^[-−]\s*/,""); }
  if(/[-−]$/.test(t)){ neg=true; t=t.replace(/[-−]$/,""); }
  if(/\bDR\b/i.test(t)) neg=true;
  if(/\bCR\b/i.test(t)) neg=false;
  if(NUMFMT==="eu"){
    t=t.replace(/[^0-9.,]/g,"").replace(/\./g,"").replace(",",".");
  } else {
    t=t.replace(/[^0-9.,]/g,"").replace(/,/g,"");
  }
  var n=parseFloat(t);
  if(!isFinite(n)) return null;
  return neg ? -n : n;
}

// cells: merge text items that visually touch, keeping x span
function toCells(items){
  var out=[], cur=null, GAP=5.5;
  items.sort(function(a,b){ return a.x-b.x; });
  for(var i=0;i<items.length;i++){
    var it=items[i];
    if(cur && it.x - (cur.x+cur.w) < GAP){
      cur.str += (it.x-(cur.x+cur.w) > 1.0 ? " " : "") + it.str;
      cur.w = (it.x + it.w) - cur.x;
    } else {
      cur = { str:it.str, x:it.x, w:it.w };
      out.push(cur);
    }
  }
  for(var j=0;j<out.length;j++){ out[j].str=out[j].str.replace(/\s+/g," ").trim(); out[j].right=out[j].x+out[j].w; }
  return out.filter(function(c){ return c.str.length; });
}

function pageRows(items, pageNo){
  var TOL=3.2, rows=[], cur=null;
  items.sort(function(a,b){ return (b.y-a.y) || (a.x-b.x); });
  for(var i=0;i<items.length;i++){
    var it=items[i];
    if(!cur || Math.abs(cur.y-it.y) > TOL){ cur={ y:it.y, page:pageNo, items:[] }; rows.push(cur); }
    cur.items.push(it);
  }
  return rows.map(function(r){ return { y:r.y, page:r.page, cells:toCells(r.items) }; })
             .filter(function(r){ return r.cells.length; });
}

async function readPdf(file, onPage){
  var buf = await file.arrayBuffer();
  var pdf = await pdfjsLib.getDocument({ data:buf, isEvalSupported:false }).promise;
  var all=[];
  for(var p=1;p<=pdf.numPages;p++){
    var page = await pdf.getPage(p);
    var tc = await page.getTextContent();
    var items=[];
    for(var i=0;i<tc.items.length;i++){
      var it=tc.items[i];
      if(!it.str || !it.str.trim()) continue;
      items.push({ str:it.str, x:it.transform[4], y:it.transform[5], w:it.width||0 });
    }
    all = all.concat(pageRows(items,p));
    if(onPage) onPage(p, pdf.numPages);
  }
  try{ pdf.destroy(); }catch(e){}
  return all;
}

// 1-D clustering on right edges — statements right-align numbers
function clusterRights(vals, gap){
  if(!vals.length) return [];
  var s=vals.slice().sort(function(a,b){return a-b;}), groups=[], cur=[s[0]];
  for(var i=1;i<s.length;i++){
    if(s[i]-s[i-1] > gap){ groups.push(cur); cur=[]; }
    cur.push(s[i]);
  }
  groups.push(cur);
  return groups.map(function(g){
    var sum=0; for(var i=0;i<g.length;i++) sum+=g[i];
    return { min:g[0], max:g[g.length-1], center:sum/g.length, count:g.length };
  }).filter(function(c){ return c.count>=2; });
}

function analyse(rows){
  // a transaction row needs a date near the left and at least one amount
  var txRows=[], rights=[];
  for(var i=0;i<rows.length;i++){
    var cells=rows[i].cells, dIdx=-1, amts=[];
    for(var c=0;c<Math.min(cells.length,3) && dIdx<0;c++){
      if(isDate(cells[c].str)) dIdx=c;
      else if(c+1<cells.length && isDate(cells[c].str+" "+cells[c+1].str)) dIdx=c;
    }
    for(var k=0;k<cells.length;k++) if(isAmount(cells[k].str)) amts.push(cells[k]);
    if(dIdx>=0 && amts.length){
      txRows.push({ row:rows[i], dIdx:dIdx, amts:amts });
      for(var a=0;a<amts.length;a++) rights.push(amts[a].right);
    }
  }
  var cols = clusterRights(rights, 22);
  var amtStrings=[];
  for(var m=0;m<txRows.length;m++)
    for(var n=0;n<txRows[m].amts.length;n++) amtStrings.push(txRows[m].amts[n].str);
  NUMFMT = detectNumFmt(amtStrings);
  return { txRows:txRows, cols:cols, rows:rows, numfmt:NUMFMT };
}

function defaultRoles(n){
  if(n<=0) return [];
  if(n===1) return ["amount"];
  if(n===2) return ["amount","balance"];
  if(n===3) return ["debit","credit","balance"];
  var r=[]; for(var i=0;i<n;i++) r.push(i===n-1?"balance":(i===n-2?"credit":(i===n-3?"debit":"ignore")));
  return r;
}

// typical baseline-to-baseline distance, used to tell a wrapped line from a footer
function medianLineGap(rows){
  var d=[];
  for(var i=1;i<rows.length;i++){
    if(rows[i].page!==rows[i-1].page) continue;
    var g=rows[i-1].y-rows[i].y;
    if(g>1 && g<60) d.push(g);
  }
  if(!d.length) return 14;
  d.sort(function(a,b){ return a-b; });
  return d[Math.floor(d.length/2)];
}

function buildTx(state){
  var cols=state.cols, roles=state.roles, out=[];
  var flip = document.getElementById("flipSign").checked;
  var merge = document.getElementById("mergeWrap").checked;
  var txIndex = {}; state.analysis.txRows.forEach(function(t){ txIndex[t.row.y+"|"+t.row.page]=t; });
  var lineGap = medianLineGap(state.analysis.rows);

  for(var i=0;i<state.analysis.rows.length;i++){
    var row=state.analysis.rows[i], t=txIndex[row.y+"|"+row.page];
    if(!t){
      // A wrapped description line, not a footer. Real continuations start inside
      // the description column and sit within a line or two of the row above;
      // page furniture sits at the left margin, further down.
      if(merge && out.length && row.cells.length && row.cells.length<=3){
        var last = out[out.length-1];
        var joined = row.cells.map(function(c){ return c.str; }).join(" ").trim();
        var indented = row.cells[0].x >= last._descX - 4;
        var close = row.page===last._page && (last._y - row.y) <= lineGap*2.2 && row.y < last._y;
        var furniture = /^(page\b|statement\b|continued\b|member\s+fdic|minimum\s+payment|questions\?)/i.test(joined);
        if(joined && joined.length<90 && indented && close && !furniture){
          last.description = (last.description+" "+joined).replace(/\s+/g," ").trim();
        }
      }
      continue;
    }
    var cells=row.cells, dCell=cells[t.dIdx], dateStr=dCell.str;
    if(!isDate(dateStr) && cells[t.dIdx+1]) dateStr = dCell.str+" "+cells[t.dIdx+1].str;

    var vals=[]; for(var z=0;z<cols.length;z++) vals.push(null);
    var firstAmtX=Infinity;
    for(var a=0;a<t.amts.length;a++){
      var am=t.amts[a], best=-1, bd=1e9;
      for(var c2=0;c2<cols.length;c2++){
        var d=Math.abs(am.right-cols[c2].center);
        if(d<bd){ bd=d; best=c2; }
      }
      if(best>=0 && bd<=34){ vals[best]=am.str; firstAmtX=Math.min(firstAmtX, am.x); }
    }

    var descParts=[], descX=null;
    for(var q=0;q<cells.length;q++){
      var cl=cells[q];
      if(q<=t.dIdx) continue;
      if(cl.x>=firstAmtX-1) continue;
      if(isAmount(cl.str)) continue;
      if(descX==null) descX=cl.x;
      descParts.push(cl.str);
    }
    if(descX==null) descX = dCell.x + 40;

    var amount=null, balance=null;
    for(var r2=0;r2<cols.length;r2++){
      if(vals[r2]==null) continue;
      var v=parseAmount(vals[r2]);
      if(v==null) continue;
      if(roles[r2]==="amount") amount = (amount==null? v : amount);
      else if(roles[r2]==="debit") amount = (amount==null? -Math.abs(v) : amount);
      else if(roles[r2]==="credit") amount = (amount==null? Math.abs(v) : amount);
      else if(roles[r2]==="balance") balance = v;
    }
    if(amount!=null && flip) amount = -amount;

    out.push({
      _page: row.page,
      _y: row.y,
      _descX: descX,
      date: dateStr.replace(/\s+/g," ").trim(),
      description: descParts.join(" ").replace(/\s+/g," ").trim(),
      amount: amount,
      balance: balance,
      keep: true
    });
  }
  return out;
}

/* ---------- date normalising ---------- */
var MONTHS={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12};
var DATE_ORDER="mdy";
function splitDate(s){
  s=s.trim().replace(/,/g," ").replace(/\s+/g," ");
  var m;
  if((m=/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.exec(s))) return {y:+m[1],m:+m[2],d:+m[3]};
  if((m=/^(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{2,4}))?$/.exec(s))){
    var y=m[3]?(+m[3]<100? 2000+ +m[3] : +m[3]):null;
    var a=+m[1], b=+m[2];
    // 13/07 can only be day-first; otherwise honour the user's choice
    var dayFirst = (a>12) || (b<=12 && DATE_ORDER==="dmy");
    return dayFirst ? {y:y,m:b,d:a} : {y:y,m:a,d:b};
  }
  if((m=/^([A-Za-z]{3,9})\.?\s*(\d{1,2})(?:\s+(\d{2,4}))?$/.exec(s))){
    var mo=MONTHS[m[1].toLowerCase().slice(0,4)]||MONTHS[m[1].toLowerCase().slice(0,3)];
    if(mo) return {y:m[3]?(+m[3]<100?2000+ +m[3]:+m[3]):null,m:mo,d:+m[2]};
  }
  if((m=/^(\d{1,2})\s*([A-Za-z]{3,9})\.?(?:\s+(\d{2,4}))?$/.exec(s))){
    var mo2=MONTHS[m[2].toLowerCase().slice(0,4)]||MONTHS[m[2].toLowerCase().slice(0,3)];
    if(mo2) return {y:m[3]?(+m[3]<100?2000+ +m[3]:+m[3]):null,m:mo2,d:+m[1]};
  }
  return null;
}
function fmtDate(raw, mode){
  if(mode==="raw") return raw;
  var p=splitDate(raw);
  if(!p||!p.m||!p.d) return raw;
  var y=p.y||new Date().getFullYear();
  var mm=String(p.m).padStart(2,"0"), dd=String(p.d).padStart(2,"0");
  if(mode==="iso") return y+"-"+mm+"-"+dd;
  if(mode==="us")  return mm+"/"+dd+"/"+y;
  return dd+"/"+mm+"/"+y;
}

/* ============================================================
   UI
   ============================================================ */
var $=function(id){ return document.getElementById(id); };
var state = { files:[], analysis:null, cols:[], roles:[], tx:[] };
var COPY_LABEL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="12" height="12"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg> Copy for spreadsheet';

// Pages differ in which blocks they carry — a landing page has no pricing
// table, for instance — so optional elements are wired only when present.
// Without this a single missing node throws and takes the converter with it.
var yr=$("yr"); if(yr) yr.textContent=new Date().getFullYear();
var buy=$("buyBtn"); if(buy) buy.href = CONFIG.buyUrl;
var supportLinks=document.querySelectorAll("[data-support]");
for(var si=0; si<supportLinks.length; si++){
  supportLinks[si].href = "mailto:"+CONFIG.supportEmail;
  if(supportLinks[si].hasAttribute("data-support-text")) supportLinks[si].textContent = CONFIG.supportEmail;
}
function paintPro(){
  $("proPill").classList.toggle("hidden", !PRO);
  $("unlockBtn").classList.toggle("hidden", PRO);
  var hint=$("dropHint");
  if(hint) hint.textContent = PRO ? "convert as many as you like" : "one file on the free tier, unlimited when licensed";
}
paintPro();

/* --- licence dialog --- */
var dlg=$("dlg");
if(dlg && $("unlockBtn")) (function(){
$("unlockBtn").addEventListener("click",function(){ $("dlgMsg").classList.add("hidden"); dlg.showModal(); $("keyInput").focus(); });
$("keyClose").addEventListener("click",function(){ dlg.close(); });
$("keyApply").addEventListener("click",function(){
  var k=$("keyInput").value.trim().toUpperCase(), msg=$("dlgMsg");
  msg.classList.remove("hidden");
  if(keyValid(k)){
    store.set("siq.key",k); PRO=true; paintPro();
    msg.className="msg ok"; msg.textContent="Licence activated. All limits are removed on this browser.";
    if(state.tx.length) renderTable();
    setTimeout(function(){ dlg.close(); },900);
  } else {
    msg.className="msg err"; msg.textContent="That key was not accepted. Check it for a typo, or reply to your purchase confirmation.";
  }
});
$("keyInput").addEventListener("keydown",function(e){ if(e.key==="Enter") $("keyApply").click(); });
})();

// Everything below drives the converter. Pages that carry the masthead but no
// converter — the post-purchase page, the institution hub — stop here with the
// licence dialog and support links already wired.
if(!$("drop")) return;

/* --- file input --- */
var drop=$("drop"), fileEl=$("file");
drop.addEventListener("click",function(){ fileEl.click(); });
drop.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); fileEl.click(); } });
["dragenter","dragover"].forEach(function(ev){
  drop.addEventListener(ev,function(e){ e.preventDefault(); drop.classList.add("over"); });
});
["dragleave","drop"].forEach(function(ev){
  drop.addEventListener(ev,function(e){ e.preventDefault(); drop.classList.remove("over"); });
});
drop.addEventListener("drop",function(e){ handleFiles(e.dataTransfer.files); });
fileEl.addEventListener("change",function(){ handleFiles(fileEl.files); fileEl.value=""; });

function handleFiles(list){
  var picked=[];
  for(var i=0;i<list.length;i++) if(/\.pdf$/i.test(list[i].name)||list[i].type==="application/pdf") picked.push(list[i]);
  if(!picked.length){ showErr("That is not a PDF. Statements exported from online banking are normally PDFs already."); return; }
  if(!PRO && picked.length>1){ picked=[picked[0]]; showErr("The free tier converts one statement at a time, so the first file was used. A licence converts them together."); }
  else hideErr();
  state.files = PRO ? state.files.concat(picked) : picked;
  renderFiles();
  run();
}
function renderFiles(){
  var host=$("files"); host.innerHTML="";
  state.files.forEach(function(f,i){
    var el=document.createElement("span");
    el.className="filechip";
    el.innerHTML='<b></b><span class="stat"></span><button class="x" title="Remove">&times;</button>';
    el.querySelector("b").textContent=f.name;
    el.querySelector(".stat").textContent=(f.size/1024).toFixed(0)+" KB";
    el.querySelector(".x").addEventListener("click",function(){ state.files.splice(i,1); renderFiles(); state.files.length?run():reset(); });
    host.appendChild(el);
  });
}
function showErr(m){ var e=$("parseErr"); e.textContent=m; e.classList.remove("hidden"); }
function hideErr(){ $("parseErr").classList.add("hidden"); }
function reset(){
  ["panelCols","panelOut","tableWrap"].forEach(function(id){ $(id).classList.add("hidden"); });
}

async function run(){
  reset(); hideErr();
  $("progWrap").classList.remove("hidden");
  var rows=[], fi;
  try{
    for(fi=0; fi<state.files.length; fi++){
      var f=state.files[fi];
      var idx=fi;
      var r = await readPdf(f, function(p,total){
        var pct = ((idx + p/total)/state.files.length)*100;
        $("prog").value=pct;
        $("progText").textContent="Reading "+f.name+" — page "+p+" of "+total;
      });
      rows = rows.concat(r);
    }
  }catch(err){
    $("progWrap").classList.add("hidden");
    showErr("That PDF could not be read: "+(err && err.message ? err.message : err)+". If it is password protected, remove the password and convert the unlocked copy.");
    return;
  }
  $("progWrap").classList.add("hidden");

  var a = analyse(rows);
  if(!a.txRows.length){
    showErr("No transaction rows were found. This normally means the PDF is a scan with no text layer — apply OCR first — or the statement has no dated rows to read.");
    return;
  }
  state.analysis=a;
  state.cols=a.cols;
  state.roles=defaultRoles(a.cols.length);
  // seed the controls from what the document itself looks like
  $("numFmt").value = a.numfmt;
  NUMFMT = a.numfmt;
  DATE_ORDER = a.numfmt==="eu" ? "dmy" : "mdy";
  $("dateOrder").value = DATE_ORDER;
  renderCols();
  refresh();
}

function renderCols(){
  var body=$("colBody"); body.innerHTML="";
  var samples=[];
  state.cols.forEach(function(){ samples.push([]); });
  state.analysis.txRows.forEach(function(t){
    t.amts.forEach(function(am){
      var best=-1,bd=1e9;
      state.cols.forEach(function(c,i){ var d=Math.abs(am.right-c.center); if(d<bd){bd=d;best=i;} });
      if(best>=0 && bd<=34 && samples[best].length<3) samples[best].push(am.str);
    });
  });
  var ROLES=[["amount","Amount"],["debit","Debit / withdrawal"],["credit","Credit / deposit"],["balance","Balance"],["ignore","Ignore"]];
  state.cols.forEach(function(c,i){
    var tr=document.createElement("tr");
    var td1=document.createElement("td"); td1.textContent="COL "+(i+1);
    var td2=document.createElement("td");
    var sel=document.createElement("select");
    ROLES.forEach(function(r){
      var o=document.createElement("option"); o.value=r[0]; o.textContent=r[1];
      if(state.roles[i]===r[0]) o.selected=true;
      sel.appendChild(o);
    });
    sel.addEventListener("change",function(){ state.roles[i]=sel.value; refresh(); });
    td2.appendChild(sel);
    var td3=document.createElement("td"); td3.className="sample"; td3.textContent=samples[i].join("   ") || "—";
    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
    body.appendChild(tr);
  });
  $("panelCols").classList.remove("hidden");
}

["dateFmt","flipSign","mergeWrap","numFmt","dateOrder"].forEach(function(id){
  $(id).addEventListener("change", function(){
    NUMFMT = $("numFmt").value;
    DATE_ORDER = $("dateOrder").value;
    refresh();
  });
});

function refresh(){
  state.tx = buildTx(state);
  renderTable();
  $("panelOut").classList.remove("hidden");
  $("tableWrap").classList.remove("hidden");
}

function renderTable(){
  var hasBal = state.roles.indexOf("balance")>=0;
  var thead=$("thead");
  thead.innerHTML="";
  ["","Date","Description","Amount"].concat(hasBal?["Balance"]:[]).forEach(function(h){
    var th=document.createElement("th"); th.textContent=h; thead.appendChild(th);
  });
  var tb=$("tbody"); tb.innerHTML="";
  var kept=0;
  var fmt=$("dateFmt").value;
  state.tx.forEach(function(t,i){
    if(t.keep) kept++;
    var locked = !PRO && t.keep && kept>CONFIG.freeRowLimit;
    var tr=document.createElement("tr");
    if(!t.keep) tr.className="off";
    else if(locked) tr.className="locked";

    var tdA=document.createElement("td"); tdA.className="act";
    var b=document.createElement("button");
    b.innerHTML = t.keep ? "&times;" : "&#8635;";
    b.title = t.keep ? "Exclude this row" : "Put it back";
    b.addEventListener("click",function(){ t.keep=!t.keep; renderTable(); });
    tdA.appendChild(b); tr.appendChild(tdA);

    var tdD=document.createElement("td"); tdD.className="date"; tdD.textContent=fmtDate(t.date,fmt); tr.appendChild(tdD);
    var tdN=document.createElement("td"); tdN.className="desc"; tdN.contentEditable="true"; tdN.spellcheck=false;
    tdN.textContent=t.description;
    tdN.addEventListener("input",function(){ t.description=tdN.textContent; });
    tr.appendChild(tdN);
    var tdM=document.createElement("td"); tdM.className="num"+(t.amount!=null&&t.amount<0?" neg":"");
    tdM.textContent = t.amount==null ? "" : t.amount.toFixed(2);
    tr.appendChild(tdM);
    if(hasBal){
      var tdB=document.createElement("td"); tdB.className="num";
      tdB.textContent = t.balance==null ? "" : t.balance.toFixed(2);
      tr.appendChild(tdB);
    }
    tb.appendChild(tr);
  });

  var total=state.tx.filter(function(t){return t.keep;}).length;
  var sum=state.tx.reduce(function(a,t){ return a + (t.keep && t.amount!=null ? t.amount : 0); },0);
  $("counts").innerHTML = "<b>"+total+"</b> rows retained · net <b>"+sum.toFixed(2)+"</b>";

  var ln=$("limitNote");
  if(!PRO && total>CONFIG.freeRowLimit){
    ln.innerHTML = "The free tier exports the first <b>"+CONFIG.freeRowLimit+"</b> of these <b>"+total+"</b> rows. Every row above was parsed in full — a $29 licence exports all of them. <a href=\""+CONFIG.buyUrl+"\" target=\"_blank\" rel=\"noopener\">Purchase a licence</a>";
    ln.classList.remove("hidden");
  } else ln.classList.add("hidden");
}

/* --- export --- */
function rowsForExport(){
  var kept=state.tx.filter(function(t){ return t.keep; });
  return PRO ? kept : kept.slice(0, CONFIG.freeRowLimit);
}
function buildDelimited(sep){
  var hasBal = state.roles.indexOf("balance")>=0;
  var fmt=$("dateFmt").value;
  var head=["Date","Description","Amount"].concat(hasBal?["Balance"]:[]);
  var esc=function(v){
    v = v==null ? "" : String(v);
    if(sep==="\t") return v.replace(/[\t\r\n]/g," ");
    return /[",\r\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v;
  };
  var lines=[head.join(sep)];
  rowsForExport().forEach(function(t){
    var r=[fmtDate(t.date,fmt), t.description, t.amount==null?"":t.amount.toFixed(2)];
    if(hasBal) r.push(t.balance==null?"":t.balance.toFixed(2));
    lines.push(r.map(esc).join(sep));
  });
  return lines.join("\r\n");
}
$("csvBtn").addEventListener("click",function(){
  var csv=buildDelimited(",");
  var name=(state.files[0]?state.files[0].name.replace(/\.pdf$/i,""):"statement")+".csv";
  try{
    var blob=new Blob(["﻿"+csv],{type:"text/csv;charset=utf-8"});
    var url=URL.createObjectURL(blob);
    var a=document.createElement("a");
    a.href=url; a.download=name; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); },1500);
  }catch(e){
    $("rawWrap").classList.remove("hidden"); $("raw").value=csv;
  }
});
$("copyBtn").addEventListener("click",function(){
  var tsv=buildDelimited("\t"), btn=$("copyBtn");
  var done=function(ok){
    btn.textContent = ok ? "Copied — paste into your sheet" : "Press Ctrl/Cmd+C";
    setTimeout(function(){ btn.innerHTML=COPY_LABEL; },2200);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(tsv).then(function(){ done(true); },function(){ fallback(); });
  } else fallback();
  function fallback(){
    $("rawWrap").classList.remove("hidden"); $("raw").value=tsv; $("raw").select(); done(false);
  }
});
$("rawBtn").addEventListener("click",function(){
  var w=$("rawWrap");
  if(w.classList.contains("hidden")){ w.classList.remove("hidden"); $("raw").value=buildDelimited(","); $("rawBtn").textContent="Hide CSV"; }
  else { w.classList.add("hidden"); $("rawBtn").textContent="Show CSV"; }
});

if(window.pdfjsLib){
  pdfjsLib.GlobalWorkerOptions.workerSrc="vendor/pdf.worker.min.js";
} else {
  showErr("The PDF engine did not load. Check your connection or any script blocker, then reload the page.");
}
})();
