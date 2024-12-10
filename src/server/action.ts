'use server'

import { db } from './mysql2'


export async function updateStatusUsageItem(id:number,status:boolean = false){
  try{
    const results = await new Promise((resolve, reject)=>{
      db.query('update usageItem set status = ? where usageId = ?;', [status ? 1 : 0,id], (err,res:any)=>{
        if(err) reject(err)
        if(res.affectedRows > 0) resolve(true); // Resolve with true if any rows were affected
        else resolve(false)
      })
    })
    return results
  }catch(error){
    console.log("Database error:", error);
    throw error;
  }
}

//dae pa tapos
export async function searchDataUsageItem(search:string){
  try{
    const results = JSON.stringify(await new Promise((resolve, reject)=>{
      db.query(`select usageId, borrower, educator, material, room, status from usageItem where borrower LIKE '%${search}%' or educator LIKE '%${search}%' or material LIKE '%${search}%' or room LIKE '%${search}%';`, (err,res)=>{
        if(err) reject(err)
        else resolve(res)
      })
    }))
    try {
    return JSON.parse(results).map((arr:any)=>{
      return {
        id: arr.usageId,
        borrower: arr.borrower,
        educator: arr.educator,
        material: JSON.parse(arr.material),
        room: arr.room,
        status: Boolean(arr.status)
      }
    })
    } catch (parseError) {
      console.error("JSON parsing error:", parseError, "Original data:", results);
      return []; 
    }
  }catch(error){
    console.log("Database error:", error);
    throw error; 
  }
}

export async function getAllHistoryDataUsageItemList(){
  try{
    const results = JSON.stringify(await new Promise((resolve, reject)=>{
      db.query(
        `select 
            usageId, borrower, educator, material, room,
            date_format(date(created_at),'%Y-%m-%d') as date, 
            date_format(time(created_at),'%l:%i %p') as barrowed, 
              case 
                when status = 0 then 'Fail' 
                else date_format(time(updated_at),'%l:%i %p') 
              end as returned 
          from usageItem
          where date(created_at) != date(current_timestamp)
          order by date(created_at) desc;`, (err,res)=>{
        if(err) reject(err)
        else resolve(res)
      })
    }))
    try {
    return JSON.parse(results).map((arr:any)=>{
      return {
        id: arr.usageId,
        borrower: arr.borrower,
        educator: arr.educator,
        material: JSON.parse(arr.material),
        room: arr.room,
        date: arr.date,
        barrowed: arr.barrowed,
        returned: arr.returned
      }
    })
    } catch (parseError) {
      console.error("JSON parsing error:", parseError, "Original data:", results);
      return []; 
    }
  }catch(error){
    console.log("Database error:", error);
    throw error;
  }
}

export async function getAllDataUsageItemList(){
  try{
    const results = JSON.stringify(await new Promise((resolve, reject)=>{
      db.query(
        `select 
            usageId, borrower, educator, material, room,
            date_format(date(created_at),'%Y-%m-%d') as date, 
            date_format(time(created_at),'%l:%i %p') as barrowed, 
              case 
                when status = 0 then 'Fail' 
                else date_format(time(updated_at),'%l:%i %p') 
              end as returned 
          from usageItem
          order by date(created_at) desc;`, (err,res)=>{
        if(err) reject(err)
        else resolve(res)
      })
    }))
    try {
    return JSON.parse(results).map((arr:any)=>{
      return {
        id: arr.usageId,
        borrower: arr.borrower,
        educator: arr.educator,
        material: JSON.parse(arr.material),
        room: arr.room,
        date: arr.date,
        barrowed: arr.barrowed,
        returned: arr.returned
      }
    })
    } catch (parseError) {
      console.error("JSON parsing error:", parseError, "Original data:", results);
      return []; 
    }
  }catch(error){
    console.log("Database error:", error);
    throw error;
  }
}

export async function getDataUsageItemList(){
  try{
    const results = JSON.stringify(await new Promise((resolve, reject)=>{
      db.query('select usageId, borrower, educator, material, room, status from usageItem where date(created_at) = date(current_timestamp);', (err,res)=>{
        if(err) reject(err)
        else resolve(res)
      })
    }))
    try {
    return JSON.parse(results).map((arr:any)=>{
      return {
        id: arr.usageId,
        borrower: arr.borrower,
        educator: arr.educator,
        material: JSON.parse(arr.material),
        room: arr.room,
        status: Boolean(arr.status)
      }
    })
    } catch (parseError) {
      console.error("JSON parsing error:", parseError, "Original data:", results);
      return [];
    }
  }catch(error){
    console.log("Database error:", error);
    throw error;
  }
}

export async function setDataUsageItem(dt:{ borrower:string, educator:string, material: string, room:string,status:boolean }){
  try{
     const results:boolean = await new Promise((resolve, reject)=>{
      db.query('insert into usageItem(borrower,educator,material,room,status) values(?,?,?,?,?);',
      [dt.borrower,dt.educator,dt.material,dt.room,dt.status ? 1 : 0],(err,res:any)=>{
        if(err) reject(err)
        if(res.affectedRows > 0) resolve(true); // Resolve with true if any rows were affected
        else resolve(false)
      });
     });
     return results;
  }catch(error){
    console.error("Database error:",error)
    throw error;
  }
}

export async function addMaterial(name: string) {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('INSERT INTO material (name) VALUES (?)', [name], (err, res: any) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(true); 
        else resolve(false);
      });
    });
    return results;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function deleteMaterial(id: number) {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('DELETE FROM material WHERE materialId = ?', [id], (err, res: any) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(true);
        else resolve(false);
      });
    });
    return results;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}


export async function materialList(){
  try {
    const results = JSON.stringify(await new Promise((resolve, reject) => {
      db.query('select materialId as id ,name from material order by materialId desc', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }));
    return JSON.parse(results)
  } catch (error) {
    console.error("Database error:", error);
    throw error; 
  }
}

export async function deleteRoom(id: number) {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('DELETE FROM room WHERE roomId = ?', [id], (err, res: any) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(true);
        else resolve(false);
      });
    });
    return results;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function addRoom(name: string) {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('INSERT INTO room (name) VALUES (?)', [name], (err, res: any) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(true); 
        else resolve(false);
      });
    });
    return results;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function roomList(){
  try {
    const results = JSON.stringify(await new Promise((resolve, reject) => {
      db.query('select roomId as id ,name from room order by name asc', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }));
    return JSON.parse(results)
  } catch (error) {
    console.error("Database error:", error);
    throw error; 
  }
}

export async function signIn_db(username: string, password: string) {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM signin WHERE email = ? AND password = md5(?)',[username, password],
        (err, res:any) => {
          if (err) reject(err);
          else resolve(res.length > 0 ? true : false);
        }
      );
    });
    return results; 
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
