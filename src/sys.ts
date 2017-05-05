"use strict";

import * as os from "os";

export const sys = {
    stdout: {
        writeLine: function (s: string) {
            process.stdout.write(s + os.EOL);
        },
        newLine() {
            process.stdout.write(os.EOL);
        }
    },

    stderr: {
        writeLine: function (s: string) {
            process.stderr.write(s + os.EOL);
        }
    },

    exit(exitCode?: number) {
        process.exit(exitCode);
    }
};

export enum ExitStatus {
    Success = 0,
    Fail = 1
}
