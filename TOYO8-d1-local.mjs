import {DatabaseSync} from 'node:sqlite';
export class D1Local {
 constructor(file=':memory:'){this.sqlite=new DatabaseSync(file);this.sqlite.exec('PRAGMA foreign_keys=ON');}
 prepare(sql){const db=this.sqlite;return {sql,values:[],bind(...values){this.values=values;return this},async first(){return db.prepare(sql).get(...this.values)||null},async all(){return {results:db.prepare(sql).all(...this.values)}},async run(){const r=db.prepare(sql).run(...this.values);return {success:true,meta:{changes:Number(r.changes)},results:[]}}};}
 async batch(queries){this.sqlite.exec('BEGIN IMMEDIATE');try{const results=[];for(const q of queries){const statement=this.sqlite.prepare(q.sql);if(statement.columns().length)results.push({success:true,results:statement.all(...q.values),meta:{changes:0}});else{const r=statement.run(...q.values);results.push({success:true,results:[],meta:{changes:Number(r.changes)}})}}this.sqlite.exec('COMMIT');return results}catch(e){this.sqlite.exec('ROLLBACK');throw e}}
}
