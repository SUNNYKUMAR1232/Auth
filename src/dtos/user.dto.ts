import Joi from "joi";

export interface UserDtoParams {
    name: string;
    email: string;
    githubId?: string;
    googleId?: string;
    image?: string;
}

export class UserDto {
    name: string;
    email: string;
    githubId?: string;
    googleId?: string;
    image?: string;

    constructor(params: UserDtoParams) {
        this.name = params.name;
        this.email = params.email;
        this.githubId = params.githubId;
        this.googleId = params.googleId;
        this.image = params.image;
    }

    public static getValidationSchema() {
        return Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            githubId: Joi.string().optional(),
            googleId: Joi.string().optional(),
            image: Joi.string().optional(),
        });
    }

    public static validate(data: Partial<UserDto>) {
        const schema = this.getValidationSchema();
        return schema.validate(data);
    }
}