import { IsNotEmpty, IsString } from "class-validator"

export class PostDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    userId: number

    tag?: string[];


}
export class UpdatePostDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string
    
    tag?: string[];

    // @IsNotEmpty()
    // userId: number
}