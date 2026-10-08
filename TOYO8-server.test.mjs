import assert from 'node:assert/strict';import worker from './_worker.js';import {D1Local} from './TOYO8-d1-local.mjs';
const db=new D1Local(),env={DB:db},origin='https://store.test';let checks=0;
async function call(path,{method='GET',body,session,extra={}}={}){const headers={...extra};if(method!=='GET'){headers.Origin=origin;headers['Content-Type']='application/json'}if(session){headers.Cookie=session.cookie;headers['X-CSRF-Token']=session.csrf}const response=await worker.fetch(new Request(origin+'/api/'+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)}),env);return {response,status:response.status,data:await response.json()}}
const equal=(a,b,label)=>{assert.equal(a,b,label);checks++};
async function login(username='admin'){const r=await call('login',{method:'POST',body:{username,password:'demo123'},extra:{'CF-Connecting-IP':'test-'+crypto.randomUUID()}});equal(r.status,200,'demo login');const cookie=r.response.headers.get('Set-Cookie');assert.match(cookie,/HttpOnly; Secure; SameSite=Strict/);checks++;return {cookie:cookie.split(';')[0],csrf:r.data.csrf}}
equal((await call('state')).status,401,'anonymous read blocked');
const cross=await worker.fetch(new Request(origin+'/api/login',{method:'POST',headers:{Origin:'https://attacker.test','Content-Type':'application/json'},body:JSON.stringify({username:'admin',password:'demo123'})}),env);equal(cross.status,403,'cross origin blocked');
equal((await call('login',{method:'POST',body:{username:'admin',password:'wrong'}})).status,401,'wrong password blocked');
const admin=await login(),other=await login(),sales=await login('vendedor'),warehouse=await login('bodega');
equal((await call('stock',{method:'POST',session:{...admin,csrf:'wrong'},body:{}})).status,403,'CSRF blocked');
equal((await call('quotes',{method:'POST',session:warehouse,body:{}})).status,403,'warehouse sales denied');
equal((await call('offers/import',{method:'POST',session:sales,body:{rows:[]}})).status,403,'sales import denied');
let state=(await call('state',{session:admin})).data;
const client=(await call('records',{method:'POST',session:admin,body:{kind:'clients',data:{name:'CLIENTE AISLADO',segment:'B2C',discount:0}}})).data;
equal((await call('state',{session:other})).data.clients.some(c=>c.id===client.id),false,'isolated clients');
equal((await call('records',{method:'PATCH',session:other,body:{kind:'clients',id:client.id,version:1,data:{name:'Ataque'}}})).status,404,'cross workspace write denied');
async function quote(productId,qty,session=admin){const r=await call('quotes',{method:'POST',session,body:{clientId:'cliente-demo-1',items:[{productId,qty,price:1}],total:1,notes:'Prueba'}});equal(r.status,201,'quote created');return r.data}
async function order(q,session=admin){const r=await call('convert',{method:'POST',session,body:{source:q.id,type:'order'}});equal(r.status,201,'order created');return r.data}
let q=await quote('pieza-demo-1',2);equal(q.total,340400,'canonical prices and B2B discount, tampered totals ignored');
let o=await order(q);equal((await call('convert',{method:'POST',session:admin,body:{source:q.id,type:'order'}})).status,409,'duplicate order blocked');
let invoice=await call('convert',{method:'POST',session:admin,body:{source:o.id,type:'invoice'}});equal(invoice.status,201,'internal invoice');
equal((await call('state',{session:admin})).data.products.find(p=>p.id==='pieza-demo-1').stock,10,'stock deducted');
equal((await call('convert',{method:'POST',session:admin,body:{source:o.id,type:'invoice'}})).status,409,'duplicate invoice blocked');
let ret=await call('returns',{method:'POST',session:admin,body:{invoiceId:invoice.data.id,productId:'pieza-demo-1',qty:1,reason:'Devolución demo'}});equal(ret.status,201,'return accepted');
equal((await call('returns',{method:'POST',session:admin,body:{invoiceId:invoice.data.id,productId:'pieza-demo-1',qty:2,reason:'Exceso'}})).status,409,'over return denied');
equal((await call('state',{session:admin})).data.products.find(p=>p.id==='pieza-demo-1').stock,11,'return adds only accepted units');
q=await quote('pieza-demo-3',2);o=await order(q);equal((await call('convert',{method:'POST',session:admin,body:{source:o.id,type:'invoice'}})).status,409,'no stock invoice blocked');
let purchase=await call('purchases',{method:'POST',session:admin,body:{productId:'pieza-demo-3',offerId:'oferta-demo-1',qty:2}});equal(purchase.status,201,'purchase prepared');
let receipt=await call('receive',{method:'POST',session:admin,body:{id:purchase.data.id,version:1}});equal(receipt.status,200,'receipt accepted');
equal((await call('receive',{method:'POST',session:admin,body:{id:purchase.data.id,version:1}})).status,409,'duplicate receipt denied');
equal((await call('state',{session:admin})).data.products.find(p=>p.id==='pieza-demo-3').stock,2,'single receipt');
equal((await call('convert',{method:'POST',session:admin,body:{source:o.id,type:'invoice'}})).status,201,'invoice after receipt');
const first=await order(await quote('pieza-demo-4',4)),second=await order(await quote('pieza-demo-4',4));
const concurrent=await Promise.all([first,second].map(d=>call('convert',{method:'POST',session:admin,body:{source:d.id,type:'invoice'}})));equal(concurrent.filter(r=>r.status===201).length,1,'one concurrent invoice wins');equal(concurrent.filter(r=>r.status===409).length,1,'one concurrent invoice rejected');
equal((await call('state',{session:admin})).data.products.find(p=>p.id==='pieza-demo-4').stock,1,'no overselling');
const before=(await call('state',{session:admin})).data.offers;
equal((await call('offers/import',{method:'POST',session:admin,body:{rows:[{proveedor:'Demo',referencia:'X',nombre:'Pieza',marca:'Demo',stock_proveedor:1,precio_cop:2,plazo_dias:1,actualizado:'2026-99-99'}]}})).status,400,'invalid date rejected');
equal((await call('state',{session:admin})).data.offers.length,before.length,'invalid import atomic');
const salesQuote=await quote('pieza-demo-1',1,sales);equal('cost' in salesQuote.items[0],false,'sales quote hides costs');
equal('cost' in (await call('state',{session:sales})).data.products[0],false,'sales inventory hides costs');
equal((await call('state',{session:warehouse})).data.clients.length,0,'warehouse client directory withheld');
const p=(await call('state',{session:admin})).data.products.find(p=>p.id==='pieza-demo-1');
equal((await call('stock',{method:'POST',session:admin,body:{id:p.id,version:p.version,delta:-99,reason:'Negativo'}})).status,400,'negative stock blocked');
equal((await call('logout',{method:'POST',session:admin,body:{}})).status,200,'logout');equal((await call('state',{session:admin})).status,401,'logout revokes token');
let aiCalls=0;
env.AI={run:async()=>{aiCalls++;return {response:JSON.stringify({intent:'catalogo',query:'pastillas'})}}};
equal((await call('assistant',{method:'POST',body:{message:'busco pastillas'}})).data.mode,'ai','AI classifies intent');
equal((await call('assistant',{method:'POST',body:{message:'mi VIN JH4KA9650MC000001'}})).data.mode,'local','VIN not sent to AI');
equal((await call('assistant',{method:'POST',body:{message:'mi correo ficticio@example.test'}})).data.mode,'local','email not sent to AI');
equal(aiCalls,1,'identifier bypasses model');
env.AI.run=async()=>({response:JSON.stringify({intent:'inject_code',query:'INVENTED OEM'})});
const unsafe=await call('assistant',{method:'POST',body:{message:'despiece frenos'}});
equal(unsafe.data.intent,'epc','unknown intent falls back');equal(unsafe.data.query,'despiece frenos','invented model reference rejected');
env.AI.run=async()=>{throw Error('Unavailable')};
equal((await call('assistant',{method:'POST',body:{message:'proveedores'}})).data.mode,'local','AI failure uses local guide');
env.AI.run=async()=>({response:'{"intent":"catalogo","query":"pastillas"}'});
for(let i=0;i<7;i++)await call('assistant',{method:'POST',body:{message:'pastillas'}});
equal((await call('assistant',{method:'POST',body:{message:'pastillas'}})).data.mode,'local','AI hourly cap enforced');
const profiles=(await call('profiles')).data;
equal(profiles.profiles.length,6,'six demo functions');
const expected={admin:['client','lead','task','product','edit-client','edit-task','stock','quote','order','invoice','import','purchase','receive','return'],gerente:[],vendedor:['client','lead','task','edit-client','edit-task','quote','order'],compras:['import','purchase'],bodega:['stock','receive'],contabilidad:['invoice','return']};
for(const [role,permitted] of Object.entries(expected)){
 const user=await login(role);let qid='cotizacion-demo-1',iid='missing';
 const before=(await call('state',{session:user})).data;
 equal((await call('me',{session:user})).data.role,role,role+' server identity');
 if(role==='bodega'){
  equal(before.clients.length,0,'warehouse no client list');equal(before.leads.length,0,'warehouse no CRM');
  equal(before.products.every(p=>!('price' in p)&&!('cost' in p)&&!('tax' in p)),true,'warehouse inventory hides monetary fields');
  equal(before.documents.every(d=>d.type==='order'&&!('total' in d)&&!('email' in d.client)&&d.items.every(i=>!('price' in i)&&!('cost' in i)&&!('discount' in i))),true,'warehouse order projection excludes private and financial fields');
  equal(before.purchases.every(p=>!('cost' in p)&&!('total' in p)),true,'warehouse reception hides prices');
 }
 if(['vendedor','bodega','contabilidad'].includes(role))equal(before.products.every(p=>!('cost' in p)),true,role+' cannot receive purchase costs');
 if(['compras','contabilidad'].includes(role))for(const kind of ['clients','leads','tasks','audit'])equal(before[kind].length,0,role+' withholds '+kind);
 if(role==='compras')equal(before.documents.length,0,'procurement withholds sales documents');
 if(role==='contabilidad')for(const kind of ['offers','purchases'])equal(before[kind].length,0,'accounting withholds '+kind);
 const cases=[
  ['client','records','POST',()=>({kind:'clients',data:{name:'Cliente de prueba',segment:'B2C',discount:0}})],
  ['lead','records','POST',()=>({kind:'leads',data:{title:'Oportunidad de prueba',clientId:'cliente-demo-1',stage:'nuevo'}})],
  ['task','records','POST',()=>({kind:'tasks',data:{title:'Tarea de prueba'}})],
  ['product','records','POST',()=>({kind:'products',data:{code:'DEMO-NUEVO',name:'Pieza demo',brand:'Demo',category:'Motor',location:'X-01',price:20,cost:10,stock:1}})],
  ['edit-client','records','PATCH',()=>({kind:'clients',id:'cliente-demo-1',version:1,data:{name:'Cliente actualizado'}})],
  ['edit-task','records','PATCH',()=>({kind:'tasks',id:'tarea-demo-1',version:1,data:{done:true}})],
  ['stock','stock','POST',async()=>({id:'pieza-demo-1',version:(await call('state',{session:user})).data.products.find(p=>p.id==='pieza-demo-1').version,delta:1,reason:'Conteo demo'})],
  ['quote','quotes','POST',()=>({clientId:'cliente-demo-1',items:[{productId:'pieza-demo-1',qty:1}],notes:'Prueba de perfil'})],
  ['order','convert','POST',()=>({source:qid,type:'order'})],
  ['invoice','convert','POST',()=>({source:'pedido-demo-1',type:'invoice'})],
  ['import','offers/import','POST',()=>({rows:[{proveedor:'Proveedor de prueba',referencia:'DEMO-SUS-003',nombre:'Amortiguador demo',marca:'Demo',stock_proveedor:4,precio_cop:123000,plazo_dias:2,actualizado:new Date().toISOString().slice(0,10)}]})],
  ['purchase','purchases','POST',async()=>({productId:'pieza-demo-3',offerId:(await call('state',{session:user})).data.offers.find(o=>o.code==='DEMO-SUS-003')?.id||'oferta-demo-1',qty:1})],
  ['receive','receive','POST',()=>({id:'compra-demo-1',version:1})],
  ['return','returns','POST',()=>({invoiceId:iid,productId:'pieza-demo-1',qty:1,reason:'Prueba de devolución por perfil'})]
 ];
 for(const [operation,path,method,makeBody]of cases){
  const result=await call(path,{method,session:user,body:await makeBody(),extra:{'X-Role':'admin'}});
  equal(result.status,permitted.includes(operation)?(['edit-client','edit-task','stock','import','receive'].includes(operation)?200:201):403,role+' '+operation+' enforced on server');
  if(operation==='quote'&&result.status===201){qid=result.data.id;if(role==='vendedor')equal('cost' in result.data.items[0],false,'sales mutation response hides costs');}
  if(operation==='invoice'&&result.status===201){iid=result.data.id;if(role==='contabilidad')equal('cost' in result.data.items[0],false,'accounting mutation response hides costs');}
  if(operation==='stock'&&role==='bodega')equal('cost' in result.data||'price' in result.data,false,'warehouse adjustment response hides prices');
 }
 const after=(await call('state',{session:user})).data;
 if(role==='gerente')equal(JSON.stringify(after),JSON.stringify(before),'manager supervision does not mutate any data');
 equal((await call('logout',{method:'POST',session:user,body:{}})).status,200,role+' can log out');
}
const spoof=await call('login',{method:'POST',body:{username:'gerente',password:'demo123',role:'admin',permissions:['stock.write']},extra:{'CF-Connecting-IP':'spoof-test'}});
equal(spoof.data.role,'gerente','role supplied by browser cannot upgrade identity');
equal(spoof.data.permissions.some(p=>p.endsWith('.write')),false,'manager login has no write permissions');
console.log(JSON.stringify({passed:checks,flows:['auth','origin','csrf','six-role positive/negative matrix','data minimization','mutation response minimization','role spoofing','workspace isolation','canonical totals','B2B discount','invoice idempotency','stock concurrency','purchasing/receipt','returns','atomic import','logout','AI privacy and constraints']}));
