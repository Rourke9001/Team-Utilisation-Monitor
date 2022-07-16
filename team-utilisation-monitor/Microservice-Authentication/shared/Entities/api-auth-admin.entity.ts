import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({description:'Object encapsulates newely registered admin in the authentication schema'})
export class AuthAdminEntity{

    @Field(()=>ID)
    id!:number;

    @Field()
    username!:string;

    @Field({nullable:true})
    password?:string;

    @Field({nullable:true})
    token?:string;

    @Field({nullable:true})
    role?:string
}