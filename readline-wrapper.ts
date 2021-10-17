import * as readline from "readline";

export class ReadlineWrapper {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // prompt a user for input until their response matches expectedResponse
    // up to maxAttempts times
    // -default expectedResponse matches anything
    // -resolves with an array of the regex captured matches
    // -rejects if it does not get a response before reaching maxAttempts
    ask(prompt: string, expectedResponse: RegExp = /(.*)/, maxAttempts: number = 1): Promise<string[] | null> {
        return new Promise((resolve, reject) => {
            if (maxAttempts < 1) resolve(null);

            this.rl.question(prompt, async (response: string) => {
                try {
                    if (expectedResponse.test(response)) {
                        let matchGroups = expectedResponse.exec(response) as ArrayLike<string>;
                        let matches = Array.from(matchGroups);

                        resolve(matches);
                    } else {
                        resolve(await this.ask(prompt, expectedResponse, maxAttempts - 1));
                    }
                } catch (error: unknown | null) {
                    if(error === null) resolve(error)
                    else reject(error);
                }
            });
        });
    }

    // done is called when you no longer need the readline wrapper
    // must be called for process to exit
    done() { this.rl.close(); }
}