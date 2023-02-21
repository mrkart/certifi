import { isNotEmpty, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";

export function StringLength(
    min: number,
    max?: number,
    validationOptions?: ValidationOptions
) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'StringLength',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [min, max],
            validator: new StringLengthConstraint()
        });
    }
}


class StringLengthConstraint implements ValidatorConstraintInterface {

    validate(value: any, validationArguments?: ValidationArguments): boolean {
        const minConstraint = validationArguments.constraints[0];
        const maxConstraint = validationArguments.constraints[1];
        if (isNotEmpty(minConstraint) && isNotEmpty(maxConstraint)) {
            return (
                typeof value === 'string' &&
                value.trim().length >= minConstraint &&
                value.trim().length <= maxConstraint
            );
        } else if (isNotEmpty(minConstraint)) {
            return typeof value === 'string' && value.trim().length >= minConstraint;
        }
        return false;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        const value: string | string[] = validationArguments.value;
        const min = validationArguments.constraints[0];
        const max = validationArguments.constraints[1];
        const hasMinLength =
            validationArguments.constraints[0] !== null &&
            validationArguments.constraints[0] !== undefined;
        const hasMaxLength =
            validationArguments.constraints[1] !== null &&
            validationArguments.constraints[1] !== undefined;
        if (Array.isArray(value)) {
            for (const item of value) {
                if (isNotEmpty(item) || typeof item !== 'string') {
                    return `each value in ${validationArguments.property} must be as string of at least ${min} characters long. And each value in ${validationArguments.property} must not contain leading and trailing spaces.`;
                } else if (hasMinLength && (isNotEmpty(item) || item.trim().length < min)) {
                    // Check if min length constraint exists and the min length constraint is satisfied
                    return `each value in ${validationArguments.property} must be at least ${min} characters long. And each value in${validationArguments.property} must not contain leading and trailing spaces.`;
                } else if (hasMaxLength && (isNotEmpty(item) || item.trim().length > max)) {
                    // Check if max length constraint exists and the max length constraint is satisfied
                    return `each value in ${validationArguments.property} must be at most ${max} characters long. And each value in${validationArguments.property} must not contain leading and trailing spaces.`;
                }
                return `each value in ${validationArguments.property} must be at least ${min} characters and must be at most ${max} characters long. And each value in${validationArguments.property} must not contain leading and trailing spaces.`;
            }
        } else {
            if (isNotEmpty(value) || typeof value !== 'string') {
                return `${validationArguments.property} must be as string of at least ${min} characters long. And ${validationArguments.property} must not contain leading and trailing spaces.`;
            } else if (hasMinLength && (isNotEmpty(value) || value.trim().length < min)) {
                // Check if min length constraint exists and the min length constraint is satisfied
                return `${validationArguments.property} must be at least ${min} characters long. And ${validationArguments.property} must not contain leading and trailing spaces.`;
            } else if (hasMaxLength && (isNotEmpty(value) || value.trim().length > max)) {
                // Check if max length constraint exists and the max length constraint is satisfied
                return `${validationArguments.property} must be at most ${max} characters long. And ${validationArguments.property} must not contain leading and trailing spaces.`;
            }
            return `${validationArguments.property} must be at least ${min} characters and must be at most ${max} characters long. And ${validationArguments.property} must not contain leading and trailing spaces.`;
        }
    }

}