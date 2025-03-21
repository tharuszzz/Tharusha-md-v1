var commands = [];

function cmd(info, func) {
    let data = {
        pattern: info.pattern || "",
        desc: info.desc || "",
        fromMe: info.fromMe || false,
        category: info.category || "misc",
        filename: info.filename || "Not Provided",
        dontAddCommandList: info.dontAddCommandList || false,
        function: func
    };

    commands.push(data);
    return data;
}

module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
};
