import { WordGameDto } from "@/modules/word-game/dto/word-game.dto";
import { IsOptional,IsEnum } from "class-validator";
export class SearchWordGameDto extends WordGameDto {
	constructor() {
		super();
	}
    @IsOptional()
    @IsEnum(
        [
        'fantasy',
        'life',
        'sf',
        ],
        {
            message: "올바르지 않은 장르입니다"
        }
    )
    qw_genre: String;

    @IsOptional()
    @IsEnum(
        [
            '',
            'qw_word',
            'qw_genre',
            'qw_level'
        ]
    )
    sort_col?: string = '';

    @IsOptional()
	search_val = '';


}
