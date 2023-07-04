import { Model } from '@/core/model/data.model';
import { SearchWordGameDto } from '@/modules/word-game/dto/search-word-game.dto';
import { WordGameDto } from '@/modules/word-game/dto/word-game.dto';
import { Injectable } from '@nestjs/common';
import { utils } from '@/lib/utils';

@Injectable()
export class WordGameModel{
    constructor(private model: Model){}

    private proc_get_word_list(dto: SearchWordGameDto){
        let where_sql = "";
        const data = [];
        if(dto.qw_genre){
            where_sql += `qw_genre = ?`;
            data.push(dto.qw_genre)
        }

        const sql = `
            SELECT
                *
            FROM
                quiz_word_game_word
            WHERE
                1=1
                ${where_sql}
        `;
        data.push(dto.qw_genre);
        return{
            sql, 
            data
        }
    }  

    async get_word_list_all(dto: SearchWordGameDto){
        const sql_data = this.proc_get_word_list(dto);
        let sql = sql_data.sql;
        let data = sql_data.data;
        if(dto.sort_col && dto.search_val){
            sql += `order by ${dto.sort_col} ${dto.search_val}`;
        }else{
            sql += `order by qw_word desc`;
        }

        const result = await this.model.getAll(sql, data);        
        return utils.array_to_dto(WordGameDto, result);
    }
}