import { randomInt } from 'crypto';

export class Utility {
    public static *getRandomChar() {
        const alphabets =
            'abcdefghijklmnopqrstuvwxyz' +
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            '0123456789';
        let index: number;
        while (true) {
            index = randomInt(0, alphabets.length - 1);
            yield alphabets.charAt(index);
        }
    }

    public static generateRandomPassword(length: number): string {
        let pwd = '';
        for (let i = 0; i < length; i++) {
            pwd += Utility.getRandomChar().next().value;
        }
        return pwd;
    }
    public static async retryPromise<T>(
        cb: (...args: unknown[]) => Promise<T>,
        retry: number,
        delay: number,
        message: string = 'Something went wrong. Retrying..'
    ): Promise<T> {
        try {
            return await cb();
        } catch (e) {
            await Utility.wait(delay);
            if (retry > 0) {
                console.log(message);
                try {
                    const retryFn: (...args: unknown[]) => unknown =
                        Utility.retryPromise.bind(
                            null,
                            cb,
                            retry - 1,
                            delay,
                            message
                        );
                    const val = await retryFn();
                    console.log('Retry val', val);
                    return val as T;
                } catch (e) {
                    throw e;
                }
            } else {
                throw e;
            }
        }
    }

    public static wait(milliseconds: number) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
}
