export default class SimpleDropitMethods {
    constructor() {}

    static isFiles(event) {
        let r = false;
        if (event.dataTransfer.types) {
            event.dataTransfer.types.forEach((file, index) => {
                if(file === "Files" || file === "application/x-moz-file") {
                    r = true;
                }
            });
        }
        return r;
    }
}