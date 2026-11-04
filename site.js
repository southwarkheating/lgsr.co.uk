(function(){
var d=document;
/* mobile menu */
var b=d.querySelector('.menu-btn'),n=d.getElementById('nav');
if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false')});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}})}
/* enquiry forms (contracts, reminders, agents, contact): sent straight into the Southwark Heating app */
var EP='https://ylyasshhvuhhpmpotera.supabase.co/functions/v1/website-enquiry';
function uuid(){try{return crypto.randomUUID()}catch(e){return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g,function(){return(Math.random()*16|0).toString(16)})}}
window.lgsrSend=function(o){var body=JSON.stringify(o);
return fetch(EP,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:body}).then(function(r){return r.json().then(function(j){return{ok:r.ok&&j&&j.ok!==false,j:j}},function(){return{ok:r.ok,j:{}}})},
function(){return fetch(EP,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:body}).then(function(){return{ok:true,j:{}}},function(){return{ok:false,j:{}}})})};
[].forEach.call(d.querySelectorAll('form.eform'),function(f){var id=null;
f.addEventListener('submit',function(e){e.preventDefault();var m=f.querySelector('.fmsg'),btn=f.querySelector('button[type=submit]');
var v=function(k){var x=f.elements[k];return x?(x.value||'').trim():''};
var name=v('name'),phone=v('phone'),email=v('email'),pc=v('postcode').toUpperCase(),bad=[];
if(name.length<2)bad.push('your name');
if(!/\d{10,}/.test(phone.replace(/\D/g,''))&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))bad.push('a phone number or email');
if(pc&&!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/.test(pc))bad.push('a full postcode, like SE16 7SZ');
[].forEach.call(f.querySelectorAll('[data-req]'),function(x){if(!(x.value||'').trim())bad.push(x.getAttribute('data-req'))});
if(bad.length){m.className='fmsg err';m.textContent='Please add '+bad.join(', ')+'.';return}
var extra=[];[].forEach.call(f.querySelectorAll('[data-label]'),function(x){var val=(x.type==='checkbox')?(x.checked?'Yes':''):(x.value||'').trim();if(val)extra.push(x.getAttribute('data-label')+': '+val)});
var msg=('['+f.getAttribute('data-topic')+'] '+extra.join('. ')+(v('message')?'. '+v('message'):'')).trim();
id=id||uuid();btn.disabled=true;m.className='fmsg';m.textContent='Sending...';
lgsrSend({enquiry_id:id,name:name,phone:phone,email:email,postcode:pc,category:'Heating & Boilers',service:f.getAttribute('data-service')||'Landlord Gas Safety Certificates',contact_method:v('contact_method')||'Phone',message:msg,_gotcha:v('_gotcha'),source:'lgsr.co.uk '+f.getAttribute('data-topic').toLowerCase()})
.then(function(x){if(x.ok){f.reset();id=null;m.className='fmsg ok';m.textContent=f.getAttribute('data-thanks')||('Thanks, '+name.split(' ')[0]+'. We have your details and will be in touch soon.')}
else{m.className='fmsg err';m.textContent=(x.j.details&&x.j.details.join('. '))||x.j.error||'That did not send. Please call 020 8050 2022 or text 07988 991963.'}})
.then(function(){btn.disabled=false})})});
})();
