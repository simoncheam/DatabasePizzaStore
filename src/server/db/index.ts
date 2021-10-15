/// create index.ts first
//then queries
//config
//then routes

import * as mysql from 'mysql';
import {database_config_lmao} from "../config"; //import from /config
import { MySQL_Default_Response_Lol} from "../servertypes"

const connection_to_our_db_lmao = mysql.createPool(database_config_lmao); //this is the DB config file

export const TalkToMySQL = <TypeThatIMightProvide = MySQL_Default_Response_Lol>(sql_string: string, values?: unknown[]) => { /// can you explain what "sql_string" would be?
    
    return new Promise<TypeThatIMightProvide>((resolve, reject)=>{

        const formatted_sql = mysql.format(sql_string, values);  // use this to debug and hone in on issue
        console.log({formatted_sql});

        connection_to_our_db_lmao.query(formatted_sql, (err, results)=>{
            if(err){
                reject(err);
            } else {
                resolve(results);
            }
        } )
    })
}

